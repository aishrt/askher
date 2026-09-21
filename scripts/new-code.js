// Generates a random link code.
//   npm run code                          → just prints a new code
//   npm run code -- "Aisha" "optional note" → also adds her to src/recipients.js
import { readFileSync, writeFileSync } from 'node:fs'
import { randomInt } from 'node:crypto'

const FILE = new URL('../src/recipients.js', import.meta.url)
const MARKER = '// ⬆️ add new people above this line'
const ALPHABET = 'abcdefghjkmnpqrstuvwxyz23456789' // no look-alikes (0/o, 1/l/i)

const source = readFileSync(FILE, 'utf8')

let code
do {
  code = Array.from({ length: 6 }, () => ALPHABET[randomInt(ALPHABET.length)]).join('')
} while (new RegExp(`['"]?${code}['"]?\\s*:`).test(source))

const [name, message] = process.argv.slice(2)
const link = `http://localhost:5173/?c=${code}`

if (!name) {
  console.log(`\n  New code: ${code}\n  Add to src/recipients.js:  ${code}: { name: 'Name', message: '' },\n  Link: ${link}\n`)
  process.exit(0)
}

if (!source.includes(MARKER)) {
  console.error(`Couldn't find the marker line in src/recipients.js:\n  ${MARKER}`)
  process.exit(1)
}

const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
const entry = `${code}: { name: '${esc(name)}'${message ? `, message: '${esc(message)}'` : ''} },\n\n  `
writeFileSync(FILE, source.replace(MARKER, entry + MARKER))

console.log(`\n  💌 Added ${name} → ${code}\n  Link: ${link}\n  (on your live site: https://<your-domain>/?c=${code})\n`)

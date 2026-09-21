// Opens the responses page:  https://your-site.com/?lenovo=<password>
// Only the SHA-256 of the password is kept here, so the password itself isn't in the built site.
// New password → hash it with:
//   node -e "console.log(require('crypto').createHash('sha256').update('NEW_PASSWORD').digest('hex'))"
const PARAM = 'lenovo'
const HASH = '7b9f7e4cf54e9625541c1138504a9768faca874341ff1a3735408f8bfcec9157'

/** The password from the URL, or null when the param isn't there at all. */
export function adminKeyFromUrl() {
  return new URLSearchParams(window.location.search).get(PARAM)
}

export async function isAdminKey(key) {
  if (!key || !crypto?.subtle) return false // crypto.subtle needs https or localhost
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(key))
  const hex = [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
  return hex === HASH
}

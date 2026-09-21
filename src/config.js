// Personalise everything here ✏️
// The person's name + note come from src/recipients.js, picked by the code in the link:
//   https://your-site.com/?c=k7m2qx
import { recipients } from './recipients'

const params = new URLSearchParams(window.location.search)
const code = (params.get('c') || params.get('code') || '').trim().toLowerCase()
const person = recipients[code] ?? null

export const config = {
  code: person ? code : null,
  recipientName: person?.name || params.get('to') || '',
  endMessage: person?.message || '',
  pickupLine: "glad you didn't say no. be ready by {time}, I'm coming to get you 🚗",
  psLine: 'P.S. normal people text. I made a whole website, during lunch, for you. no big deal.',
  defaultTime: '18:00',
}

// Personalise everything here ✏️
// Tip: you can also pass the name in the link → https://your-site.com/?to=Aisha
const params = new URLSearchParams(window.location.search)

export const config = {
  recipientName: params.get('to') || params.get('name') || '',
  pickupLine: "glad you didn't say no. be ready by {time}, I'm coming to get you 🚗",
  psLine: 'P.S. normal people text. I made a whole website, during lunch, for you. no big deal.',
  defaultTime: '18:00',
}

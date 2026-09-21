# 💌 lovely-date

A cute, animated "will you go on a date with me?" site built with React and Vite.

Flow: **Ask** (the No button runs away) → **She said yes!** (confetti) → **Pick a day + time** → **Pick food** → **"be ready by 6"** → **It's a date!**, and the answer is saved to Firebase.

## Run it

```bash
npm install
npm run dev
```

## Add your Firebase keys

1. Go to the Firebase console, create a project, and add a **Web app**.
2. Turn on **Firestore Database**.
3. Copy `.env.example` to `.env` and paste in the config values.
4. Restart `npm run dev`.

Each accepted date is saved to the `dateResponses` collection (you can change this with `VITE_FIREBASE_COLLECTION`):

```json
{ "recipient": "Aisha", "date": "2026-09-26", "time": "18:00", "food": "sushi",
  "noAttempts": 7, "startedAt": "…", "acceptedAt": "…", "createdAt": <server time>, "userAgent": "…" }
```

Without keys the site still works. Answers are kept in `localStorage` (`lovely-date-responses`) and printed to the console.

Suggested Firestore rules. Visitors can only create a record; you read the records in the console:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dateResponses/{id} {
      allow create: if true;
      allow read, update, delete: if false;
    }
  }
}
```

## Seeing the responses

Open `https://your-site.com/?lenovo=<password>`. With the right password you get a table of every response; any other value shows a 404. Only the SHA-256 of the password is kept in the code (`src/lib/adminKey.js`, which explains how to change it). The page reads straight from Firestore, so the rules above need `allow read: if true;` on `dateResponses`.

## Personal links (code → name)

Names live in `src/recipients.js`:

```js
export const recipients = {
  k7m2qx: { name: 'Aisha', message: "can't wait to see you ✨" },
}
```

Share `https://your-site.com/?c=k7m2qx`. The first page shows "hey **Aisha** 💌". The last page shows "It's a date, **Aisha**!" and the message as a note.

- Run `npm run code` to print a new random code, then add it to the file yourself.
- Run `npm run code -- "Aisha" "optional note"` to create a code and add the person in one step.

The code is also saved with the Firebase record. For other text, see `src/config.js`.

## Sounds

All sound effects and the music-box tune are made with the Web Audio API, so there are no audio files. The spoken lines use the browser's built-in speech voice. The 🔊 and 🎵 buttons in the top-right corner switch them on and off.

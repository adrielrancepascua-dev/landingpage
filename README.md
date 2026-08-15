# Pitch landing page

One-page site for the multi-branch operations demo.

- Features: [features.html](features.html) — in-depth, owner-language writeup of each screen.
- Live demo: [flowershop-demo.vercel.app](https://flowershop-demo.vercel.app)
- Hero proof is Papers & Petals (₱700K+/month, 3 branches).
- Demo numbers on this page and in the app are fictional.

## Run locally

Open `index.html`, or from this folder:

```bash
npx --yes serve .
```

## Reachability

Edit `config.js` and set at least one of:

- `messengerUrl` — e.g. `https://m.me/your.username`
- `whatsappUrl` — e.g. `https://wa.me/639171234567`
- `email`

If those stay empty, the form copies a message so a prospect can paste it back to you in Messenger.

## Deploy

Connect [this repo](https://github.com/adrielrancepascua-dev/landingpage) to Vercel. Root directory `.`, no build command, output `.`

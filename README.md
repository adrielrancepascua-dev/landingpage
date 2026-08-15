# Pitch site

Dark ink / paper / stamp look. Overview is `index.html`. Feature depth is `features.html` — short, not a spec.

- Live demo: [flowershop-demo.vercel.app](https://flowershop-demo.vercel.app)
- Case study: Papers & Petals — ₱626,265 gross in July 2026 (565 orders, 3 branches). Mentioned with their permission.
- Demo ₱ figures are sample data
- Customer storefront is pitched as an optional add-on, not the default
- **Fill `config.js` (Messenger / WhatsApp / email) before you send this to anyone**

## Run locally

```bash
npx --yes serve .
```

## Reachability

Set at least one in `config.js`:

- `messengerUrl` — e.g. `https://m.me/your.username`
- `whatsappUrl` — e.g. `https://wa.me/639171234567`
- `email`

If those stay empty, **Message on Messenger** copies a starter text.

## Deploy

Connect this repo to Vercel. Root `.`, no build command.

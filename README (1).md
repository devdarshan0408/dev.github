# For Kavii, from Dev ❤️

A tiny, one-page surprise website. Pure HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no database. Just open `index.html` (or publish it with GitHub Pages) and it works.

## Files

```
kavii-site/
├── index.html      → all the page content and structure
├── style.css        → all the styling (pastel gradients, glass cards, animations)
├── script.js         → all the interactivity (game, confetti, buttons, sound toggle)
├── kavii.png          → Kavii's photo (you add this — see below)
└── README.md
```

## 1. Add the photo

Drop a photo of Kavii into this same folder and name it **exactly**:

```
kavii.png
```

- It must sit in the same folder as `index.html` (not in a subfolder).
- It must be a `.png` file. If your photo is a `.jpg`, either convert it to PNG, or open `index.html`, find the line `<img src="kavii.png" ...>`, and change `kavii.png` to your actual filename (e.g. `kavii.jpg`).
- The image is used as-is — nothing in the code crops, filters, or edits it.

## 2. Try it locally (optional)

Just double-click `index.html` to open it in a browser. Everything — the game, confetti, sound toggle — works straight from the file, no server needed.

## 3. Upload the project to GitHub

If you don't already have a GitHub account, create one at [github.com](https://github.com).

1. Go to [github.com/new](https://github.com/new) and create a new repository.
   - Name it anything, e.g. `kavii-surprise`.
   - Set it to **Public** (GitHub Pages needs this on the free plan).
   - Do **not** initialize it with a README (you already have one) — or if you do, you'll just merge it in step 3.
2. On your computer, open a terminal in this folder (`kavii-site`) and run:

   ```bash
   git init
   git add .
   git commit -m "My surprise for Kavii"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/kavii-surprise.git
   git push -u origin main
   ```

   Replace `YOUR-USERNAME` and `kavii-surprise` with your actual GitHub username and repo name.

   *(No command line? On the new repo's GitHub page, click "uploading an existing file" and drag in `index.html`, `style.css`, `script.js`, and `kavii.png` directly through the browser.)*

## 4. Publish with GitHub Pages

1. In your repository on GitHub, click **Settings** (top menu bar of the repo).
2. In the left sidebar, click **Pages**.
3. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**.
5. Wait about 1–2 minutes. Refresh the Pages settings screen.

## 5. Get the final link

Once it's published, GitHub shows a banner at the top of the Pages settings screen:

> ✅ Your site is live at `https://YOUR-USERNAME.github.io/kavii-surprise/`

That link is the one to send to Kavii. Open it yourself first on your phone to double-check the photo loads and everything works, then share it with her. 💌

## Notes

- **Sound**: there's a mute/unmute button in the top-right corner. It generates a very soft ambient tone with the Web Audio API (no audio file needed) and never autoplays, since mobile browsers block that anyway — it only starts after she taps the button.
- **Mobile-first**: the layout, font sizes, and touch targets are all tuned for phones first, since that's most likely how she'll open it.
- **Editing text**: all the wording lives in `index.html` inside clearly labeled `<!-- ... -->` section comments, and the funny/random messages live near the top of `script.js` if you want to tweak or add more of them.

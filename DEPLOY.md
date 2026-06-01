# Deploy to GitHub + GitHub Pages

## One-time setup

### 1. Install GitHub CLI (if needed)

Download: https://cli.github.com/

Then sign in:

```powershell
gh auth login
```

### 2. Create the repo and push

From this folder:

```powershell
cd C:\Users\darob\Projects\patriot-tree-care

git add .
git commit -m "Initial commit: Patriot Tree Care marketing site"
git branch -M main

gh repo create patriot-tree-care --public --source=. --remote=origin --push
```

If the repo already exists on GitHub:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/patriot-tree-care.git
git push -u origin main
```

### 3. Enable GitHub Pages

In GitHub: **Settings → Pages → Build and deployment**

- **Source:** GitHub Actions

The workflow `.github/workflows/deploy-pages.yml` runs on every push to `main`.

## Your demo URL

```
https://YOUR_USERNAME.github.io/patriot-tree-care/
```

Replace `YOUR_USERNAME` with your GitHub username. This is free and easy to share before buying a custom domain.

## Custom domain later

When you buy a domain, add it under **Settings → Pages → Custom domain**, and point DNS to GitHub Pages.

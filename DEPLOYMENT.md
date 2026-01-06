# House of Tenjiku - Deployment Guide

This guide explains how to deploy the **House of Tenjiku** application to GitHub Pages using GitHub Actions.

## Critical Troubleshooting: "Github not accepting changes"

If you see an error about permissions or "refusing to allow an OAuth App to create or update workflow", you **MUST** change the repository settings:

1.  Go to your GitHub Repository.
2.  Click **Settings** (Top tab).
3.  On the left sidebar, click **Actions** -> **General**.
4.  Scroll down to **Workflow permissions**.
5.  **Select** "Read and write permissions".
6.  **Check** "Allow GitHub Actions to create and approve pull requests".
7.  Click **Save**.

---

## Step 1: Update the Workflow File

Open `.github/workflows/deploy.yml` in this project.

Find this line:
```yaml
run: npm run build -- --configuration production --base-href /house-of-tenjiku/
```

**YOU MUST CHANGE `/house-of-tenjiku/`** to match your repository name.
*   Example: If your repo is `github.com/johndoe/wellness-app`, change it to `/wellness-app/`.
*   Example: If your repo is `github.com/johndoe/johndoe.github.io`, change it to `/`.

## Step 2: Push and Deploy

1.  Commit and push your code to the `main` branch.
2.  Go to the **Actions** tab in your GitHub repository to watch the build.
3.  If the build finishes successfully (Green checkmark):
    *   Go to **Settings** > **Pages**.
    *   Under **Build and deployment**, ensure **Source** is "Deploy from a branch".
    *   Ensure **Branch** is set to `gh-pages` and `/ (root)`.
    *   Click **Save**.

Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

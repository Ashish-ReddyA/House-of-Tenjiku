# House of Tenjiku - Deployment Guide

This guide explains how to deploy the **House of Tenjiku** application to GitHub Pages using GitHub Actions.

## Prerequisites

- A GitHub account
- Your code pushed to a GitHub repository
- Node.js installed locally (for testing builds)

## Initial Setup

### Step 1: Create GitHub Repository (if not already created)

1. Go to [GitHub](https://github.com) and create a new repository
2. **Important:** Note your repository name (e.g., `house-of-tenjiku`)

### Step 2: Push Your Code to GitHub

If you haven't already, initialize git and push your code:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### Step 3: Configure GitHub Pages Settings

1. Go to your GitHub Repository
2. Click **Settings** (top tab)
3. On the left sidebar, click **Pages**
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
   - Click **Save**

### Step 4: Configure Workflow Permissions

1. In **Settings**, click **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. **Select** "Read and write permissions"
4. **Check** "Allow GitHub Actions to create and approve pull requests"
5. Click **Save**

---

## Step 5: Update the Base Href

**CRITICAL:** You must update the base-href in the workflow file to match your repository name.

Open `.github/workflows/deploy.yml` and find this line:

```yaml
run: npm run build -- --configuration production --base-href /house-of-tenjiku/
```

**Change `/house-of-tenjiku/`** to match your repository name:
- If your repo is `github.com/johndoe/wellness-app`, change it to `/wellness-app/`
- If your repo is `github.com/johndoe/johndoe.github.io`, change it to `/` (just a slash)
- If your repo is `github.com/johndoe/house-of-tenjiku`, keep it as `/house-of-tenjiku/`

## Step 6: Deploy

1. Commit and push your changes (including the workflow file):
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment workflow"
   git push
   ```

2. Go to the **Actions** tab in your GitHub repository to watch the build
3. Wait for the workflow to complete (you'll see a green checkmark when done)
4. Once complete, your site will be live at:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Troubleshooting

### "Github not accepting changes" Error

If you see permission errors:
1. Go to **Settings** → **Actions** → **General**
2. Under **Workflow permissions**, select "Read and write permissions"
3. Check "Allow GitHub Actions to create and approve pull requests"
4. Click **Save**

### Build Fails

- Check the **Actions** tab for error details
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Site Not Loading

- Verify the base-href matches your repository name
- Check that GitHub Pages is enabled in **Settings** → **Pages**
- Ensure the workflow completed successfully

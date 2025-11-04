# Deploy to Vercel (Frontend Only - No Environment Variables Needed!)

Your app is now set up to work **without any backend** or environment variables! The fighter data is bundled with your frontend using Next.js API routes.

## Step 1: Push to GitHub

```bash
cd /Users/Roy/Desktop/AIProject
git init
git add .
git commit -m "UFC Fighter Stats - ready for Vercel"
```

Create a new repo on GitHub, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ufc-fighter-stats.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy on Vercel

1. Go to **https://vercel.com/new**
2. Click **"Import Git Repository"**
3. Select your `ufc-fighter-stats` repo
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
5. **NO ENVIRONMENT VARIABLES NEEDED!**
6. Click **"Deploy"**

That's it! Your app will be live in 2-3 minutes at `https://your-project.vercel.app`

## How It Works

- Fighter data is in `/frontend/app/data/fighters.ts`
- Next.js API routes serve the data:
  - `/api/fighters` - returns all fighters
  - `/api/fighters/[id]` - returns single fighter
- Everything runs on Vercel's edge network (super fast!)
- No separate backend needed

## If You Want to Update Fighter Data Later

1. Edit `/frontend/app/data/fighters.ts`
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update fighter data"
   git push
   ```
3. Vercel auto-deploys!

## Custom Domain (Optional)

In Vercel dashboard:
- Go to Settings → Domains
- Add your custom domain
- Follow DNS instructions

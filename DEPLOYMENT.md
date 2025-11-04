# Deploying UFC Fighter Stats to Vercel

This guide will help you deploy your UFC Fighter Stats application to Vercel.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at https://vercel.com)
3. Git installed on your machine

## Deployment Options

You have two deployment options:

### Option 1: Deploy Frontend Only (Recommended for Quick Start)

This option deploys only the Next.js frontend to Vercel. The backend runs with static fighter data.

#### Step 1: Initialize Git Repository

```bash
cd /Users/Roy/Desktop/AIProject
git init
git add .
git commit -m "Initial commit: UFC Fighter Stats app"
```

#### Step 2: Push to GitHub

1. Create a new repository on GitHub (https://github.com/new)
2. Name it something like `ufc-fighter-stats`
3. Don't initialize with README, .gitignore, or license
4. Run these commands:

```bash
git remote add origin https://github.com/YOUR_USERNAME/ufc-fighter-stats.git
git branch -M main
git push -u origin main
```

#### Step 3: Deploy Frontend to Vercel

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

4. Add Environment Variables:
   - Click "Environment Variables"
   - Add: `NEXT_PUBLIC_API_URL` = `http://localhost:3001` (temporary - see Option 2 for hosted backend)

5. Click "Deploy"

Your frontend will be live at a URL like: `https://your-project.vercel.app`

**Note**: With this option, the app will only work locally since the backend is not deployed. To fully deploy, continue with Option 2.

---

### Option 2: Deploy Both Frontend and Backend (Full Deployment)

For a fully functional deployed app, you need to deploy the backend separately.

#### Backend Deployment Options

##### A. Deploy Backend to Railway (Recommended)

1. Go to https://railway.app
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Railway will provide a URL like: `https://your-backend.up.railway.app`

##### B. Deploy Backend to Render

1. Go to https://render.com
2. Sign up/login with GitHub
3. Click "New +" → "Web Service"
4. Connect your repository
5. Configure:
   - **Name**: ufc-stats-api
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
6. Render will provide a URL like: `https://ufc-stats-api.onrender.com`

#### Update Frontend Environment Variables

Once your backend is deployed:

1. Go to your Vercel project dashboard
2. Go to Settings → Environment Variables
3. Update `NEXT_PUBLIC_API_URL` to your backend URL (e.g., `https://your-backend.up.railway.app`)
4. Redeploy the frontend

---

## Environment Variables Reference

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

For production, update this to your deployed backend URL.

### Backend
No environment variables required for basic setup.

---

## Post-Deployment Steps

1. **Test your deployment**:
   - Visit your Vercel URL
   - Check that fighters load correctly
   - Test filtering and sorting features
   - Click on individual fighters to verify detail pages work

2. **Custom Domain (Optional)**:
   - In Vercel dashboard, go to Settings → Domains
   - Add your custom domain

3. **Monitor Performance**:
   - Use Vercel Analytics to track performance
   - Check Vercel logs for any errors

---

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify the root directory is set correctly
- Check Vercel build logs for specific errors

### API Not Working
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check that backend is deployed and running
- Verify CORS is enabled in backend (already configured)

### Images Not Loading
- Verify `next.config.js` includes all image domains
- Check that TheSportsDB images are accessible

---

## Quick Deploy Commands

### If you need to make changes and redeploy:

```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
git push

# Vercel will automatically redeploy!
```

---

## Local Development

To run locally after cloning:

```bash
# Backend
cd backend
npm install
npm run dev

# Frontend (in a new terminal)
cd frontend
npm install
npm run dev
```

Visit http://localhost:3000

---

## Support

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs

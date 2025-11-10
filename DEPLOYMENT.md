# Expensify Deployment Guide

## ✅ Completed
- ✅ Code pushed to GitHub: https://github.com/shiva1101/expensify
- ✅ Backend `.env` configured with MongoDB URI and JWT secret
- ✅ Frontend `.env` configured for local development
- ✅ Deployment config files created (`render.yaml`, `vercel.json`)

## 🚀 Deploy Backend to Render

### Option 1: Web Dashboard (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account if not already connected
4. Select repository: **shiva1101/expensify**
5. Configure:
   - **Name**: `expensify-backend`
   - **Region**: Oregon (or nearest)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
6. Add Environment Variables:
   ```
   PORT=8000
   MONGO_URI=mongodb+srv://shivam:mMTYS32c1VSjE5fF@epensetracker.scdxdmn.mongodb.net/?retryWrites=true&w=majority&appName=Epensetracker
   JWT_SECRET=fe0f3a9741515aab04ae4837d2b6ced6e6c5f56933458d489fbf6053503ef2ae1d20cd3735892058aa73e9491d3437943a5785742cd8a981a9ddd8192a8520a2
   CLIENT_URL=https://your-frontend-url.vercel.app
   ```
   (Update `CLIENT_URL` after deploying frontend)
7. Click **"Create Web Service"**
8. Wait 3-5 minutes for deployment
9. **Copy your backend URL** (e.g., `https://expensify-backend.onrender.com`)

### Option 2: Using Render Blueprint (render.yaml)
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Blueprint"**
3. Select repository: **shiva1101/expensify**
4. Render will detect `render.yaml` automatically
5. Add the environment variables when prompted
6. Deploy

## 🎨 Deploy Frontend to Vercel

### Option 1: Web Dashboard (Recommended)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository: **shiva1101/expensify**
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend/expensetracker`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api/v1
   ```
   (Use the backend URL from Render)
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment
8. **Copy your frontend URL** (e.g., `https://expensify-xyz.vercel.app`)

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend/expensetracker

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add environment variable
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.onrender.com/api/v1
```

## 🔄 Update Backend with Frontend URL

After deploying frontend:
1. Go back to Render Dashboard
2. Open your **expensify-backend** service
3. Go to **Environment** tab
4. Update `CLIENT_URL` to your Vercel URL
5. Save (this will trigger a redeployment)

## 🧪 Test Your Deployment

1. Open your frontend URL
2. Try to sign up with a new account
3. Upload a profile image
4. Login with the account
5. Verify all features work

## 📝 Important Notes

- **Render Free Tier**: Backend will sleep after 15 minutes of inactivity (first request after sleep takes ~30 seconds)
- **MongoDB**: Your connection string is already configured
- **CORS**: Configured to allow requests from your frontend
- **File Uploads**: Profile images are stored in `backend/uploads/` (consider using cloud storage like Cloudinary for production)

## 🔐 Security Reminders

- Never commit `.env` files (already in `.gitignore`)
- Rotate JWT secret periodically
- Use environment variables in deployment platforms
- Consider using MongoDB Atlas IP whitelist for production

## 🆘 Troubleshooting

### Backend Issues
- Check Render logs: Dashboard → Service → Logs
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend Issues
- Check browser console for errors
- Verify `VITE_API_URL` points to correct backend
- Ensure CORS is configured in backend

### Connection Issues
- Update `CLIENT_URL` in backend to match frontend URL
- Check if backend is awake (Render free tier sleeps)
- Verify API endpoints are correct

## 🎉 You're Done!

Your live URLs:
- **Backend**: `https://your-backend.onrender.com`
- **Frontend**: `https://your-frontend.vercel.app`

Share your live app with the world! 🚀

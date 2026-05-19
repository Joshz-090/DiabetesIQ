# 🌐 DiabetesIQ — Deployment Guide

This guide describes how to deploy the Flask API backend and the React frontend to production environments (Render and Vercel) for free.

---

## 🐍 Part 1: Flask Backend Deployment (Render)

Render is a cloud hosting platform that offers a free tier suitable for running Python web servers.

### Prerequisites
1. Ensure your repository is pushed to a remote git server (GitHub, GitLab, or Bitbucket).
2. The backend folder structure must contain:
   * `backend/app.py`
   * `backend/requirements.txt`
   * `backend/Procfile`
   * `ml/models/diabetes_model.pkl` (Ensure the serialized model is pushed to Git, or uploaded to the server).

### Steps
1. Log in to **[Render](https://render.com/)**.
2. Click **New +** and select **Web Service**.
3. Connect your Git repository.
4. Configure the service settings:
   * **Name:** `diabetes-iq-backend` (or similar)
   * **Root Directory:** `backend` (Important: points Render directly to the backend folder)
   * **Language:** `Python 3`
   * **Build Command:** `pip install -r requirements.txt`
   * **Start Command:** `gunicorn app:app` (Gunicorn is configured in the backend dependencies)
5. Under the **Advanced** section, check environment variables.
   * By default, the model loader searches for `../ml/models/diabetes_model.pkl` relative to the `backend/` folder. Ensure the files exist in your Git repo.
6. Click **Deploy Web Service**.
7. Copy your deployed service URL (e.g., `https://diabetes-iq-backend.onrender.com`).

---

## ⚛️ Part 2: React Frontend Deployment (Vercel)

Vercel is optimized for static and single-page applications built with Vite/React.

### Steps
1. Log in to **[Vercel](https://vercel.com/)**.
2. Click **Add New** and choose **Project**.
3. Select your Git repository.
4. Configure the project settings:
   * **Framework Preset:** `Vite` (Vercel automatically detects this)
   * **Root Directory:** `frontend` (Important: points Vercel to the frontend directory)
   * **Build Command:** `npm run build`
   * **Output Directory:** `dist`
5. **Environment Variables:**
   * Under the Environment Variables section, add a variable:
     * **Name:** `VITE_API_URL`
     * **Value:** Paste your Render backend URL (e.g., `https://diabetes-iq-backend.onrender.com`). Make sure **not** to include a trailing slash.
6. Click **Deploy**.
7. Once deployment finishes, Vercel will give you a public URL for your web application.

---

## 🔧 Part 3: Connecting Frontend to Backend (CORS)

Our Flask server uses `flask-cors` to allow cross-origin requests.
In `backend/app.py`:
```python
from flask_cors import CORS
app = Flask(__name__)
CORS(app) # Allows any origin to call the API
```
This configuration is ideal for testing and simple deployment. If you wish to restrict access to only your React application in production:
```python
CORS(app, resources={r"/predict": {"origins": "https://your-frontend-app.vercel.app"}})
```
This secures your backend from external invocation.

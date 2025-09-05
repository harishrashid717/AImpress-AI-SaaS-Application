# 🧠 AImpress – AI SaaS Application  

🚀 **AImpress – AI SaaS Application is a full-stack platform that combines AI content & image generation, resume analysis, and community sharing with secure authentication and subscription billing. Users can generate AI articles, blog titles, and images (via Gemini 2.0 and ClipDrop APIs), enhance media with Cloudinary AI (background/object removal), and analyze resumes with pdf-parse + Gemini. The platform includes a public creations gallery with a real-time like/unlike system to enable community engagement.

⚡ Optimizations Implemented: Reduced DB storage by ~90% by storing Cloudinary URLs instead of Base64, improved performance with CDN caching & on-the-fly compression, efficiently handled large uploads with Multer + auto file cleanup, and ensured concurrent-safe real-time interactions.** 

🔗 **Live Link**: [AImpress Application](https://aimpress-ai-saas-application-fronte.vercel.app/)  
🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/1GYClmE_pkA?si=Fd5XQaDjCvf_SrCq)  

---

## ✨ What This Project Showcases  

### 🔐 Authentication & Subscriptions  
- **Clerk authentication** with Email/Password & Google login.  
- Role-based access control: **Free users** have usage limits, **Premium users** enjoy unlimited AI features.  
- **Stripe test billing** with webhook simulation to replicate real-world subscription workflows.  

### 🤖 AI Features Implemented  
- **Article Generator** → AI-written articles using Gemini 2.0 Flash.  
- **Blog Title Generator** → SEO-friendly blog titles.  
- **Image Generator** → AI images from text prompts (ClipDrop API).  
- **Background Remover** → Transparent backgrounds via Cloudinary AI.  
- **Object Remover** → AI-powered object removal from uploaded images.  
- **Resume Analyzer** → PDF parsing + Gemini 2.0 API to analyze resumes and provide feedback.  

### 🌍 Community Features  
- Users can **make AI-generated creations public** for community viewing.  
- **Real-time like/unlike system** → counts update instantly across all active users.  
- Concurrent interaction handling → supports multiple users liking/unliking at the same time without conflicts.  

---

## ⚡ Optimizations Implemented  

✅ **Reduced Database Storage by ~90%**  
- Initially, images were stored as **Base64 strings**, which are huge (hundreds of KB → MB).  
- Optimized by uploading to **Cloudinary** and saving only the **secure_url**.  
- This made the DB lighter, faster, and more scalable.  

✅ **Improved Performance via CDN**  
- Images are delivered through **Cloudinary’s global CDN**, ensuring **faster load times worldwide**.  
- Supports on-the-fly **image optimization, compression, and resizing**.  

✅ **Efficient File Handling**  
- Used **Multer** for uploads and automatically deleted temp files with `fs.unlink`.  
- Prevents server storage from filling up with unused files.  

✅ **Optimized Resume Handling**  
- Instead of storing large PDFs, only **parsed text + AI feedback** are stored in DB.  
- Reduces DB load while still retaining all useful resume insights.  

✅ **Scalable Real-time Likes System**  
- Designed **concurrent-safe like/unlike updates** so multiple users can interact simultaneously.  
- Provides instant, conflict-free UI updates.  

✅ **Role-based Usage Limits**  
- Free users → restricted API calls to avoid abuse.  
- Premium users → unlimited access to AI features.  
- Ensures controlled resource usage while offering a real SaaS-like experience.  

---

## 🛠️ How It Works (Under the Hood)  

- **Frontend (React)**  
  - SPA with **React Router** for navigation & route protection.  
  - **Axios** for API requests with error handling.  
  - **Toast notifications** for instant feedback.  
  - **Bootstrap utility classes** for responsive, mobile-friendly UI.  

- **Backend (Node.js + Express)**  
  - **Clerk Middleware** for authentication & role validation.  
  - **Stripe Webhooks** to simulate subscription flow.  
  - **Multer** for handling file uploads.  
  - **Centralized error handling** with custom error codes.  

- **AI Integrations**  
  - **Google Gemini 2.0 Flash** → AI text generation (articles, blogs, resumes).  
  - **ClipDrop API** → AI image generation.  
  - **Cloudinary AI** → Background & object removal + CDN hosting.  
  - **pdf-parse** → Extracts structured text from resumes.  

- **Database (MySQL / Railway)**  
  - Stores **users, subscriptions, and AI-generated content**.  
  - Only **metadata & secure URLs** stored → avoids DB bloat.  
  - Optimized schema for efficient queries and scalability.  

---

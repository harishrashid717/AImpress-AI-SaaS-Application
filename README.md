# 🧠 AImpress – AI SaaS Application  

**AImpress** is a full-stack **AI SaaS platform** built with **React, Node.js, Express, and MySQL**.  
It brings together **AI content & image generation, resume analysis, subscription billing, and community sharing** into one scalable application.  

---

## 🚀 What This Project Does  

- Generate **AI-written articles & blog titles** using **Google Gemini 2.0 API**  
- Create **AI-generated images** from text prompts with **ClipDrop API**  
- Enhance media with **Cloudinary AI** → background & object removal  
- Analyze resumes with **pdf-parse + Gemini 2.0 AI**  
- Share AI creations in a **public gallery** with **real-time like/unlike updates**  

🔗 **Live Link**: [AImpress Application](https://aimpress-ai-saas-application-fronte.vercel.app/)  
🎥 **Demo Video**: [Watch on YouTube](https://youtu.be/1GYClmE_pkA?si=Fd5XQaDjCvf_SrCq)  

---

## ✨ Key Features  

### 🔐 Authentication & Subscriptions  
- Secure **Clerk authentication** (Email/Password + Google login)  
- Role-based access → **Free users (limited)**, **Premium users (unlimited)**  
- **Stripe test billing + webhooks** for subscription simulation  

### 🤖 AI Features  
- **Article Generator** – Gemini 2.0 AI for long-form content  
- **Blog Title Generator** – AI-generated SEO-friendly titles  
- **Image Generator** – Text → Image with ClipDrop API  
- **Background & Object Remover** – Cloudinary AI transformations  
- **Resume Analyzer** – pdf-parse + Gemini for insights & feedback  

### 🌍 Community & Real-time  
- **Public creations gallery** → share AI-generated media  
- **Real-time like/unlike system** → instant updates for all users  
- Handles **concurrent interactions** safely  

---

## ⚡ Optimizations Implemented  

- **Reduced DB Storage (~90%)** → Store only Cloudinary `secure_url` instead of Base64 blobs  
- **Faster Performance** → Images delivered via **Cloudinary CDN** with caching & compression  
- **Efficient File Handling** → Multer + auto temp file cleanup using `fs.unlink`  
- **Optimized Resume Handling** → Only parsed text + feedback stored, not bulky PDFs  
- **Concurrent-Safe Likes** → Real-time like/unlike works without conflicts  
- **Controlled Usage** → Role-based limits prevent abuse, ensuring SaaS-like experience  

---

## 🛠️ Tech Stack  

- **Frontend** → React, React Router, Axios, Bootstrap  
- **Backend** → Node.js, Express.js, Clerk (Auth), Stripe (Test), Multer, pdf-parse  
- **Database** → MySQL (Railway)  
- **AI APIs** → Google Gemini 2.0, ClipDrop, Cloudinary AI  
- **Hosting** → Vercel (Frontend), Railway (DB), Cloudinary (CDN + Image Hosting)  

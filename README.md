# 🚀 MERN Stack Portfolio — Inspired by Hamish Williams

A professional developer portfolio built with **React.js**, **Node.js + Express**, and **MongoDB**, featuring Three.js 3D animations, Framer Motion scroll effects, dark/light mode, and a fully functional contact form with backend storage.

---

## 📁 Project Structure

```
portfolio/
├── frontend/                 # React.js (Vite)
│   ├── src/
│   │   ├── components/      # All UI sections
│   │   │   ├── Navbar.jsx / .css
│   │   │   ├── Hero.jsx / .css       ← Three.js sphere + typewriter
│   │   │   ├── About.jsx / .css
│   │   │   ├── Skills.jsx / .css     ← Animated bars + radial charts
│   │   │   ├── Projects.jsx / .css   ← Filterable project cards
│   │   │   ├── Timeline.jsx / .css   ← Education & Experience
│   │   │   ├── Certifications.jsx / .css
│   │   │   └── Contact.jsx / .css    ← Backend-connected form
│   │   ├── context/
│   │   │   └── ThemeContext.jsx      ← Dark/Light mode
│   │   ├── hooks/
│   │   │   └── useInView.js          ← Scroll animation trigger
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   └── NotFound.jsx
│   │   ├── App.jsx                   ← React Router setup
│   │   ├── main.jsx
│   │   └── index.css                 ← Global theme variables
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express
│   ├── models/
│   │   └── Contact.js        ← Mongoose schema
│   ├── routes/
│   │   ├── contact.js        ← POST /api/contact + GET
│   │   └── cv.js             ← GET /api/cv/pdf + /api/cv/docx
│   ├── uploads/
│   │   └── cv/               ← Place resume.pdf & resume.docx here
│   ├── server.js             ← Express entry point
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- npm v9+
- MongoDB Atlas account (free tier works)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Variables

**Backend:**
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio
PORT=5000
FRONTEND_URL=http://localhost:5173

# Optional — for email notifications via Nodemailer
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password   # Use Gmail App Password, NOT your real password
EMAIL_TO=your@gmail.com
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Add Your CV Files

Place your resume files in `backend/uploads/cv/`:
```
backend/uploads/cv/resume.pdf
backend/uploads/cv/resume.docx
```

### 4. Run Development Servers

```bash
# Terminal 1 — Backend (port 5000)
cd backend && npm run dev

# Terminal 2 — Frontend (port 5173)
cd frontend && npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 🎨 Customization Checklist

### Personal Info
- [ ] `frontend/src/components/Hero.jsx` — Update name, subtitle text
- [ ] `frontend/src/components/About.jsx` — Update bio, location, photo
- [ ] `frontend/src/components/Skills.jsx` — Update skill names and percentages
- [ ] `frontend/src/components/Projects.jsx` — Add your real projects with GitHub + live links
- [ ] `frontend/src/components/Timeline.jsx` — Add your education and experience
- [ ] `frontend/src/components/Certifications.jsx` — Add your certificates and achievements
- [ ] `frontend/src/components/Contact.jsx` — Update your email and social links
- [ ] `frontend/src/components/Navbar.jsx` — Update logo initials (line 19: `YN`)

### Profile Photo
In `About.jsx`, replace the placeholder SVG with:
```jsx
<img src="/assets/profile.jpg" alt="Your Name" />
```
Then add `profile.jpg` to `frontend/public/assets/`.

### Color Theme
In `frontend/src/index.css`, change `--accent`:
```css
:root {
  --accent: #00f5d4;  /* Change to your brand color */
}
```

---

## 🚀 Deployment

### Frontend — Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Set **Root Directory** to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy!

### Backend — Render

1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set **Root Directory** to `backend`
4. Build command: `npm install`
5. Start command: `node server.js`
6. Add environment variables from your `.env`
7. Deploy!

### After Both Are Deployed
- Update `FRONTEND_URL` in your Render backend env vars to your Vercel URL
- Update `VITE_API_URL` in Vercel to your Render backend URL

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contact` | Submit contact form (saved to MongoDB) |
| `GET` | `/api/contact` | List all messages (admin) |
| `GET` | `/api/cv/pdf` | Download resume as PDF |
| `GET` | `/api/cv/docx` | Download resume as .docx |
| `GET` | `/api/health` | Health check |

---

## 📦 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js 18, React Router v6, Vite |
| 3D / Animation | Three.js, Framer Motion |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose |
| Email | Nodemailer (optional) |
| Deployment | Vercel (frontend), Render (backend) |
| Fonts | Syne, DM Mono (Google Fonts) |

---

## ✅ Assignment Checklist

- [x] Hero with typewriter effect and Three.js 3D sphere
- [x] About section with profile photo, bio, stats
- [x] Skills with animated bars + radial progress charts + tooltips
- [x] 4 Projects with GitHub + live links, tech badges, filter by tag
- [x] CV download in PDF and .docx from Express backend route
- [x] Education & Experience vertical animated timeline
- [x] Certifications + Achievements section
- [x] Contact form → Express API → MongoDB storage → Optional email
- [x] React Router SPA
- [x] Dark / Light mode toggle
- [x] Fully responsive (mobile, tablet, desktop)
- [x] Framer Motion scroll animations throughout
- [x] Environment variables via `.env` (not pushed to GitHub)
- [x] `.gitignore` properly configured

---

## 📝 Credits

Design inspired by [Hamish Williams' portfolio](https://hamishw.com) — Three.js displacement sphere concept, minimalist dark aesthetic, and numbered section layout. All code written from scratch for the MERN stack assignment.

---

*Built with ❤️ for the MERN Stack Development course*

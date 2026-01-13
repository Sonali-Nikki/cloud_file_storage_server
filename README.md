# ☁️ Cloud-Based Media Storage – Backend Server

Backend API for a cloud-based file storage and sharing application (Google Drive–like core features).  
Built with **Node.js, Express, Supabase (PostgreSQL + Storage)** and secure authentication.

---

## 🚀 Features

- User authentication (JWT + bcrypt)
- Google OAuth support
- File upload & download (Supabase Storage)
- Folder hierarchy (nested folders)
- File metadata management
- Soft delete (Trash system)
- File sharing with permissions (view/edit)
- Public shareable links with expiry
- Secure signed URLs
- Full-text search with pagination
- Role-based access control (ACL)
- Backend-ready for large-scale storage

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Supabase)
- **Storage:** Supabase Storage (S3 compatible)
- **Auth:** JWT, bcrypt, Google OAuth
- **ORM/Client:** Supabase JS
- **Testing:** Jest, Supertest
- **Deployment:** Render / AWS / GCP

---

## 📁 Project Structure

```

server/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── fileController.js
│   │   ├── shareController.js
│   │   └── searchController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── fileRoutes.js
│   │   ├── shareRoutes.js
│   │   └── searchRoutes.js
│   │
│   ├── middleware/
│   │   ├── auth.js
│   │   └── checkPermission.js
│   │
│   ├── config/
│   │   └── supabase.js
│   │
│   ├── app.js
│   └── server.js
│
├── tests/
│   ├── auth.test.js
│   └── file.test.js
│
├── .env
├── package.json
└── README.md

````

---

## 🔐 Environment Variables

Create a `.env` file in the root:

```env
PORT=5000
NODE_ENV=development

SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=super_secret_key
FRONTEND_URL=http://localhost:5000
````

⚠️ **Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend**

---

## 🧪 Running Locally

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start Server

```bash
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 📌 API Endpoints Overview

### 🔑 Auth

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout
```

### 📁 Files

```
POST   /api/files/upload
GET    /api/files/:id
PATCH  /api/files/:id
DELETE /api/files/:id
```

### 📂 Folders

```
POST   /api/folders
GET    /api/folders/:id
PATCH  /api/folders/:id
DELETE /api/folders/:id
```

### 🔗 Sharing

```
POST   /api/share/:fileId
GET    /api/share/access/:token
```

### 🔍 Search

```
GET    /api/search?q=filename&page=1
```

---

## 🔐 Security

* JWT authentication
* Password hashing with bcrypt
* Supabase Row Level Security (RLS)
* Signed URLs for private files
* Role-based access (owner / edit / view)
* Input validation
* Secure environment variables

---

## 🧪 Testing

Run unit tests:

```bash
npx jest
```

Includes:

* Auth tests
* File access tests
* Permission validation

---

## 🌍 Deployment (Render)

1. Push code to GitHub
2. Create **Web Service** on Render
3. Set build command:

   ```bash
   npm install
   ```
4. Set start command:

   ```bash
   node src/server.js
   ```
5. Add environment variables
6. Deploy 🚀

---

## 📈 Future Enhancements

* File versioning
* Activity logs
* File previews (PDF/Image)
* Storage quota management
* Team folders
* Admin dashboard

---

## 👨‍💻 Author

**Sonali Priyadarshini**
Backend Developer | Full Stack Learner

---





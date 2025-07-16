# 💬 Ruby Chat App

A full-stack group chat application built with the MERN stack (MongoDB, Express, React, Node.js). Supports real-time group messaging, user authentication, and a clean modern UI.

---

## 🚀 Features

- ✅ User Registration & Login (JWT-based Auth)
- ✅ Group Chat Room (one group only)
- ✅ Send & receive messages (real-time feel with polling)
- ✅ Timestamped messages with usernames
- ✅ Secure backend (token-protected APIs)
- ✅ Responsive and clean UI

---

## 🛠️ Tech Stack

**Frontend**  
- React + Vite  
- Tailwind CSS  
- Axios

**Backend**  
- Node.js  
- Express  
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- bcrypt for password hashing

---

## 📸 Screenshots

<img width="1917" height="867" alt="login" src="https://github.com/user-attachments/assets/79d2db55-4299-459b-a14e-134f2a2d9470" />
- login page
<img width="1915" height="963" alt="multilogin" src="https://github.com/user-attachments/assets/d1cf52b9-67d4-4443-99fb-07c9cc9181b2" />
- multi user login
<img width="1918" height="1017" alt="chat" src="https://github.com/user-attachments/assets/c5e1d441-66ea-4442-ab50-ad6a849fbdb1" />
- real time chat




---

## 🧠 How It Works

1. Users register and log in securely.
2. Once authenticated, they can access the chatroom.
3. Messages are sent to the server and stored in MongoDB.
4. Messages are fetched every few seconds to simulate real-time updates.

---

## 🧪 Getting Started Locally

### 📦 Backend

```bash
cd server
npm install
npm run dev
```
### 🌐 Frontend

```bash
cd client
npm install
npm run dev
```
Make sure MongoDB is running locally (mongod) and your .env file is properly configured.

---

### 🔐 Environment Variables (Backend .env)

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/rubychat
JWT_SECRET=yourSuperSecretKey
```

---

### 📁 Project Structure

```ruby-chat-app/
│
├── client/            # React Frontend
│   └── src/
│
├── server/            # Node.js Backend
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── middleware/
│
└── README.md
```

---

### 👤 Author

RICHARD KALVIN R

GitHub: @RICHARDKALVIN

---

### 🌟 Show your support

If you like this project, leave a ⭐ on the repo — it helps a lot!

---

### 📬 Contact

If you want to collaborate or discuss ideas, feel free to reach out.

riczyrichard@gmail.com

---

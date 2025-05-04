Clone the repository.
Run npm install command. npm install
npm install react-router-dom

Run npm run dev. npm run dev



Here’s a clean and detailed `README.md` tailored to your healthcare dashboard chatbot project.

---

## 🩺 Healthcare Dashboard with Chatbot

This is a full-stack React + Node.js healthcare dashboard that includes:

* User authentication (login/signup)
* Dashboard with health intake form
* OpenAI-powered chatbot (resizable & draggable)
* Firebase auth integration
* Responsive Tailwind UI

---

## 🛠️ Project Structure

```
.
├── client/            # React frontend
│   └── src/
│       ├── components/
│       │   ├── Chatbot.jsx
│       │   ├── Dashboard.jsx
│       │   ├── Login.jsx
│       │   ├── Signup.jsx
│       │   ├── IntakeForm.jsx
│       │   └── FormContext.jsx
│       └── App.jsx
│
├── server/            # Node.js backend
│   ├── index.js       # Express server using OpenAI API
│   └── .env           # Contains your OPENAI_API_KEY
```

---

## 🚀 Setup Instructions

### ✅ 1. Clone the repo

```bash
git clone https://github.com/your-username/healthcare-dashboard-chatbot.git
cd healthcare-dashboard-chatbot
```

---

### ✅ 2. Install dependencies

#### 📦 Frontend (React)

```bash
cd client
npm install
```

#### ⚙️ Backend (Express + OpenAI)

```bash
cd ../server
npm install
```

---

### ✅ 3. Firebase Setup (Authentication)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Email/Password** auth under "Authentication"
4. Add your Firebase config to `client/src/firebase.js`:

```js
// client/src/firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '...',
  appId: '...',
};

export const app = initializeApp(firebaseConfig);
```

---

### ✅ 4. Create `.env` in `/server`

```bash
touch .env
```

Paste your [OpenAI API key](https://platform.openai.com/account/api-keys):

```env
OPENAI_API_KEY=sk-...
```

---

### ✅ 5. Run the servers

#### ▶️ Backend

```bash
cd server
npm start
```

> ⚠️ If port 5000 is in use, change it in `index.js`

#### ▶️ Frontend (Dev Server)

```bash
cd client
npm run dev
```

---

### ✅ 6. Access the app

* Open your browser at: [http://localhost:5173](http://localhost:5173)
* Chatbot will appear on the **Dashboard page** only

---

## 🧠 Features

* ✍️ Email/password signup and login
* 📋 Health intake form data storage
* 🤖 ChatGPT-4 turbo integration via OpenAI API
* 💬 Floating chatbot with typing indicator and resizable top-left handle
* 🔒 Firebase Auth with route protection (optional)

---

## 🧼 To-Do / Nice to Have

* [ ] Store intake form data in Firebase Firestore
* [ ] Add avatar icons or message timestamps
* [ ] Animate “Chatbot is typing…” dots
* [ ] Deploy to Vercel + Render (frontend/backend)

---

Let me know if you'd like the Firebase write functionality or Vercel/Render deploy steps added too.

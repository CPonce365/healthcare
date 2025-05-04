// server/index.js
import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();

// ✅ Manual CORS headers for Vite dev server (localhost:5173)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// ✅ Handle OPTIONS requests (CORS preflight)
app.options('*', (req, res) => res.sendStatus(200));

// ✅ Parse JSON request bodies
app.use(express.json());

// ✅ Initialize OpenAI client (v4 SDK)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Chatbot route
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  console.log('[SERVER] Incoming:', message);

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0].message.content;
    console.log('[SERVER] Reply:', reply);

    res.json({ reply });
  } catch (err) {
    console.error('[SERVER] OpenAI error:', err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

// ✅ Server startup
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

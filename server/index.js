import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error('❌ Missing OPENAI_API_KEY in .env');
  process.exit(1);
}

const app = express();

app.use(express.json());

// ✅ CORS for Vite frontend
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', (req, res) => res.sendStatus(200));

// ✅ OpenAI initialization
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Chatbot route
app.post('/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'No message provided' });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: message }],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error('[SERVER] OpenAI error (chat):', err);
    res.status(500).json({ error: 'OpenAI chat request failed' });
  }
});

// ✅ Add this below your /chat endpoint in server/index.js
app.post('/analyze', async (req, res) => {
  const { symptoms } = req.body;

  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ error: 'Invalid symptoms format' });
  }

  const symptomText = symptoms
    .map((entry, i) => `Entry ${i + 1}:\nSymptoms: ${entry.symptoms || 'N/A'}\nStart: ${entry.symptomStartDate || 'N/A'}\n\n`)
    .join('');

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful medical assistant analyzing symptom logs.' },
        { role: 'user', content: `Please analyze the following symptom entries:\n\n${symptomText}` }
      ],
    });

    const summary = completion.choices[0].message.content;
    res.json({ summary });
  } catch (err) {
    console.error('[SERVER] Analysis error:', err);
    res.status(500).json({ error: 'Failed to generate AI analysis' });
  }
});


// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

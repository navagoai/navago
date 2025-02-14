require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// API endpoint to handle user messages
app.post('/send-message', async (req, res) => {
  const userInput = req.body.prompt;

  try {
    const response = await axios.post('https://api.gemini.com/v1/generate', {
      prompt: userInput
    }, {
      headers: {
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`,
        "Content-Type": "application/json"
      }
    });

    res.json({ response: response.data.response });
  } catch (error) {
    res.status(500).json({ error: "Error connecting to AI service" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// AI response route
app.post('/get-response', async (req, res) => {
    const userMessage = req.body.message;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'gpt-4',
            prompt: userMessage,
            max_tokens: 150
        }, {
            headers: {
                'Authorization': `Bearer YOUR_OPENAI_API_KEY`
            }
        });
        res.json({ response: response.data.choices[0].text.trim() });
    } catch (error) {
        res.status(500).send('Error interacting with AI model');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

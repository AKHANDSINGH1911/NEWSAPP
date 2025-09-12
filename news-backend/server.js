const express = require('express');
const axios = require('axios');
const cors = require('cors');
// require('dotenv').config();
require('dotenv').config({ path: './.env' });


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;
console.log('API Key from env:', NEWS_API_KEY);


app.get('/api/news', async (req, res) => {
    const { q } = req.query;

    try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
            params: {
                q,
                apiKey: NEWS_API_KEY
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ error: 'Failed to fetch news' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

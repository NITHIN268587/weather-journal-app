const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

let journal = [];

app.post('/api/weather', async (req, res) => {
  const { city, mood } = req.body;
  const apiKey = 'your_openweather_api_key';
  const response = await axios.get(
    \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\`
  );
  const temp = response.data.main.temp;
  const entry = { city, temp, mood };
  journal.push(entry);
  res.json(entry);
});

app.get('/api/weather', (req, res) => {
  res.json(journal);
});

app.listen(5001, () => console.log('Weather server running on port 5001'));
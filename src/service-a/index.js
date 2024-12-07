const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const serviceBUrl = process.env.SERVICE_B_URL || "http://localhost:3001";

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${serviceBUrl}`);
    res.send(`Service A calling -> ${response.data}`);
  } catch (error) {
    res.status(500).send("Error calling Service B");
  }
});

app.listen(PORT, () => {
  console.log(`Service A running on port ${PORT}`);
});

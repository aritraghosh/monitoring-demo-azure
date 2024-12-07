const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

const serviceCUrl = process.env.SERVICE_C_URL || "http://localhost:3002";

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(`${serviceCUrl}`);
    res.send(`Service B calling -> ${response.data}`);
  } catch (error) {
    res.status(500).send("Error calling Service C");
  }
});

app.listen(PORT, () => {
  console.log(`Service B running on port ${PORT}`);
});

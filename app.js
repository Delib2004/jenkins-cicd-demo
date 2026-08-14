const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    message: 'Tanjiro nezuko chan',
    version: process.env.APP_VERSION || '1.0.0',
    hostname: require('os').hostname(),
    timestamp: new Date().toISOString()
  });
});

// simple health check endpoint - useful for deploy verification
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

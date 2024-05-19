const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require('./dbconnector/db');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Import and use your routers
app.use('/', require('./Users'));
app.use('/', require('./Posts'));
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CLIENT_URL, // Replace with your React app URL
  methods: ['GET'], // Allowed methods
}));

// PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

app.get('/', (req, res) => {
  res.status(200).send({"message": "Hello World!"})
});

// GET endpoint to fetch all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

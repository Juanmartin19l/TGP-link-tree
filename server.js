const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

app.get('/api/links', async (req, res) => {
  try {
    const result = await pool.query('SELECT name, url, description FROM links ORDER BY id');
    const links = result.rows.map((row) => ({
      title: row.name,
      url: row.url,
      description: row.description,
    }));
    res.json(links);
  } catch (err) {
    console.error('Error consultando links:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
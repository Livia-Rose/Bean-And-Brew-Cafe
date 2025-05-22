const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const menuRoutes = require('./routes/menuRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
const port = 3000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Mount routes
app.use('/api/menu', menuRoutes);
app.use('/api/cart', cartRoutes);

// Serve static HTML routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/menu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'MENU.html'));
});

app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'CART.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`Error at ${new Date().toISOString()}: ${err.stack}`);
  res.status(500).json({ error: 'Internal server error' });
});

// Fallback for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Bean & Brew Cafe API running at http://localhost:${port}`);
});
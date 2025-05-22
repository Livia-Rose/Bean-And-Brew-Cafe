const express = require('express');
const router = express.Router();
const { menu, validateItem } = require('../menuData');

// Get entire menu
router.get('/', (req, res) => {
  res.json(menu);
});

// Get specific menu category
router.get('/:category', (req, res) => {
  const category = req.params.category.toLowerCase();
  if (menu[category]) {
    res.json(menu[category]);
  } else {
    res.status(404).json({ error: `Category '${category}' not found` });
  }
});

// Admin endpoint: Add new menu item
router.post('/add', (req, res) => {
  const { category, name, price } = req.body;
  if (!validateItem({ category, name, price })) {
    return res.status(400).json({ error: 'Invalid item data or category' });
  }

  const newItem = {
    id: Math.max(...Object.values(menu).flat().map(item => item.id)) + 1,
    name,
    price,
    category: category.toLowerCase(),
  };
  menu[category.toLowerCase()].push(newItem);
  res.json({ message: 'Item added to menu', item: newItem });
});

// Admin endpoint: Update menu item
router.put('/update/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  const { name, price, category } = req.body;

  let foundItem = null;
  let foundCategory = null;
  for (const cat in menu) {
    const item = menu[cat].find(item => item.id === itemId);
    if (item) {
      foundItem = item;
      foundCategory = cat;
      break;
    }
  }

  if (!foundItem) {
    return res.status(404).json({ error: 'Item not found' });
  }

  if (category && !menu[category.toLowerCase()]) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  if (name || price !== undefined) {
    if (!validateItem({ name: name || foundItem.name, price: price !== undefined ? price : foundItem.price, category: category || foundItem.category })) {
      return res.status(400).json({ error: 'Invalid item data' });
    }
  }

  foundItem.name = name || foundItem.name;
  foundItem.price = price !== undefined ? price : foundItem.price;
  if (category && category.toLowerCase() !== foundCategory) {
    menu[foundCategory] = menu[foundCategory].filter(item => item.id !== itemId);
    foundItem.category = category.toLowerCase();
    menu[category.toLowerCase()].push(foundItem);
  }

  res.json({ message: 'Item updated', item: foundItem });
});

// Admin endpoint: Delete menu item
router.delete('/delete/:itemId', (req, res) => {
  const itemId = parseInt(req.params.itemId);
  let foundCategory = null;
  for (const category in menu) {
    const itemIndex = menu[category].findIndex(item => item.id === itemId);
    if (itemIndex !== -1) {
      foundCategory = category;
      menu[category].splice(itemIndex, 1);
      break;
    }
  }

  if (!foundCategory) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json({ message: 'Item deleted from menu' });
});

module.exports = router;
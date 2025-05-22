const menu = {
  hotCoffee: [
    { id: 1, name: 'Espresso', price: 100, category: 'hotCoffee' },
    { id: 2, name: 'Black Coffee', price: 90, category: 'hotCoffee' },
    { id: 3, name: 'Café Latte', price: 120, category: 'hotCoffee' },
    { id: 4, name: 'Cappuccino', price: 130, category: 'hotCoffee' },
  ],
  coldCoffee: [
    { id: 5, name: 'Cold Brew', price: 140, category: 'coldCoffee' },
    { id: 6, name: 'Frappe', price: 160, category: 'coldCoffee' },
    { id: 7, name: 'Iced Americano', price: 110, category: 'coldCoffee' },
  ],
  tea: [
    { id: 8, name: 'Masala Chai', price: 70, category: 'tea' },
    { id: 9, name: 'Green Tea', price: 80, category: 'tea' },
    { id: 10, name: 'Ginger Tea', price: 75, category: 'tea' },
    { id: 11, name: 'Cardamom Tea', price: 85, category: 'tea' },
    { id: 12, name: 'Tulsi Tea', price: 90, category: 'tea' },
  ],
  desserts: [
    { id: 13, name: 'Blueberry Cheesecake', price: 160, category: 'desserts' },
    { id: 14, name: 'Caramel Pudding', price: 150, category: 'desserts' },
    { id: 15, name: 'Choco Lava Cake', price: 170, category: 'desserts' },
    { id: 16, name: 'Vanilla Ice Cream', price: 120, category: 'desserts' },
    { id: 17, name: 'Brownie Sundae', price: 180, category: 'desserts' },
    { id: 18, name: 'Chocolate Mousse', price: 160, category: 'desserts' },
    { id: 19, name: 'Tiramisu', price: 200, category: 'desserts' },
  ],
};

// In-memory cart
let cart = [];

// Utility function to find item by ID
function findItemById(itemId) {
  for (const category in menu) {
    const item = menu[category].find(item => item.id === itemId);
    if (item) return item;
  }
  return null;
}

// Utility function to validate item data
function validateItem(item) {
  return (
    item &&
    item.name &&
    typeof item.name === 'string' &&
    typeof item.price === 'number' &&
    item.price >= 0 &&
    item.category &&
    menu[item.category.toLowerCase()]
  );
}

module.exports = { menu, cart, findItemById, validateItem };
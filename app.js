const express = require('express');
const app = express();

const db = require('./db');
const ItemController = require('./items/ItemController');
const ShoppingController = require('./shoppingListController');

app.use('/Item', ItemController);
app.use('/ShoppingList', ShoppingController);
module.exports = app;
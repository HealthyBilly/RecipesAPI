const express = require('express');
const controller = require('./controller/index.js');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get('/getrecipes/:prefs/:num', controller.getRecipes);
app.get('/getingredients/:num?', controller.getIngredients);

app.listen(port, () => {
  console.log(`HealthyBilly is listening to you http://localhost:${port}`)
});
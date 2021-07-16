const ingredients = require('./data/importIngredients.js');
const connection = require('./db/mongo.js');
const mongoose = require('mongoose');
const model = require()

const ingredientSchema = new mongoose.Schema ({
  id: {
    type: Number,
    unique: true
  },
  ingredient_name: String,
  picture_url: String,
  price: Number,
});

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

function loadInitialIngredients (ingredients) {
  for (let i = 0; i < ingredients.length; i++) {
    const ing = ingredients[i];
    const eachIngredient = new Ingredient({
      id: ing.id,
      ingredient_name: ing.ingredient_name,
      picture_url: ing.picture_url,
      price: ing.price,
    });
    eachIngredient.save()
      .then(console.log('saved'))
      .catch((err)=>console.log(err));
  }
};

loadInitialIngredients(ingredients);
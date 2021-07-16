const mongoose =  require('mongoose');
const connection = require('../../db/mongo.js');

// Kenneth should be able to pass in a preference
// and number of recipes per week
module.exports = {
  getRecipes: function (pref, numOfRecipes) {
    const num = Number(numOfRecipes);
    return (
      Recipe.find({[pref]: true}).limit(num)
    );
  },
  getIngredients: function (numOfIng = 20) {
    return (
      Ingredient.find().limit(Number(numOfIng))
    );
  }

};

const recipeSchema = new mongoose.Schema ({
  diets: [String],
  whole30: Boolean,
  paleo: Boolean,
  vegan: Boolean,
  dairyFree: Boolean,
  pescatarian: Boolean,
  glutenFree: Boolean,
  vegetarian: Boolean,
  keto: Boolean,
  id: {
    type: Number,
    unique: true
  },
  recipe_name: String,
  picture_url: String,
  servings: Number,
  price: Number
});
const Recipe = mongoose.model('Recipe', recipeSchema);

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
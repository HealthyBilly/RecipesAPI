const recipe = require('./data/importRecipes.js');
const connection = require('./db/mongo.js');
const mongoose = require('mongoose');

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

function loadInitialRecipes (recipe) {
  for (let i = 0; i < recipe.length; i++) {
    console.log("this number now: ", i);
    const r = recipe[i];
    const random = Math.floor(Math.random() * (10-7)+7);
    const eachRecipe = new Recipe({
      diets: r.diets,
      whole30:r.whole30,
      paleo: r.paleo,
      vegan: r.vegan,
      dairyFree: r.dairyFree,
      pescatarian: r.pescatarian,
      glutenFree: r.glutenFree,
      vegetarian: r.vegetarian,
      keto: r.keto,
      id: r.id,
      recipe_name: r.recipe_name,
      picture_url: r.picture_url,
      servings: r.servings,
      price: random
    });
    eachRecipe.save()
      .then(console.log('saved'))
      .catch((err)=>console.log(err));
  }
}

loadInitialRecipes(recipe);

const axios = require('axios');
const fs = require('fs');
const config = require('../config.js');

const apiKey = config.apiKey; // Ima steal
const diets = ['keto', 'paleo', 'vegan', 'lacto ovo vegetarian', 'gluten free', 'dairy free', 'pescatarian', 'whole 30'];

var getRecipes = (type) => {
var recipes = {};

  Promise.all(diets.map(name => {
    // get recipes for each of the diets listed in the diets array
    return axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${name}&number=15&addRecipeInformation=true&fillIngredients=true&sort=popularity&type=${type}`)
      .then(res => {
        var temp = {};
        for (var i = 0; i < res.data.results.length; i++) {
          var recipe = res.data.results[i]
          temp[recipe.id] = recipe;
        }

        recipes[name] = temp;
      })
  }))
  .then((results) => {
    var fileName = (type === 'side dish') ? 'sideRecipes' : 'mainRecipes';
    var recipesJSON = JSON.stringify(recipes, null, 2);
    fs.writeFile(`${fileName}.json`, recipesJSON, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log('Data written to file');
      }
    })
  })
  .catch((err) => {
    console.log(err);
  })
}

getRecipes('side dish');
getRecipes('main course');


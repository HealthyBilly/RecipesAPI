const fs = require('fs');

var allRecipes = {};
var allIngredients = {};
var allRecipes_Ingredients = {};

var importRecipes = [];
var importIngredients = [];
var importRecipes_Ingredients = [];
var count = 1;

var formatData = (type) => {
  var data = JSON.parse(fs.readFileSync(`./data/${type}Recipes_orig.json`));

  for (var diet in data) {
    var dietObj = data[diet];

    for (var recipe in dietObj) {
      var recipeObj = dietObj[recipe];

      if (!allRecipes[recipe]) {
        // add to recipes
        allRecipes[recipe] = {};
        var temp = allRecipes[recipe];
        temp['diets'] = [];
        if (diet === 'whole 30') {
          diet = 'whole30';
        }

        var dietNames = ['whole30', 'paleo', 'vegan', 'dairyFree', 'pescatarian', 'glutenFree', 'vegetarian', 'keto'];
        for (var i = 0; i < dietNames.length; i++) {
          temp[dietNames[i]] = false;
        }

        if (diet === 'whole30' || diet === 'keto') {
          temp['diets'].push(diet);
        }

        var dietNamesOrig = {
          'paleolithic': 'paleo',
          'vegan': 'vegan',
          'dairy free': 'dairyFree',
          'pescatarian': 'pescatarian',
          'gluten free': 'glutenFree',
          'lacto ovo vegetarian': 'vegetarian'
        };

        for (var origDiet in dietNamesOrig) {
          if ((recipeObj['diets'].indexOf(origDiet) > -1) && (temp['diets'].indexOf(dietNamesOrig[origDiet]) < 0)) {
            temp['diets'].push(dietNamesOrig[origDiet]);
          }
        }

        for (var i = 0; i < temp['diets'].length; i++) {
          temp[temp['diets'][i]] = true;
        }

        temp['id'] = Number(recipe);
        temp['recipe_name'] = recipeObj['title'];
        temp['picture_url'] = recipeObj['image'];
        temp['servings'] = recipeObj['servings'];
        temp['recipe_description'] = recipeObj['summary'];
        temp['time_minutes'] = recipeObj['readyInMinutes'];
        temp['meal_type'] = type;

        // add to ingredients
        var ingredientsArr = recipeObj['extendedIngredients'];
        for (var i = 0; i < ingredientsArr.length; i++) {
          var ingredient = ingredientsArr[i];
          if (ingredient.id !== null &&
            ingredient.aisle !== null &&
            ingredient.aisle.indexOf('Frozen') < 0 &&
            ingredient.aisle.indexOf('Baking') < 0 &&
            ingredient.aisle.indexOf('Bake') < 0 &&
            ingredient.aisle.indexOf(';') < 0 &&
            !allIngredients[ingredient.id]) {
            allIngredients[ingredient.id] = {
              id: ingredient.id,
              ingredient_name: ingredient.nameClean,
              picture_url: `https://spoonacular.com/cdn/ingredients_500x500/${ingredient.image}`,
              price: Number((Math.random() * (8.00 - 1.00) + 1.00).toFixed(2)),
              aisle: ingredient.aisle
            }
          }
        }

        // add to join recipes_ingredients
        if (!allRecipes_Ingredients[recipe]) {
          allRecipes_Ingredients[recipe] = [];
          for (var i = 0; i < ingredientsArr.length; i++) {
            if (allIngredients[ingredientsArr[i].id]) {
              allRecipes_Ingredients[recipe].push({
                id: count,
                recipe_id: Number(recipe),
                ingredient_id: ingredientsArr[i].id
              })
              count++;
            }
          }
        }
      }
    }
  }
};

formatData('main');
formatData('side');

// recipes_ingredients join
for (var recipe in allRecipes_Ingredients) {
  for (var i = 0; i < allRecipes_Ingredients[recipe].length; i++) {
    importRecipes_Ingredients.push(allRecipes_Ingredients[recipe][i]);
  }
}
var importRecipes_IngredientsJSON = JSON.stringify(importRecipes_Ingredients, null, 2);
fs.writeFile('importRecipes_Ingredients.json', importRecipes_IngredientsJSON, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data written to file');
  }
})

// ingredients
for (var id in allIngredients) {
  importIngredients.push(allIngredients[id]);
}
var importIngredientsJSON = JSON.stringify(importIngredients, null, 2);
fs.writeFile('importIngredients.json', importIngredientsJSON, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data written to file');
  }
})

// recipes
for (var id in allRecipes) {
  importRecipes.push(allRecipes[id]);
}
var importRecipesJSON = JSON.stringify(importRecipes, null, 2);
fs.writeFile('importRecipes.json', importRecipesJSON, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Data written to file');
  }
})





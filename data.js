const axios = require('axios');

const apiKey = '0739bb7a9d064ca99b928c3020b10f75'; // Ima steal
const diets = ['keto', 'paleo', 'vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'pescatarian', 'whole30'];
const recipes = {};
const info = [];

// const req1 = axios.get(`https://api.spoonacular.com/recipes/findByNutrients`);
// const req2 = axios.get('https://api.spoonacular.com/recipes/findByNutrients')

axios.all(diets.map(name => {
  // get recipes for each of the diets listed in the diets array
  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${name}`)
    .then(res => {
      // in recipes object, store the name of the recipe and the recipe itself
      recipes[name] = res.results;
      // store all the recipe names into an array
      const idArr = Object.keys(recipes);
      // join them all with a comma in between
      const strId = idArr.join(",");
      // Perform a mass get of each of the recipes for their ingredients
      // TODO: ADD method to store data
      axios.get(`https://api.spoonacular.com/recipes/informationBulk?apiKey=${apiKey}&ids=${strId}`)
        .then(res => {
          {
            // Do something here :3
          }
        })
    })
    .then()
    .catch(err => {
      console.log("Error: ", err);)
    });
})


axios.all('https://api.spoonacular.com/recipes/findByNutrients')
const axios = require('axios');

const apiKey = '0739bb7a9d064ca99b928c3020b10f75'; // Ima steal
const diets = ['keto', 'paleo', 'vegan', 'vegetarian', 'glutenFree', 'dairyFree', 'pescatarian', 'whole30'];
const recipes = {};
const info = [];

// const req1 = axios.get(`https://api.spoonacular.com/recipes/findByNutrients`);
// const req2 = axios.get('https://api.spoonacular.com/recipes/findByNutrients')

axios.all(diets.map(name => {
  axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&diet=${name}`)
    .then(res => {
      recipes[name] = res.results;
      const idArr = Object.keys(recipes);
      const strId = idArr.join(",");
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
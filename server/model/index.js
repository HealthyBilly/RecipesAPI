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
  }
};
const model = require('../model/index.js');

module.exports = {
  getRecipes: function (req, res) {
    const { prefs, num } = req.params;
    model.getRecipes(prefs, num)
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err)=>{
        console.log(err);
        res.status(400).send(err);
      });
  },
  getIngredients: function (req, res) {
    const { num } = req.params;
    model.getIngredients(num)
      .then((data)=>{
        res.status(200).send(data);
      })
      .catch((err)=>{
        console.log(err);
        res.status(400).send(err);
      });
  }
}
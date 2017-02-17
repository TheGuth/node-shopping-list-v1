const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


const {Recipes} = require('./models');

// we're going to add some recipes to Recipes
// so there's some data to look at
Recipes.create(
  'boiled white rice', ['1 cup white rice', '2 cups water', 'pinch of salt']);
Recipes.create(
  'milkshake', ['2 tbsp cocoa', '2 cups vanilla ice cream', '1 cup milk']);


router.get('/', (req, res) => {
  res.json(Recipes.get());
});

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['name', 'ingredients'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  const item = ShoppingList.create(req.body.name, req.body.ingredients);
    res.status(201).json(item);
});

router.delete('/:id', (req, res) => {
  Recipes.delete(req.params.id);
  console.log(`Deleted Recipe \`${req.params.id}\``);
  res.status(204).end();
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['name', 'ingredients', 'id'];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }
  if (req.params.id !== req.body.id) {
    const message = (
      `Request path id (${req.params.id}) and request body id `
      `(${req.body.id}) must match`);
    console.error(message);
    return res.status(400).send(message);
  }
  console.log(`Updating recipe item \`${req.params.id}\``);
  const updatedItem = Recipes.update({
    id: req.params.id,
    name: req.body.name,
    ingredients: req.body.ingredients
  });
  res.status(200).json(updatedItem);
});

module.exports = router;
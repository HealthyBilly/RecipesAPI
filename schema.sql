DROP DATABASE IF EXISTS healthyBilly;

CREATE DATABASE healthyBilly;

DROP TABLE IF EXISTS recipes, ingredients, billyjoinme, recipes_import;

CREATE TABLE recipes (
  id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY UNIQUE,
  recipe_name VARCHAR(200) NOT NULL,
  vegetarian BOOLEAN DEFAULT false,
  vegan BOOLEAN DEFAULT false,
  glutenFree BOOLEAN DEFAULT false,
  dairyFree BOOLEAN DEFAULT false,
  paleo BOOLEAN DEFAULT false,
  keto BOOLEAN DEFAULT false,
  pescatarian BOOLEAN DEFAULT false,
  whole30 BOOLEAN DEFAULT false,
  diets VARCHAR(50) [],
  picture_url VARCHAR(2048) NOT NULL,
  servings INT,
  recipe_description VARCHAR(2048),
  time_minutes INT,
  meal_type VARCHAR(100)
);

CREATE TABLE ingredients (
  id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY UNIQUE,
  ingredient_name VARCHAR(50) NOT NULL,
  picture_url VARCHAR(2048) NOT NULL,
  price DECIMAL,
  aisle VARCHAR(300)
);

CREATE TABLE billyjoinme (
  id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  recipe_id INT,
  ingredient_id INT,

  FOREIGN KEY(recipe_id)
    REFERENCES recipes(id),

  FOREIGN KEY(ingredient_id)
    REFERENCES ingredients(id)
);

-- CREATE TABLE products (
--   id INT PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
--   product_name VARCHAR(100) NOT NULL,
--   picture_url VARCHAR(2048) NOT NULL
-- );

-- CREATE UNLOGGED TABLE recipes_import (doc JSON);
-- \COPY recipes_import FROM '/Users/chhuong/Documents/HRSFO135/RecipesAPI/data/importRecipes.json';

INSERT INTO recipes (id, recipe_name, vegetarian, vegan, glutenFree, dairyFree, paleo, keto, pescatarian, whole30, diets, picture_url, servings, recipe_description, time_minutes, meal_type)
SELECT r.*
FROM recipes_import l
  CROSS JOIN LATERAL json_populate_recordset(null::recipes, doc) as r;

SELECT SETVAL(pg_get_serial_sequence('recipes', 'id'), (SELECT max(id) FROM recipes));
SELECT SETVAL(pg_get_serial_sequence('ingredients', 'id'), (SELECT max(id) FROM ingredients));
SELECT SETVAL(pg_get_serial_sequence('billyjoinme', 'id'), (SELECT max(id) FROM billyjoinme));

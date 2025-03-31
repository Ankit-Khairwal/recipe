const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Recipe title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Recipe description is required']
  },
  ingredients: [{
    type: String,
    required: [true, 'Ingredients are required']
  }],
  instructions: {
    type: String,
    required: [true, 'Cooking instructions are required']
  },
  cookingTime: {
    type: Number,
    required: [true, 'Cooking time is required']
  },
  servings: {
    type: Number,
    required: [true, 'Number of servings is required']
  },
  category: {
    type: String,
    required: [true, 'Recipe category is required'],
    enum: ['appetizer', 'main course', 'dessert', 'beverage', 'side dish', 'breakfast', 'lunch', 'dinner']
  },
  imageUrl: {
    type: String,
    default: 'https://via.placeholder.com/350x250'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;

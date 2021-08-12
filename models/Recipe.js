const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecipeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      rquired: true,
    },
    instructions: {
      type: String,
      required: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
    username: String,
  },
  {
    timestamp: true,
  }
);

RecipeSchema.index({
  "$**": "text",
});

module.exports = mongoose.model("Recipe", RecipeSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  colors: [
    {
      name: {
        type: String,
      },
      tones: [
        {
          name: {
            type: String,
          },
          shade: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = Product = mongoose.model("products", ProductSchema);

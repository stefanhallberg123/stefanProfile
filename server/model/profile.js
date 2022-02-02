const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const profileSchema = new mongoose.Schema({
  gender: {
    type: String,
  },
  title: {
    type: String,
    trim: true,
    required: true,
    maxlength: 3,
  },
  first: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  last: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
  },
  country: {
    type: String,
    required: true,
  },
  uuid: {
    ObjectId,
  },
  age: {
    type: Number,
    required: true,
  },
  large: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = mongoose.model("Profile", profileSchema);

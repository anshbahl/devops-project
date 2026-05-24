const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: String,
  filepath: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("File", fileSchema);
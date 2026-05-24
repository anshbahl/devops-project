const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  try {
    const file = await File.create({
      filename: req.file.filename,
      filepath: req.file.path,
      user: req.user
    });

    res.json({ msg: "File uploaded", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
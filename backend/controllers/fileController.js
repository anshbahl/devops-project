const File = require("../models/File");

exports.uploadFile = async (req, res) => {
  try {
    // Safety check: Make sure Multer actually caught the file asset
    if (!req.file) {
      return res.status(400).json({ msg: "No file asset provided" });
    }

    const file = await File.create({
      filename: req.file.filename,
      filepath: req.file.path,
      // Extract the target ID string cleanly from your JWT payload middleware assignment
      user: req.user.id || req.user 
    });

    res.json({ msg: "File uploaded successfully", file });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
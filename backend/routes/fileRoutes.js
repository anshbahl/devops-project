const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
const { uploadFile } = require("../controllers/fileController");

router.post("/upload", auth, upload.single("file"), uploadFile);

module.exports = router;
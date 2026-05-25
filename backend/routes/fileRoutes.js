const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const auth = require("../middleware/authMiddleware");
// ✅ Make sure you import getFiles from your controller file
const { uploadFile, getFiles } = require("../controllers/fileController");

// ✅ 1. Add the missing GET route for file list asset loading
router.get("/", auth, getFiles);

// 2. Your working upload post handler
router.post("/upload", auth, upload.single("file"), uploadFile);

module.exports = router;
const express = require("express");
const router = express.Router();
const { createShortUrl, getUrlStats } = require("../controllers/urlController");

router.post("/", createShortUrl);
router.get("/:shortcode", getUrlStats);

module.exports = router;

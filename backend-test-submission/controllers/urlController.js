const { v4: uuidv4 } = require("uuid");
const { Log } = require("../../logging-middleware/logger");
const { generateUniqueCode } = require("../utils/shortCodeGenerator");

const urls = {};

exports.createShortUrl = async (req, res) => {
  const { url, validity = 30, shortcode } = req.body;

  if (!url || typeof url !== "string") {
    await Log("backend", "error", "handler", "Invalid URL input");
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let code = shortcode || generateUniqueCode();
  if (urls[code]) {
    return res.status(409).json({ error: "Shortcode already in use" });
  }

  const expiry = new Date(Date.now() + validity * 60 * 1000).toISOString();
  urls[code] = {
    originalUrl: url,
    expiry,
    createdAt: new Date().toISOString(),
    clicks: [],
  };

  await Log("backend", "info", "service", `Short URL created for ${code}`);
  const host = process.env.HOST || "localhost";
  const port = process.env.PORT || 4000;
  res.status(201).json({
    shortLink: `http://${host}:${port}/${code}`,
    expiry,
  });
};

exports.getUrlStats = async (req, res) => {
  const code = req.params.shortcode;
  const data = urls[code];

  if (!data) {
    await Log("backend", "warn", "repository", `Shortcode ${code} not found`);
    return res.status(404).json({ error: "Shortcode not found" });
  }

  res.json({
    originalUrl: data.originalUrl,
    createdAt: data.createdAt,
    expiry: data.expiry,
    totalClicks: data.clicks.length,
    clicks: data.clicks,
  });
};

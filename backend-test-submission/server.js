require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Log, setAuthToken } = require("../logging-middleware/logger");
const urlRoutes = require("./routes/urlRoutes");

const app = express();
app.use(cors());
app.use(express.json());


app.use(async (req, res, next) => {
  await Log("backend", "info", "middleware", `${req.method} ${req.url}`);
  next();
});

app.use("/shorturls", urlRoutes);

// Redirection route (optional)
app.get("/:shortcode", (req, res) => {
  res.status(501).send("Redirection not implemented in this stub.");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

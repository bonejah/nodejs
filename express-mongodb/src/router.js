const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
router.get("/", (req, res) => {
  res.json({ message: "Hello Houter" });
});

router.get("/healthz", (req, res) => {
  mongoose.connection.db
    .admin()
    .ping()
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500));
});

module.exports = router;

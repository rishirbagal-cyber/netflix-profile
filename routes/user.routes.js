const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Server is running
 */
router.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

module.exports = router;

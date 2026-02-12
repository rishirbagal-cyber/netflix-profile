const express = require("express");
const multer = require("multer");

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


// =====================
// MIDDLEWARE
// =====================
app.use(express.json());

// =====================
// HEALTH CHECK ROUTE
// =====================
app.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

// =====================
// FILE UPLOAD SETUP
// =====================
const upload = multer({ dest: "uploads/" });

/**
 * @swagger
 * /api/user/upload:
 *   post:
 *     summary: Upload user profile picture
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               profilePic:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Bad request
 */
app.post("/api/user/upload", upload.single("profilePic"), (req, res) => {
  res.status(201).json({
    message: "File uploaded successfully",
  });
});

// =====================
// PROFILE UPDATE ROUTE
// =====================
/**
 * @swagger
 * /profiles/{profileId}:
 *   patch:
 *     summary: Update a profile
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *         description: Profile ID
 *       - in: query
 *         name: source
 *         schema:
 *           type: string
 *         description: Update source
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               theme:
 *                 type: string
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 */
app.patch("/profiles/:profileId", (req, res) => {
  const { profileId } = req.params;
  const { source } = req.query;
  const { theme, language } = req.body;

  res.status(200).json({
    message: `Updating profile ${profileId} from ${source} with language ${language}.`,
  });
});

/**
 * @swagger
 * /profiles/{profileId}:
 *   delete:
 *     summary: Delete a profile
 *     parameters:
 *       - in: path
 *         name: profileId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Profile deleted successfully
 *       404:
 *         description: Profile not found
 */
app.delete("/profiles/:profileId", (req, res) => {
  const { profileId } = req.params;

  res.status(200).json({
    message: `Profile ${profileId} deleted successfully`,
  });
});


// =====================
// GLOBAL ERROR HANDLER
// =====================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;

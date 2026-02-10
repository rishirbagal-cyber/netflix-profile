const express = require('express');
const multer = require('multer');

const app = express();
app.use(express.json());

// =====================
// HEALTH CHECK ROUTE
// =====================
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// =====================
// FILE UPLOAD SETUP
// =====================
const upload = multer({ dest: 'uploads/' });

app.post('/api/user/upload', upload.single('profilePic'), (req, res) => {
  res.status(201).json({
    message: 'File uploaded successfully'
  });
});

// =====================
// YOUR EXISTING ROUTE
// =====================
app.patch('/profiles/:profileId', (req, res) => {
  const { profileId } = req.params;
  const { source } = req.query;
  const { theme, language } = req.body;

  res.json({
    message: `Updating profile ${profileId} from ${source} with language ${language}.`
  });
});

module.exports = app;

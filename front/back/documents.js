
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const Document = require('../models/Document');

// Get all documents
router.get('/', verifyToken, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new document
router.post('/', verifyToken, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newDocument = new Document({
      title,
      content,
      user: req.user.id
    });

    const document = await newDocument.save();
    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
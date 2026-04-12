const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const CV_DIR = path.join(__dirname, '../uploads/cv');

// ─── GET /api/cv/pdf ──────────────────────────────────────────
router.get('/pdf', (req, res) => {
  const filePath = path.join(CV_DIR, 'resume.pdf');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'CV PDF not found. Please upload resume.pdf to backend/uploads/cv/',
    });
  }

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename="YourName_Resume.pdf"');
  res.sendFile(filePath);
});

// ─── GET /api/cv/docx ─────────────────────────────────────────
router.get('/docx', (req, res) => {
  const filePath = path.join(CV_DIR, 'resume.docx');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      success: false,
      message: 'CV DOCX not found. Please upload resume.docx to backend/uploads/cv/',
    });
  }

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  );
  res.setHeader('Content-Disposition', 'attachment; filename="YourName_Resume.docx"');
  res.sendFile(filePath);
});

module.exports = router;

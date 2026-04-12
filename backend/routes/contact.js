const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// ─── POST /api/contact ────────────────────────────────────────
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    // Save to MongoDB
    const newContact = await Contact.create({ name, email, message });

    // ─── Optional: Send email notification ───────────────────
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use App Password, not real password
          },
        });

        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          subject: `New Portfolio Message from ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #0ef; border-bottom: 2px solid #0ef; padding-bottom: 10px;">
                New Portfolio Contact
              </h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #666;">Name:</td>
                  <td style="padding: 8px;">${name}</td>
                </tr>
                <tr style="background: #f9f9f9;">
                  <td style="padding: 8px; font-weight: bold; color: #666;">Email:</td>
                  <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; font-weight: bold; color: #666; vertical-align: top;">Message:</td>
                  <td style="padding: 8px; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>
              <p style="color: #999; font-size: 12px; margin-top: 20px;">
                Received at ${new Date().toLocaleString()} • Portfolio Contact System
              </p>
            </div>
          `,
        });
      } catch (emailErr) {
        // Email failure should not block the response
        console.error('Email notification failed:', emailErr.message);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message received! I will get back to you soon.',
      data: { id: newContact._id },
    });

  } catch (error) {
    console.error('Contact route error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

// ─── GET /api/contact ─────────────────────────────────────────
// (For admin use — protect with auth middleware in production)
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, count: contacts.length, data: contacts });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;

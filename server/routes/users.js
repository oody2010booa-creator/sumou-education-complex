import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { query } from '../database/init.js';

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await query('SELECT id, email, name, role, phone, status FROM users');
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { email, password, name, role } = req.body;
    // Implementation for creating users
    res.status(201).json({ success: true, message: 'User created' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;

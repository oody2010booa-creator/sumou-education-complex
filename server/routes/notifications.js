import express from 'express';
import * as notificationController from '../controllers/notificationController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, notificationController.getAllNotifications);
router.put('/:id/read', authenticate, notificationController.markAsRead);
router.post('/', authenticate, notificationController.createNotification);

export default router;

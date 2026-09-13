import express from 'express';
import * as dashboardController from '../controllers/dashboardController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/stats', authenticate, authorize(['admin']), dashboardController.getDashboardStats);
router.get('/charts', authenticate, authorize(['admin']), dashboardController.getChartData);

export default router;

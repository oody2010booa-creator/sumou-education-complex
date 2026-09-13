import express from 'express';
import * as paymentController from '../controllers/paymentController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, authorize(['admin']), paymentController.getAllPayments);
router.post('/', authenticate, authorize(['admin']), paymentController.createPayment);
router.get('/student/:studentId', authenticate, paymentController.getStudentPayments);

export default router;

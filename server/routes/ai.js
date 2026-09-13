import express from 'express';
import * as aiController from '../controllers/aiController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/student/:studentId/analyze', authenticate, aiController.analyzeStudent);
router.get('/predict-at-risk', authenticate, aiController.predictAtRisk);
router.post('/chat', authenticate, aiController.chatAssistant);

export default router;

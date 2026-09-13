import express from 'express';
import * as classController from '../controllers/classController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, classController.getAllClasses);
router.post('/', authenticate, authorize(['admin']), classController.createClass);
router.put('/:id', authenticate, authorize(['admin']), classController.updateClass);
router.delete('/:id', authenticate, authorize(['admin']), classController.deleteClass);

export default router;

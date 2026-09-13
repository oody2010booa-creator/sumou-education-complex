import express from 'express';
import * as studentController from '../controllers/studentController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, studentController.getAllStudents);
router.post('/', authenticate, authorize(['admin']), studentController.createStudent);
router.get('/:id', authenticate, studentController.getStudentById);
router.put('/:id', authenticate, authorize(['admin']), studentController.updateStudent);
router.delete('/:id', authenticate, authorize(['admin']), studentController.deleteStudent);

export default router;

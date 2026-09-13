import express from 'express';
import * as teacherController from '../controllers/teacherController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticate, teacherController.getAllTeachers);
router.post('/', authenticate, authorize(['admin']), teacherController.createTeacher);
router.put('/:id', authenticate, authorize(['admin']), teacherController.updateTeacher);
router.delete('/:id', authenticate, authorize(['admin']), teacherController.deleteTeacher);

export default router;

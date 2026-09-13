import express from 'express';
import * as gradeController from '../controllers/gradeController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize(['teacher', 'admin']), gradeController.recordGrade);
router.get('/student/:studentId', authenticate, gradeController.getStudentGrades);
router.get('/class/:classId/:subjectId', authenticate, authorize(['admin', 'teacher']), gradeController.getClassGrades);

export default router;

import express from 'express';
import * as attendanceController from '../controllers/attendanceController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.post('/', authenticate, authorize(['teacher', 'admin']), attendanceController.recordAttendance);
router.get('/student/:studentId', authenticate, attendanceController.getAttendanceByStudent);
router.get('/report', authenticate, authorize(['admin']), attendanceController.getAttendanceReport);

export default router;

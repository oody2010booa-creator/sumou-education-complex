import { query, queryOne, run } from '../database/init.js';

export const recordAttendance = async (req, res) => {
  try {
    const { student_id, subject_id, attendance_date, status } = req.body;
    if (!student_id || !subject_id || !attendance_date || !status) {
      return res.status(400).json({ success: false, message: 'البيانات المطلوبة ناقصة' });
    }
    const result = await run(
      `INSERT OR REPLACE INTO attendance (student_id, subject_id, attendance_date, status)
       VALUES (?, ?, ?, ?)`,
      [student_id, subject_id, attendance_date, status]
    );
    global.io?.emit('attendance-recorded', { student_id, status });
    res.status(201).json({
      success: true,
      message: 'تم تسجيل الحضور بنجاح',
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendanceByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const attendance = await query(
      `SELECT a.* FROM attendance a WHERE a.student_id = ? ORDER BY a.attendance_date DESC`,
      [studentId]
    );
    const stats = await queryOne(
      `SELECT COUNT(*) as total, SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present FROM attendance WHERE student_id = ?`,
      [studentId]
    );
    res.json({ success: true, data: { attendance, stats } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAttendanceReport = async (req, res) => {
  try {
    const { classId } = req.query;
    const report = await query(
      `SELECT s.id, s.full_name,
              COUNT(*) as total_days,
              SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present
       FROM students s
       LEFT JOIN attendance a ON s.id = a.student_id
       WHERE s.class_id = ?
       GROUP BY s.id
       ORDER BY s.full_name`,
      [classId]
    );
    res.json({ success: true, data: report });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

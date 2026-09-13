import { query, queryOne } from '../database/init.js';

export const getDashboardStats = async (req, res) => {
  try {
    const students = await queryOne(`SELECT COUNT(*) as count FROM students WHERE status = 'active'`);
    const teachers = await queryOne(`SELECT COUNT(*) as count FROM teachers WHERE status = 'active'`);
    const classes = await queryOne(`SELECT COUNT(*) as count FROM classes WHERE status = 'active'`);
    const payments = await queryOne(`SELECT SUM(amount) as total FROM payments WHERE status = 'completed'`);

    const attendanceRate = await queryOne(
      `SELECT ROUND(SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*), 2) as rate FROM attendance`
    );

    res.json({
      success: true,
      data: {
        students: students.count,
        teachers: teachers.count,
        classes: classes.count,
        totalRevenue: payments.total || 0,
        attendanceRate: attendanceRate.rate || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChartData = async (req, res) => {
  try {
    const { type } = req.query;

    if (type === 'attendance') {
      const data = await query(
        `SELECT strftime('%Y-%m', attendance_date) as month, COUNT(*) as count FROM attendance GROUP BY month ORDER BY month DESC LIMIT 12`
      );
      res.json({ success: true, data });
    } else if (type === 'grades') {
      const data = await query(
        `SELECT grade_letter, COUNT(*) as count FROM grades GROUP BY grade_letter`
      );
      res.json({ success: true, data });
    } else if (type === 'revenue') {
      const data = await query(
        `SELECT fee_type, SUM(amount) as total FROM payments WHERE status = 'completed' GROUP BY fee_type`
      );
      res.json({ success: true, data });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

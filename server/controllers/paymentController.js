import { query, queryOne, run } from '../database/init.js';

export const createPayment = async (req, res) => {
  try {
    const { student_id, amount, fee_type, payment_method } = req.body;
    if (!student_id || !amount || !fee_type) {
      return res.status(400).json({ success: false, message: 'البيانات المطلوبة ناقصة' });
    }
    const reference = `PAY-${Date.now()}`;
    const result = await run(
      `INSERT INTO payments (student_id, amount, fee_type, payment_method, reference_number, status)
       VALUES (?, ?, ?, ?, ?, 'completed')`,
      [student_id, amount, fee_type, payment_method, reference]
    );
    global.io?.emit('payment-recorded', { student_id, amount, fee_type });
    res.status(201).json({
      success: true,
      message: 'تم تسجيل الدفع بنجاح',
      data: { id: result.lastID, reference },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentPayments = async (req, res) => {
  try {
    const { studentId } = req.params;
    const payments = await query(
      `SELECT * FROM payments WHERE student_id = ? ORDER BY created_at DESC`,
      [studentId]
    );
    const summary = await queryOne(
      `SELECT SUM(CASE WHEN status = 'completed' THEN amount ELSE 0 END) as total_paid
       FROM payments WHERE student_id = ?`,
      [studentId]
    );
    res.json({
      success: true,
      data: { payments, summary },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const payments = await query(
      `SELECT p.*, s.full_name FROM payments p
       JOIN students s ON p.student_id = s.id
       ORDER BY p.created_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const totalResult = await queryOne(`SELECT COUNT(*) as count FROM payments`);
    res.json({
      success: true,
      data: payments,
      pagination: { page: parseInt(page), limit: parseInt(limit), total: totalResult.count },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

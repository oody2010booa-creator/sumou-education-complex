import { query, queryOne, run } from '../database/init.js';

export const getAllClasses = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const classes = await query(
      `SELECT c.*, u.name as teacher_name FROM classes c
       LEFT JOIN teachers t ON c.teacher_id = t.id
       LEFT JOIN users u ON t.user_id = u.id
       ORDER BY c.name
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );
    const totalResult = await queryOne(`SELECT COUNT(*) as count FROM classes`);
    res.json({
      success: true,
      data: classes,
      pagination: { page: parseInt(page), limit: parseInt(limit), total: totalResult.count },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createClass = async (req, res) => {
  try {
    const { name, grade, teacher_id } = req.body;
    if (!name || !grade) {
      return res.status(400).json({ success: false, message: 'البيانات المطلوبة ناقصة' });
    }
    const result = await run(
      `INSERT INTO classes (name, grade, teacher_id) VALUES (?, ?, ?)`,
      [name, grade, teacher_id]
    );
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الفصل بنجاح',
      data: { id: result.lastID },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const allowedFields = ['name', 'grade', 'teacher_id', 'status'];
    const validUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) validUpdates[field] = updates[field];
    }
    const fields = Object.keys(validUpdates).map((f) => `${f} = ?`);
    const values = Object.values(validUpdates);
    if (fields.length > 0) {
      await run(`UPDATE classes SET ${fields.join(', ')} WHERE id = ?`, [...values, id]);
    }
    res.json({ success: true, message: 'تم تحديث الفصل بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    await run('UPDATE classes SET status = ? WHERE id = ?', ['deleted', id]);
    res.json({ success: true, message: 'تم حذف الفصل بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

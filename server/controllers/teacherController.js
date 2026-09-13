import { query, queryOne, run } from '../database/init.js';

export const getAllTeachers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const offset = (page - 1) * limit;
    let where = 'WHERE 1=1';
    const params = [];
    if (search) {
      where += ' AND u.name LIKE ?';
      params.push(`%${search}%`);
    }
    const teachers = await query(
      `SELECT t.*, u.name, u.email, u.phone FROM teachers t
       JOIN users u ON t.user_id = u.id
       ${where}
       ORDER BY u.name
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );
    const totalResult = await queryOne(
      `SELECT COUNT(*) as count FROM teachers t JOIN users u ON t.user_id = u.id ${where}`,
      params
    );
    res.json({
      success: true,
      data: teachers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult.count,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const { user_id, specialization, qualification, salary } = req.body;
    if (!user_id || !specialization) {
      return res.status(400).json({ success: false, message: 'البيانات المطلوبة ناقصة' });
    }
    const result = await run(
      `INSERT INTO teachers (user_id, specialization, qualification, salary)
       VALUES (?, ?, ?, ?)`,
      [user_id, specialization, qualification, salary]
    );
    res.status(201).json({
      success: true,
      message: 'تم إضافة المدرس بنجاح',
      data: { id: result.lastID },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const allowedFields = ['specialization', 'qualification', 'salary', 'status'];
    const validUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) validUpdates[field] = updates[field];
    }
    const fields = Object.keys(validUpdates).map((f) => `${f} = ?`);
    const values = Object.values(validUpdates);
    if (fields.length > 0) {
      await run(`UPDATE teachers SET ${fields.join(', ')} WHERE id = ?`, [...values, id]);
    }
    res.json({ success: true, message: 'تم تحديث بيانات المدرس بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    await run('UPDATE teachers SET status = ? WHERE id = ?', ['deleted', id]);
    res.json({ success: true, message: 'تم حذف المدرس بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

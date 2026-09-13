import { query, queryOne, run } from '../database/init.js';

export const getAllStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, grade, status } = req.query;
    const offset = (page - 1) * limit;

    let where = 'WHERE 1=1';
    const params = [];

    if (search) {
      where += ' AND (students.full_name LIKE ? OR students.student_number LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }

    if (grade) {
      where += ' AND students.grade = ?';
      params.push(grade);
    }

    if (status) {
      where += ' AND students.status = ?';
      params.push(status);
    }

    const students = await query(
      `SELECT s.*, c.name as class_name FROM students s
       LEFT JOIN classes c ON s.class_id = c.id
       ${where}
       ORDER BY s.full_name
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    const totalResult = await queryOne(
      `SELECT COUNT(*) as count FROM students s ${where}`,
      params
    );

    res.json({
      success: true,
      data: students,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: totalResult.count,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await queryOne(
      `SELECT s.*, c.name as class_name FROM students s
       LEFT JOIN classes c ON s.class_id = c.id
       WHERE s.id = ?`,
      [id]
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'الطالب غير موجود',
      });
    }

    res.json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createStudent = async (req, res) => {
  try {
    const {
      student_number,
      full_name,
      birth_date,
      gender,
      grade,
      class_id,
      address,
      phone,
      parent_name,
      parent_phone,
      parent_email,
    } = req.body;

    if (!student_number || !full_name || !grade) {
      return res.status(400).json({
        success: false,
        message: 'البيانات المطلوبة ناقصة',
      });
    }

    const result = await run(
      `INSERT INTO students (
        student_number, full_name, birth_date, gender, grade, class_id,
        address, phone, parent_name, parent_phone, parent_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        student_number,
        full_name,
        birth_date,
        gender,
        grade,
        class_id,
        address,
        phone,
        parent_name,
        parent_phone,
        parent_email,
      ]
    );

    res.status(201).json({
      success: true,
      message: 'تم إضافة الطالب بنجاح',
      data: { id: result.lastID },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const student = await queryOne('SELECT id FROM students WHERE id = ?', [id]);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'الطالب غير موجود',
      });
    }

    const allowedFields = [
      'full_name',
      'birth_date',
      'gender',
      'grade',
      'class_id',
      'address',
      'phone',
      'parent_name',
      'parent_phone',
      'parent_email',
      'status',
    ];

    const validUpdates = {};
    for (const field of allowedFields) {
      if (updates[field] !== undefined) {
        validUpdates[field] = updates[field];
      }
    }

    const fields = Object.keys(validUpdates).map((f) => `${f} = ?`);
    const values = Object.values(validUpdates);

    if (fields.length > 0) {
      await run(`UPDATE students SET ${fields.join(', ')} WHERE id = ?`, [
        ...values,
        id,
      ]);
    }

    res.json({
      success: true,
      message: 'تم تحديث بيانات الطالب بنجاح',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await queryOne('SELECT id FROM students WHERE id = ?', [id]);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'الطالب غير موجود',
      });
    }

    await run('UPDATE students SET status = ? WHERE id = ?', ['deleted', id]);

    res.json({
      success: true,
      message: 'تم حذف الطالب بنجاح',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

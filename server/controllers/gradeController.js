import { query, queryOne, run } from '../database/init.js';

const calculateGrade = (quiz, midterm, final) => {
  return parseFloat((quiz * 0.2 + midterm * 0.3 + final * 0.5).toFixed(2));
};

const getLetterGrade = (score) => {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
};

export const recordGrade = async (req, res) => {
  try {
    const { student_id, subject_id, quiz_score, midterm_score, final_score } = req.body;
    if (!student_id || !subject_id) {
      return res.status(400).json({ success: false, message: 'البيانات المطلوبة ناقصة' });
    }
    const total = calculateGrade(quiz_score || 0, midterm_score || 0, final_score || 0);
    const letterGrade = getLetterGrade(total);
    const result = await run(
      `INSERT OR REPLACE INTO grades (student_id, subject_id, quiz_score, midterm_score, final_score, total_score, grade_letter)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [student_id, subject_id, quiz_score, midterm_score, final_score, total, letterGrade]
    );
    res.status(201).json({
      success: true,
      message: 'تم تسجيل الدرجة بنجاح',
      data: { total_score: total, grade_letter: letterGrade },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStudentGrades = async (req, res) => {
  try {
    const { studentId } = req.params;
    const grades = await query(
      `SELECT g.*, s.name as subject_name FROM grades g
       JOIN subjects s ON g.subject_id = s.id
       WHERE g.student_id = ?
       ORDER BY s.name`,
      [studentId]
    );
    const gpa = await queryOne(
      `SELECT AVG(total_score) as gpa FROM grades WHERE student_id = ?`,
      [studentId]
    );
    res.json({ success: true, data: { grades, gpa: gpa?.gpa || 0 } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

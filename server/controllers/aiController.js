import { query, queryOne } from '../database/init.js';

export const analyzeStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await queryOne(
      `SELECT * FROM students WHERE id = ?`,
      [studentId]
    );
    if (!student) {
      return res.status(404).json({ success: false, message: 'الطالب غير موجود' });
    }

    const grades = await query(
      `SELECT AVG(total_score) as avg_grade FROM grades WHERE student_id = ?`,
      [studentId]
    );

    const attendance = await query(
      `SELECT SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) * 100.0 / COUNT(*) as rate FROM attendance WHERE student_id = ?`,
      [studentId]
    );

    const analysis = {
      student_name: student.full_name,
      average_grade: grades[0]?.avg_grade || 0,
      attendance_rate: attendance[0]?.rate || 0,
      status: grades[0]?.avg_grade >= 70 ? 'متفوق' : grades[0]?.avg_grade >= 60 ? 'جيد' : 'بحاجة للمساعدة',
      recommendation: grades[0]?.avg_grade < 60 ? 'يحتاج إلى دعم إضافي' : 'استمر في الأداء الجيد',
    };

    res.json({ success: true, data: analysis });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const predictAtRisk = async (req, res) => {
  try {
    const atRiskStudents = await query(
      `SELECT s.id, s.full_name, AVG(g.total_score) as avg_grade
       FROM students s
       LEFT JOIN grades g ON s.id = g.student_id
       WHERE s.status = 'active'
       GROUP BY s.id
       HAVING AVG(g.total_score) < 60
       ORDER BY avg_grade ASC`
    );

    res.json({
      success: true,
      data: {
        at_risk_count: atRiskStudents.length,
        students: atRiskStudents,
        message: `هناك ${atRiskStudents.length} طالب بحاجة إلى متابعة`,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const chatAssistant = async (req, res) => {
  try {
    const { query: userQuery } = req.body;

    let response = 'استفسار ذكي';

    if (userQuery.includes('عدد الطلاب') || userQuery.includes('كم طالب')) {
      const count = await queryOne(`SELECT COUNT(*) as count FROM students WHERE status = 'active'`);
      response = `عدد الطلاب الحاليين: ${count.count}`;
    } else if (userQuery.includes('غائبين') || userQuery.includes('الغياب')) {
      const absent = await queryOne(
        `SELECT COUNT(*) as count FROM attendance WHERE status = 'absent'`
      );
      response = `عدد الطلاب الغائبين اليوم: ${absent.count}`;
    } else if (userQuery.includes('أداء') || userQuery.includes('نتائج')) {
      const avg = await queryOne(`SELECT AVG(total_score) as avg FROM grades`);
      response = `متوسط درجات الطلاب: ${avg.avg?.toFixed(2) || 0}`;
    } else if (userQuery.includes('رسوم') || userQuery.includes('مدفوعات')) {
      const total = await queryOne(`SELECT SUM(amount) as total FROM payments WHERE status = 'completed'`);
      response = `إجمالي الرسوم المحصلة: ${total.total || 0}`;
    }

    res.json({
      success: true,
      data: {
        query: userQuery,
        response,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

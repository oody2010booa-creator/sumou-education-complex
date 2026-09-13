import React, { useEffect, useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, TextField, CircularProgress } from '@mui/material';
import { studentService } from '../services/api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ full_name: '', student_number: '', grade: '' });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      const res = await studentService.getAll();
      setStudents(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async () => {
    try {
      await studentService.create(formData);
      loadStudents();
      setOpenDialog(false);
      setFormData({ full_name: '', student_number: '', grade: '' });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('هل تريد حذف الطالب؟')) {
      try {
        await studentService.delete(id);
        loadStudents();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
        إضافة طالب
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#0B2C6F' }}>
              <TableCell sx={{ color: 'white' }}>رقم الطالب</TableCell>
              <TableCell sx={{ color: 'white' }}>الاسم</TableCell>
              <TableCell sx={{ color: 'white' }}>الصف</TableCell>
              <TableCell sx={{ color: 'white' }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.student_number}</TableCell>
                <TableCell>{student.full_name}</TableCell>
                <TableCell>{student.grade}</TableCell>
                <TableCell>
                  <Button size="small" color="error" onClick={() => handleDeleteStudent(student.id)}>
                    حذف
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div style={{ padding: '20px', minWidth: '300px' }}>
          <TextField
            fullWidth
            label="رقم الطالب"
            value={formData.student_number}
            onChange={(e) => setFormData({ ...formData, student_number: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="الاسم"
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="الصف"
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddStudent} sx={{ mt: 2 }}>
            إضافة
          </Button>
        </div>
      </Dialog>
    </Container>
  );
};

export default StudentsPage;

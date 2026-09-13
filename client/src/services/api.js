import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getProfile: () => api.get('/auth/profile'),
  changePassword: (oldPassword, newPassword) =>
    api.post('/auth/change-password', { oldPassword, newPassword }),
};

export const studentService = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),
  delete: (id) => api.delete(`/students/${id}`),
};

export const teacherService = {
  getAll: (params) => api.get('/teachers', { params }),
  create: (data) => api.post('/teachers', data),
  update: (id, data) => api.put(`/teachers/${id}`, data),
  delete: (id) => api.delete(`/teachers/${id}`),
};

export const classService = {
  getAll: (params) => api.get('/classes', { params }),
  create: (data) => api.post('/classes', data),
  update: (id, data) => api.put(`/classes/${id}`, data),
  delete: (id) => api.delete(`/classes/${id}`),
};

export const attendanceService = {
  record: (data) => api.post('/attendance', data),
  getByStudent: (studentId) => api.get(`/attendance/student/${studentId}`),
  getReport: (params) => api.get('/attendance/report', { params }),
};

export const gradeService = {
  record: (data) => api.post('/grades', data),
  getStudentGrades: (studentId) => api.get(`/grades/student/${studentId}`),
  getClassGrades: (classId, subjectId) => api.get(`/grades/class/${classId}/${subjectId}`),
};

export const paymentService = {
  getAll: (params) => api.get('/payments', { params }),
  create: (data) => api.post('/payments', data),
  getStudentPayments: (studentId) => api.get(`/payments/student/${studentId}`),
};

export const dashboardService = {
  getStats: () => api.get('/dashboard/stats'),
  getCharts: (type) => api.get('/dashboard/charts', { params: { type } }),
};

export const aiService = {
  analyzeStudent: (studentId) => api.get(`/ai/student/${studentId}/analyze`),
  predictAtRisk: () => api.get('/ai/predict-at-risk'),
  chat: (query) => api.post('/ai/chat', { query }),
};

export default api;

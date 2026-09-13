import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Database
  DB_PATH: process.env.DB_PATH || path.join(__dirname, '../database/sumou.db'),
  
  // JWT
  JWT_SECRET: process.env.JWT_SECRET || 'your_super_secret_key_change_in_production',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '7d',
  
  // CORS
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  
  // Uploads
  UPLOAD_DIR: path.join(__dirname, '../uploads'),
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Colors
  COLORS: {
    primary: '#0B2C6F',
    secondary: '#D4A62A',
    background: '#F5F7FA',
    text: '#1A1A1A',
  },
  
  // Pagination
  PAGE_SIZE: 10,
  
  // Roles
  ROLES: {
    ADMIN: 'admin',
    TEACHER: 'teacher',
    STUDENT: 'student',
    PARENT: 'parent',
  },
  
  // Attendance Status
  ATTENDANCE_STATUS: {
    PRESENT: 'present',
    ABSENT: 'absent',
    LATE: 'late',
    EXCUSED: 'excused',
  },
  
  // Grade Levels
  GRADE_LEVELS: ['الصف الأول', 'الصف الثاني', 'الصف الثالث', 'الصف الرابع', 'الصف الخامس', 'الصف السادس'],
  
  // Payment Methods
  PAYMENT_METHODS: ['cash', 'transfer', 'card'],
};

export default config;

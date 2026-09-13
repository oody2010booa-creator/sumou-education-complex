import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from '../config.js';
import bcryptjs from 'bcryptjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = config.DB_PATH;

let db = null;

export const getDatabase = () => db;

export const initDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(DB_PATH, async (err) => {
      if (err) {
        reject(err);
      } else {
        try {
          await createTables();
          await seedDefaultData();
          resolve();
        } catch (error) {
          reject(error);
        }
      }
    });
  });
};

const createTables = () => {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Users Table
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password TEXT NOT NULL,
          name TEXT NOT NULL,
          role TEXT NOT NULL,
          phone TEXT,
          status TEXT DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      // Students Table
      db.run(`
        CREATE TABLE IF NOT EXISTS students (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          student_number TEXT UNIQUE NOT NULL,
          full_name TEXT NOT NULL,
          birth_date DATE,
          gender TEXT,
          grade TEXT NOT NULL,
          class_id INTEGER,
          address TEXT,
          phone TEXT,
          photo_url TEXT,
          parent_name TEXT,
          parent_phone TEXT,
          parent_email TEXT,
          enrollment_date DATE DEFAULT CURRENT_DATE,
          status TEXT DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id),
          FOREIGN KEY (class_id) REFERENCES classes(id)
        )
      `);

      // Teachers Table
      db.run(`
        CREATE TABLE IF NOT EXISTS teachers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          specialization TEXT NOT NULL,
          qualification TEXT,
          salary DECIMAL(10, 2),
          hire_date DATE DEFAULT CURRENT_DATE,
          status TEXT DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

      // Classes Table
      db.run(`
        CREATE TABLE IF NOT EXISTS classes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          grade TEXT NOT NULL,
          teacher_id INTEGER,
          max_students INTEGER DEFAULT 30,
          status TEXT DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (teacher_id) REFERENCES teachers(id)
        )
      `);

      // Subjects Table
      db.run(`
        CREATE TABLE IF NOT EXISTS subjects (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          code TEXT UNIQUE NOT NULL,
          teacher_id INTEGER,
          class_id INTEGER,
          credit_hours INTEGER DEFAULT 3,
          sessions_per_week INTEGER DEFAULT 3,
          status TEXT DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (teacher_id) REFERENCES teachers(id),
          FOREIGN KEY (class_id) REFERENCES classes(id)
        )
      `);

      // Attendance Table
      db.run(`
        CREATE TABLE IF NOT EXISTS attendance (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          subject_id INTEGER NOT NULL,
          attendance_date DATE NOT NULL,
          status TEXT NOT NULL,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (student_id) REFERENCES students(id),
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          UNIQUE(student_id, subject_id, attendance_date)
        )
      `);

      // Grades Table
      db.run(`
        CREATE TABLE IF NOT EXISTS grades (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          subject_id INTEGER NOT NULL,
          quiz_score DECIMAL(5, 2),
          midterm_score DECIMAL(5, 2),
          final_score DECIMAL(5, 2),
          total_score DECIMAL(5, 2),
          grade_letter TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (student_id) REFERENCES students(id),
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          UNIQUE(student_id, subject_id)
        )
      `);

      // Payments Table
      db.run(`
        CREATE TABLE IF NOT EXISTS payments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          amount DECIMAL(10, 2) NOT NULL,
          fee_type TEXT NOT NULL,
          payment_date DATE,
          payment_method TEXT,
          status TEXT DEFAULT 'pending',
          reference_number TEXT UNIQUE,
          notes TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (student_id) REFERENCES students(id)
        )
      `);

      // Timetables Table
      db.run(`
        CREATE TABLE IF NOT EXISTS timetables (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          subject_id INTEGER NOT NULL,
          class_id INTEGER NOT NULL,
          day_of_week TEXT NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          room TEXT,
          status TEXT DEFAULT 'active',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (subject_id) REFERENCES subjects(id),
          FOREIGN KEY (class_id) REFERENCES classes(id)
        )
      `);

      // Notifications Table
      db.run(`
        CREATE TABLE IF NOT EXISTS notifications (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          message TEXT NOT NULL,
          type TEXT,
          is_read INTEGER DEFAULT 0,
          related_id INTEGER,
          related_type TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id)
        )
      `);

      // Certificates Table
      db.run(`
        CREATE TABLE IF NOT EXISTS certificates (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          student_id INTEGER NOT NULL,
          issue_date DATE DEFAULT CURRENT_DATE,
          grade TEXT NOT NULL,
          gpa DECIMAL(5, 2),
          certificate_url TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (student_id) REFERENCES students(id)
        )
      `);

      db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, tables) => {
        if (err) reject(err);
        else resolve();
      });
    });
  });
};

const seedDefaultData = async () => {
  return new Promise((resolve, reject) => {
    db.serialize(async () => {
      try {
        // Check if admin exists
        const adminExists = await new Promise((resolve) => {
          db.get("SELECT id FROM users WHERE role = 'admin' LIMIT 1", (err, row) => {
            resolve(!!row);
          });
        });

        if (!adminExists) {
          const hashedPassword = await bcryptjs.hash('Admin123!', 10);
          
          db.run(
            `INSERT INTO users (email, password, name, role, phone) 
             VALUES (?, ?, ?, ?, ?)`,
            ['admin@sumou.edu', hashedPassword, 'مدير النظام', 'admin', '+966501234567'],
            (err) => {
              if (err) reject(err);
              else resolve();
            }
          );
        } else {
          resolve();
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows || []);
    });
  });
};

export const queryOne = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row || null);
    });
  });
};

export const run = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    if (!db) {
      reject(new Error('Database not initialized'));
      return;
    }

    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

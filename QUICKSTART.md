# شروط الاستخدام والنصائح

## ✅ قبل البدء

1. **تثبيت Node.js و npm**
   ```bash
   node --version  # v16+
   npm --version   # v8+
   ```

2. **استنساخ المستودع**
   ```bash
   git clone https://github.com/oody2010booa-creator/sumou-education-complex.git
   cd sumou-education-complex
   ```

3. **تشغيل سكريبت الإعداد**
   ```bash
   bash setup.sh
   ```

## 🚀 التشغيل

### الخيار 1: التشغيل المنفصل (الموصى به)

**Terminal 1 - الخادم:**
```bash
npm run dev
# سيعمل على http://localhost:5000
```

**Terminal 2 - الواجهة:**
```bash
npm run client
# سيعمل على http://localhost:5173
```

### الخيار 2: التشغيل باستخدام pm2 (للإنتاج)

```bash
npm install -g pm2

# بدء الخادم
pm2 start server/index.js --name "sumou-server"

# بدء الواجهة (في مشروع منفصل أو كخادم ثابت)
pm2 start npm --name "sumou-client" -- run build
```

## 🔑 بيانات الدخول الأولية

```
┌──────────────────────────────────────┐
│  بيانات المدير (Administrator)     │
├──────────────────────────────────────┤
│  البريد الإلكتروني: admin@sumou.edu │
│  كلمة المرور: Admin123!             │
│  الدور: admin                        │
└──────────────────────────────────────┘
```

### إضافة مستخدمين إضافيين

```bash
# عبر API
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "email": "teacher@sumou.edu",
    "password": "Teacher123!",
    "name": "أحمد المدرس",
    "role": "teacher"
  }'
```

## 📂 تنظيم المشروع

```
┌─ client/                    # React Frontend
│  ├─ src/
│  │  ├─ components/          # UI Components
│  │  ├─ pages/               # Page Components
│  │  ├─ services/            # API Services
│  │  ├─ contexts/            # State Management
│  │  ├─ App.jsx
│  │  └─ main.jsx
│  ├─ index.html
│  └─ package.json
│
├─ server/                    # Node.js Backend
│  ├─ routes/                 # API Routes
│  ├─ controllers/            # Business Logic
│  ├─ middleware/             # Custom Middleware
│  ├─ database/               # Database Setup
│  ├─ scripts/                # Setup Scripts
│  ├─ config.js
│  ├─ index.js
│  └─ package.json
│
├─ database/
│  └─ sumou.db               # SQLite Database
│
├─ uploads/                   # User Uploads
├─ .env.example              # Environment Template
├─ setup.sh                  # Setup Script
└─ package.json              # Root Package
```

## ⚙️ الإعدادات المتقدمة

### تغيير منفذ الخادم

**في `.env`:**
```env
PORT=3000
```

### تغيير قاعدة البيانات

**في `server/config.js`:**
```javascript
DB_PATH: './database/custom.db'
```

### تفعيل HTTPS

**في `server/index.js`:**
```javascript
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('path/to/key.pem'),
  cert: fs.readFileSync('path/to/cert.pem')
};

https.createServer(options, app).listen(PORT);
```

## 🔒 الأمان في الإنتاج

### 1. تغيير كلمة السر الافتراضية
```bash
node server/scripts/initDb.js
# ثم اختر كلمة سر قوية
```

### 2. تحديث JWT Secret
**في `.env`:**
```env
JWT_SECRET=your-very-long-random-secret-key-here-minimum-32-characters
```

### 3. تفعيل CORS آمن
**في `server/index.js`:**
```javascript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true
}));
```

### 4. إضافة Rate Limiting
```bash
npm install express-rate-limit
```

**في `server/index.js`:**
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 دقيقة
  max: 100 // 100 طلب
});

app.use('/api/', limiter);
```

## 📊 الخدمات المستخدمة

### Frontend
- **React 18** - مكتبة واجهات المستخدم
- **Material-UI** - مكتبة المكونات
- **React Router** - التوجيه
- **Axios** - طلبات HTTP
- **Chart.js** - الرسوم البيانية
- **i18next** - التعريب
- **Socket.io** - الاتصالات الفورية

### Backend
- **Express.js** - إطار عمل الخادم
- **SQLite** - قاعدة البيانات
- **JWT** - المصادقة
- **bcryptjs** - تشفير كلمات المرور
- **Socket.io** - الإشعارات الفورية

## 🐛 استكشاف الأخطاء الشائعة

### ❌ "Cannot find module 'express'"
```bash
cd server
npm install
cd ..
```

### ❌ "Cannot find module '@mui/material'"
```bash
cd client
npm install
cd ..
```

### ❌ "EADDRINUSE: address already in use :::5000"
```bash
# قتل العملية على الميناء 5000
lsof -i :5000
kill -9 <PID>
```

### ❌ "Database locked"
```bash
# حذف وإعادة إنشاء قاعدة البيانات
rm database/sumou.db
node server/scripts/initDb.js
```

### ❌ "CORS error"
```bash
# تأكد من أن CLIENT_URL صحيح في .env
CLIENT_URL=http://localhost:5173
```

## 📈 الأداء والتحسينات

### تحسين الخادم
```bash
# تثبيت compression
npm install compression

# في server/index.js
import compression from 'compression';
app.use(compression());
```

### تحسين قاعدة البيانات
```javascript
// إضافة indexes
CREATE INDEX idx_student_id ON attendance(student_id);
CREATE INDEX idx_attendance_date ON attendance(attendance_date);
```

## 📚 المراجع والموارد

- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com)
- [Material-UI Components](https://mui.com)
- [SQLite Tutorial](https://www.sqlite.org/docs.html)
- [JWT.io](https://jwt.io)

## 💡 نصائح مفيدة

1. **استخدم nodemon** للتطوير
   ```bash
   npm install -g nodemon
   nodemon server/index.js
   ```

2. **استخدم Postman** لاختبار API
   - تحميل: https://www.postman.com
   - استيراد `api-collection.json`

3. **استخدم Git** لإدارة الإصدارات
   ```bash
   git branch develop
   git checkout develop
   ```

4. **قم بنسخ احتياطي** من قاعدة البيانات
   ```bash
   cp database/sumou.db database/sumou-backup.db
   ```

## 🎓 دروس تعليمية

### الدرس 1: إضافة صفحة جديدة

```javascript
// 1. إنشاء الصفحة
// client/src/pages/NewPage.jsx

import React from 'react';

const NewPage = () => {
  return <div>صفحة جديدة</div>;
};

export default NewPage;

// 2. إضافة الجديد في الراوتر
// client/src/App.jsx
<Route path="/new-page" element={<NewPage />} />

// 3. إضافة الرابط في القائمة الجانبية
// client/src/components/Sidebar.jsx
{ label: 'الصفحة الجديدة', icon: <IconName />, path: '/new-page' }
```

### الدرس 2: إضافة API جديد

```javascript
// 1. إنشاء Controller
// server/controllers/newController.js
export const getNewData = async (req, res) => {
  try {
    // logic here
    res.json({ success: true, data: [] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. إضافة Route
// server/routes/new.js
import express from 'express';
import * as controller from '../controllers/newController.js';

const router = express.Router();
router.get('/', controller.getNewData);
export default router;

// 3. استيراد الـ Route
// server/index.js
import newRoutes from './routes/new.js';
app.use('/api/new', newRoutes);
```

---

**آخر تحديث:** سبتمبر 2026
**الإصدار:** 1.0.0

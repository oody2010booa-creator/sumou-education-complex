# 🎓 مجمع سمو التعليم - Sumou Education Complex

## نظام إدارة تعليمي متكامل - Comprehensive Educational Management System

### ✨ المميزات الرئيسية

✅ **إدارة شاملة للطلاب والمدرسين والفصول**
✅ **نظام جداول ذكي**
✅ **تتبع الحضور والغياب**
✅ **إدارة الدرجات والنتائج**
✅ **نظام الرسوم والمدفوعات**
✅ **لوحة تحكم متقدمة مع إحصائيات**
✅ **دعم اللغة العربية الكامل**
✅ **نظام إشعارات فوري (Real-time)**
✅ **مساعد ذكي بالتنبيهات والتحليلات**
✅ **تصميم احترافي وفخم**

---

## 🚀 البدء السريع

### المتطلبات
- Node.js v16 أو أعلى
- npm v8 أو أعلى
- Git

### التثبيت

```bash
# استنساخ المستودع
git clone https://github.com/oody2010booa-creator/sumou-education-complex.git
cd sumou-education-complex

# تشغيل سكريبت الإعداد
bash setup.sh
```

### التشغيل

**Terminal 1 - تشغيل الخادم الخلفي:**
```bash
npm run dev
```

**Terminal 2 - تشغيل الواجهة الأمامية:**
```bash
npm run client
```

### الوصول للتطبيق

- **الواجهة**: http://localhost:5173
- **الخادم**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api/health

### بيانات الدخول الافتراضية

```
البريد الإلكتروني: admin@sumou.edu
كلمة المرور: Admin123!
```

---

## 📁 هيكل المشروع

```
sumou-education-complex/
├── client/                          # الواجهة الأمامية (React)
│   ├── src/
│   │   ├── components/              # مكونات React
│   │   ├── pages/                   # الصفحات
│   │   ├── services/                # خدمات API
│   │   ├── contexts/                # إدارة الحالة
│   │   ├── styles/                  # الأنماط
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # الخادم الخلفي (Node.js)
│   ├── routes/                      # المسارات
│   ├── controllers/                 # معالجات الطلبات
│   ├── middleware/                  # البرامج الوسيطة
│   ├── services/                    # الخدمات
│   ├── database/                    # قاعدة البيانات
│   ├── scripts/                     # النصوص
│   ├── index.js                     # نقطة البداية
│   ├── config.js                    # الإعدادات
│   └── package.json
│
├── database/
│   └── sumou.db                     # ملف قاعدة البيانات SQLite
│
├── uploads/                         # الصور والملفات
├── .env.example                     # متغيرات البيئة
├── .gitignore
├── setup.sh                         # سكريبت الإعداد
├── package.json                     # إعدادات المشروع الرئيسي
└── README.md                        # هذا الملف
```

---

## 🔐 الأدوار والصلاحيات (RBAC)

### 👨‍💼 المدير (Administrator)
- إدارة كاملة للنظام
- إدارة الطلاب والمدرسين والفصول
- تسجيل الدرجات والحضور
- إدارة الرسوم والمدفوعات
- عرض جميع التقارير
- إدارة المستخدمين والأدوار

### 👨‍🏫 المدرس (Teacher)
- تسجيل الحضور والغياب
- إدخال الدرجات
- رفع الواجبات
- الاطلاع على الجداول
- إرسال الملاحظات للطلاب وأولياء الأمور

### 👨‍🎓 الطالب (Student)
- مشاهدة درجاته ونتائجه
- الاطلاع على الجدول الدراسي
- متابعة الحضور والغياب
- استقبال الإشعارات والواجبات
- تحميل الشهادات

### 👨‍👩‍👧 ولي الأمر (Parent)
- متابعة أداء أبنائهم
- مشاهدة الدرجات والحضور
- متابعة الرسوم المستحقة
- استقبال الإشعارات والتنبيهات

---

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/login              # تسجيل الدخول
POST   /api/auth/register           # إنشاء حساب
GET    /api/auth/profile            # الحصول على البروفايل
POST   /api/auth/change-password    # تغيير كلمة المرور
```

### Students
```
GET    /api/students                # قائمة الطلاب
POST   /api/students                # إضافة طالب
GET    /api/students/:id            # تفاصيل الطالب
PUT    /api/students/:id            # تعديل الطالب
DELETE /api/students/:id            # حذف الطالب
```

### Teachers
```
GET    /api/teachers                # قائمة المدرسين
POST   /api/teachers                # إضافة مدرس
PUT    /api/teachers/:id            # تعديل المدرس
DELETE /api/teachers/:id            # حذف المدرس
```

### Classes
```
GET    /api/classes                 # قائمة الفصول
POST   /api/classes                 # إنشاء فصل
PUT    /api/classes/:id             # تعديل الفصل
DELETE /api/classes/:id             # حذف الفصل
```

### Attendance
```
POST   /api/attendance              # تسجيل الحضور
GET    /api/attendance/student/:id  # حضور الطالب
GET    /api/attendance/report       # تقرير الحضور
```

### Grades
```
POST   /api/grades                  # إضافة درجة
GET    /api/grades/student/:id      # درجات الطالب
GET    /api/grades/class/:classId   # درجات الفصل
```

### Payments
```
GET    /api/payments                # قائمة الدفعات
POST   /api/payments                # إضافة دفعة
GET    /api/payments/student/:id    # دفعات الطالب
```

### Dashboard
```
GET    /api/dashboard/stats         # إحصائيات لوحة التحكم
GET    /api/dashboard/charts        # بيانات الرسوم البيانية
```

### AI Assistant
```
GET    /api/ai/student/:id/analyze  # تحليل أداء الطالب
GET    /api/ai/predict-at-risk      # التنبؤ بالطلاب المعرضين للتعثر
POST   /api/ai/chat                 # المساعد الذكي
```

---

## 🎨 الألوان والتصميم

### هوية الألوان
- **الأزرق الملكي**: `#0B2C6F` - اللون الأساسي
- **الذهبي**: `#D4A62A` - اللون الثانوي
- **الخلفية**: `#F5F7FA` - خلفية فاتحة
- **النص**: `#1A1A1A` - نص داكن

### الخصائص
- ✅ تصميم استجابي (Responsive)
- ✅ دعم اللغة العربية (RTL)
- ✅ وضع مظلم (Dark Mode)
- ✅ تصميم Material Design
- ✅ رسوم بيانية متقدمة

---

## 🗄️ قاعدة البيانات

### الجداول الرئيسية

**Users** - المستخدمون
- id, email, password, name, role, phone, status, created_at

**Students** - الطلاب
- id, user_id, student_number, full_name, birth_date, gender, grade, class_id, parent_info

**Teachers** - المدرسون
- id, user_id, specialization, qualification, salary, hire_date

**Classes** - الفصول
- id, name, grade, teacher_id, max_students, status

**Subjects** - المواد
- id, name, code, teacher_id, class_id, credit_hours, sessions_per_week

**Attendance** - الحضور
- id, student_id, subject_id, attendance_date, status (present/absent/late/excused)

**Grades** - الدرجات
- id, student_id, subject_id, quiz_score, midterm_score, final_score, total_score, grade_letter

**Payments** - المدفوعات
- id, student_id, amount, fee_type, payment_date, payment_method, status, reference_number

**Notifications** - الإشعارات
- id, user_id, title, message, type, is_read, created_at

**Certificates** - الشهادات
- id, student_id, issue_date, grade, gpa, certificate_url

**Timetables** - الجداول
- id, subject_id, class_id, day_of_week, start_time, end_time, room

---

## 🔒 الأمان

- ✅ **JWT Authentication** - مصادقة آمنة
- ✅ **Password Hashing** - تشفير كلمات المرور بـ bcryptjs
- ✅ **CORS Protection** - حماية CORS
- ✅ **Role-Based Access Control** - التحكم في الوصول حسب الأدوار
- ✅ **Input Validation** - التحقق من صحة المدخلات
- ✅ **Error Handling** - معالجة شاملة للأخطاء

---

## 📊 المميزات المتقدمة

### 📈 لوحة التحكم (Dashboard)
- عرض الإحصائيات الرئيسية
- رسوم بيانية متقدمة
- تقارير الحضور والدرجات
- إجمالي الإيرادات

### 🤖 المساعد الذكي (AI Assistant)
- تحليل أداء الطلاب
- التنبؤ بالطلاب المعرضين للتعثر
- إجابات ذكية على استفسارات النظام
- تقارير تلقائية باللغة العربية

### 📢 نظام الإشعارات (Real-time Notifications)
- إشعارات فورية عبر Socket.io
- تنبيهات الغياب
- إشعارات صدور النتائج
- تنبيهات الرسوم المستحقة
- أخبار المدرسة العامة

### 📊 التقارير المتقدمة
- تقارير الحضور والغياب
- تقارير الدرجات والمعدلات
- تقارير الرسوم والمدفوعات
- إحصائيات الأداء العام

---

## 🛠️ التطوير والتخصيص

### إضافة مستخدم جديد
```bash
# استخدام API
POST /api/users
{
  "email": "teacher@sumou.edu",
  "password": "SecurePassword123!",
  "name": "اسم المدرس",
  "role": "teacher"
}
```

### تغيير كلمة السر الافتراضية
عدّل `server/scripts/initDb.js` وغيّر `Admin123!` إلى كلمة سر قوية

### تخصيص الألوان
عدّل `client/src/theme.js`

### إضافة ترجمات جديدة
عدّل `client/src/i18n.js`

---

## 🚨 استكشاف الأخطاء

### الخادم لا يبدأ
```bash
# تأكد من عدم استخدام الميناء 5000
lsof -i :5000

# احذف قاعدة البيانات وأعد إنشاؤها
rm database/sumou.db
node server/scripts/initDb.js
```

### الاتصال بـ API غير ممكن
```bash
# تأكد من أن الخادم يعمل
curl http://localhost:5000/api/health

# تحقق من متغيرات البيئة
cat .env
```

### الصور لا تظهر
```bash
# تأكد من وجود مجلد uploads
mkdir uploads
chmod 755 uploads
```

---

## 📝 الترخيص

هذا المشروع مرخص تحت **MIT License**

---

## 🤝 المساهمة

نرحب بالمساهمات! يرجى:
1. Fork المستودع
2. إنشاء فرع جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push الفرع (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 📞 التواصل والدعم

- 📧 البريد الإلكتروني: support@sumou.edu
- 🌐 الموقع الرسمي: www.sumou.edu
- 📱 الهاتف: +966 50 123 4567

---

## 🎯 الخارطة الطريقية

### الإصدار 1.0 (الحالي)
- ✅ إدارة الطلاب والمدرسين
- ✅ نظام الدرجات والحضور
- ✅ نظام الرسوم والمدفوعات
- ✅ لوحة التحكم والإحصائيات
- ✅ المساعد الذكي الأساسي

### الإصدار 2.0 (المخطط)
- 🔜 نظام الرسائل والتواصل
- 🔜 تطبيق الهاتف الذكي
- 🔜 نظام الحضور بالبصمة
- 🔜 نظام المشاريع والأنشطة اللاصفية
- 🔜 تطوير المساعد الذكي باستخدام AI متقدم

---

**صُنع بـ ❤️ من قبل فريق سمو التعليم**

**Crafted with ❤️ by Sumou Education Team**

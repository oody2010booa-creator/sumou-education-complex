import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      'app.title': 'مجمع سمو التعليم',
      'app.subtitle': 'نظام إدارة تعليمي متكامل',
      'nav.dashboard': 'لوحة التحكم',
      'nav.students': 'الطلاب',
      'nav.teachers': 'المدرسون',
      'nav.classes': 'الفصول',
      'nav.grades': 'الدرجات',
      'nav.attendance': 'الحضور',
      'nav.payments': 'الرسوم',
      'nav.ai': 'المساعد الذكي',
      'nav.logout': 'تسجيل خروج',
      'btn.add': 'إضافة',
      'btn.edit': 'تعديل',
      'btn.delete': 'حذف',
      'btn.save': 'حفظ',
      'btn.cancel': 'إلغاء',
      'btn.search': 'بحث',
      'login.email': 'البريد الإلكتروني',
      'login.password': 'كلمة المرور',
      'login.button': 'دخول',
      'common.loading': 'جاري التحميل...',
      'common.error': 'حدث خطأ',
      'common.success': 'تم بنجاح',
    },
  },
  en: {
    translation: {
      'app.title': 'Sumou Education Complex',
      'app.subtitle': 'Integrated Educational Management System',
      'nav.dashboard': 'Dashboard',
      'nav.students': 'Students',
      'nav.teachers': 'Teachers',
      'nav.classes': 'Classes',
      'nav.grades': 'Grades',
      'nav.attendance': 'Attendance',
      'nav.payments': 'Payments',
      'nav.ai': 'Smart Assistant',
      'nav.logout': 'Logout',
      'btn.add': 'Add',
      'btn.edit': 'Edit',
      'btn.delete': 'Delete',
      'btn.save': 'Save',
      'btn.cancel': 'Cancel',
      'btn.search': 'Search',
      'login.email': 'Email',
      'login.password': 'Password',
      'login.button': 'Login',
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'ar',
  interpolation: { escapeValue: false },
});

export default i18n;

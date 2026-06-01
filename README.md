# 👑 KING Store

متجر ملابس فاخر لبيع منتجات ملابس مطبوع عليها باسم برند KING

## التكنولوجيا المستخدمة
- **Frontend:** HTML/CSS/JavaScript
- **Backend:** Python (Flask)
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose

## الميزات
✨ عرض المنتجات الفاخرة
🛒 سلة التسوق الديناميكية
👤 نظام إدارة المستخدمين
💳 معالجة الطلبات
📱 تصميم استجابي

## المتطلبات
- Docker
- Docker Compose

## التشغيل

### الطريقة الأولى (Docker)
```bash
docker-compose up --build
```

### الطريقة الثانية (بدون Docker)
```bash
# Backend
cd backend
pip install -r requirements.txt
python app.py

# Frontend - افتح index.html في المتصفح
```

## الوصول للموقع
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Database:** localhost:5432

## هيكل المشروع
```
king-store/
├── frontend/
│   ├── index.html          # الصفحة الرئيسية
│   ├── products.html       # صفحة المنتجات
│   ├── cart.html          # صفحة السلة
│   ├── css/
│   │   └── style.css      # الأنماط الرئيسية
│   └── js/
│       └── script.js      # السكريبتات
├── backend/
│   ├── app.py             # تطبيق Flask الرئيسي
│   ├── requirements.txt    # المكتبات المطلوبة
│   ├── models.py          # نماذج قاعدة البيانات
│   ├── routes.py          # المسارات والـ APIs
│   └── config.py          # الإعدادات
├── database/
│   └── init.sql           # إنشاء جداول قاعدة البيانات
├── docker-compose.yml     # تكوين Docker
└── Dockerfile             # صورة Docker
```

## الكاتب
👨‍💻 تم إنشاؤه بواسطة GitHub Copilot

# Shopping List App – Backend (Node.js/Express/Prisma)

## Overview
שרת Node.js מודרני ל־Shopping List App, בנוי ב־TypeScript, Express, Prisma, ומבוסס MongoDB Atlas.

## דרישות מקדימות
- Node.js (מומלץ גרסה 18 ומעלה)
- npm (מגיע עם Node.js)
- חשבון MongoDB Atlas (או חיבור למסד נתונים MongoDB)

## התקנה והרצה (חובה לבצע בסדר הזה)
1. **התקנת תלויות:**
   ```bash
   npm install
   ```
2. **הגדרת משתני סביבה:**
   - ערוך קובץ `.env` והכנס את כתובת החיבור ל־MongoDB שלך (URI)
3. **הרצת פיתוח:**
   ```bash
   npm run dev
   ```
4. ה־API מאזין ב־http://localhost:3001

## Endpoints עיקריים
- `GET    /api/categories` – שליפת קטגוריות
- `POST   /api/categories` – יצירת קטגוריה
- `DELETE /api/categories/:id` – מחיקת קטגוריה (אם קיים)
- `GET    /api/shopping-lists` – שליפת כל הרשימות
- `POST   /api/shopping-lists` – יצירת רשימה
- `PUT    /api/shopping-lists/:id` – עדכון רשימה
- `DELETE /api/shopping-lists/:id` – מחיקת רשימה

## פיצ'רים עיקריים
- **API REST מלא:** CRUD לרשימות קניות, מוצרים וקטגוריות.
- **קטגוריות:** יצירה, שליפה, (אפשרות להוספה מהירה מהפרונט), מניעת כפילויות.
- **מוצרים:** שייכות לקטגוריה, עדכון כמות, מחיקה, עריכה.
- **רשימות קניות:** יצירה, עריכה, מחיקה, שליפה, קיבוץ לפי קטגוריות.
- **ולידציה:** בדיקות קלט, טיפול בשגיאות, החזרת סטטוסים מתאימים.
- **CORS:** פתוח ל־localhost:3000 (פרונט).
- **Prisma + MongoDB:** ORM מודרני, סכמות, seed, ניהול קשרים.

## טכנולוגיות עיקריות
- Node.js
- Express
- TypeScript
- Prisma ORM
- MongoDB Atlas

## מבנה תיקיות עיקרי
```
backend/
├── src/
│   ├── controllers/   # לוגיקת API
│   ├── routes/        # הגדרות נתיבים
│   ├── services/      # לוגיקה עסקית
│   ├── prisma/        # סכמות Prisma
│   └── app.ts         # קובץ ראשי
├── prisma/
│   └── schema.prisma  # סכמת DB
├── package.json       # תלויות
└── README.md          # מדריך זה
```

## הערות
- יש להפעיל גם את ה־frontend במקביל.
- כל ה־API מותאם לעבודה עם פרונט בעברית ו־RTL.
- יש להגדיר חיבור ל־MongoDB ב־.env.
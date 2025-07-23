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
3. **הרצת migration (חדש!):**
   ```bash
   npm run prisma:migrate
   ```
4. **הרצת פיתוח:**
   ```bash
   npm run dev
   ```
5. ה־API מאזין ב־http://localhost:3001

## Endpoints עיקריים

### רשימות קניות
- `GET    /api/shopping-lists` – שליפת כל הרשימות
- `POST   /api/shopping-lists` – יצירת רשימה
- `GET    /api/shopping-lists/:id` – שליפת רשימה ספציפית
- `PUT    /api/shopping-lists/:id` – עדכון רשימה
- `DELETE /api/shopping-lists/:id` – מחיקת רשימה

### מוצרים בודדים (חדש!)
- `POST   /api/shopping-lists/:id/items` – הוספת מוצר לרשימה
- `PUT    /api/shopping-lists/:id/items/:itemId` – עדכון מוצר
- `DELETE /api/shopping-lists/:id/items/:itemId` – מחיקת מוצר
- `PATCH  /api/shopping-lists/:id/items/:itemId/toggle` – החלפת סטטוס השלמה

### קטגוריות
- `GET    /api/categories` – שליפת קטגוריות
- `POST   /api/categories` – יצירת קטגוריה

## פיצ'רים עיקריים
- **API REST מלא:** CRUD לרשימות קניות, מוצרים וקטגוריות.
- **מוצרים עם ID ייחודי:** כל מוצר מקבל ID ייחודי לניהול נכון בפרונט.
- **ניהול מוצרים בודדים:** הוספה, עדכון, מחיקה והחלפת סטטוס השלמה.
- **קטגוריות:** יצירה, שליפה, מניעת כפילויות.
- **מוצרים:** שייכות לקטגוריה, עדכון כמות, מחיקה, עריכה.
- **רשימות קניות:** יצירה, עריכה, מחיקה, שליפה, קיבוץ לפי קטגוריות.
- **ולידציה:** בדיקות קלט, טיפול בשגיאות, החזרת סטטוסים מתאימים.
- **CORS:** פתוח ל־localhost:3000 (פרונט).
- **Prisma + MongoDB:** ORM מודרני, סכמות, seed, ניהול קשרים.

## ארכיטקטורה משופרת (חדש!)
- **טבלה נפרדת למוצרים:** `ShoppingListItem` עם ID ייחודי
- **יחסים נכונים:** Foreign key בין רשימות למוצרים
- **Cascade Delete:** מחיקת רשימה מוחקת את כל המוצרים שלה
- **ביצועים משופרים:** אינדקסים על foreign keys
- **תאימות React:** כל מוצר מקבל key יציב

## מבנה מסד הנתונים
```sql
ShoppingList {
  id: ObjectId (Primary Key)
  name: String
  createdAt: DateTime
  updatedAt: DateTime
  items: ShoppingListItem[] (One-to-Many)
}

ShoppingListItem {
  id: ObjectId (Primary Key)
  name: String
  quantity: Int
  category: String
  isCompleted: Boolean
  shoppingListId: ObjectId (Foreign Key)
  createdAt: DateTime
  updatedAt: DateTime
}

Category {
  id: ObjectId (Primary Key)
  name: String (Unique)
}
```

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
│   ├── prisma/        # סכמות Prisma + migration
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
- **חדש:** כל מוצר מקבל ID ייחודי לפתרון בעיות React keys.
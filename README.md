# 🎓 SkillBridge - Frontend

## 📌 Project Overview

SkillBridge is a modern Learning Management System (LMS) that connects students with expert instructors.

The frontend provides a clean, responsive, and user-friendly interface for three main roles:

- 👨‍🎓 Students
- 👩‍🏫 Instructors
- 🛠️ Administrators

It is built using Next.js 15 with App Router and follows modern frontend best practices.

---

## 🌐 higher authority email password

-  super-admin: super@gmail.com || 123456
-  admin: admin@gmail.com || 123456



## 🌐 Live Demo & Repository

- 🔗 Frontend: https://skillbrige.vercel.app
- 🔗 Backend API: https://skillbrige-backend.onrender.com/
- 🔗 GitHub: https://github.com/tanjilahamed99/SkillBridge-frontend  

---

# 🎯 Core Functionality

## 👨‍🎓 For Students

- Browse and search courses
- Filter by category, level, and price
- Enroll in free and paid courses
- Secure payment system
- Access video lessons and resources
- Mark lessons as complete
- Track progress (0% – 100%)
- Learning dashboard
- Personalized recommendations
- Earn certificates after course completion

---

## 👩‍🏫 For Instructors

- Create and manage courses
- Add title, description, level, and category
- Add, edit, delete lessons
- Drag-and-drop lesson ordering
- Upload thumbnails, videos, and resources
- Set course pricing (free or paid)
- Apply discounts
- View enrollment numbers
- Track revenue
- Course workflow:
  - Draft
  - Pending
  - Published
- Preview courses before publishing

---

## 🛠️ For Administrators

- View all users
- Suspend or activate users
- Approve or reject courses
- Archive courses
- Manage course categories
- View platform analytics
- Monitor enrollments
- Revenue dashboard (read-only)

---

# 🏗️ Architecture

## 🚀 Technology Stack

- Framework: Next.js 15 (App Router)
- Language: TypeScript
- State Management: Redux Toolkit
- Styling: Tailwind CSS
- UI Icons: Lucide React
- Forms: React Hook Form
- Validation: Zod
- Notifications: Sonner & SweetAlert2
- HTTP Client: Fetch API with interceptors

---

## 📂 Key Directories

```
src/
├── app/              # Pages and routing
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # Utilities and API clients
├── store/            # Redux state management
```

---

# 🔐 Authentication Flow

1. User logs in or registers
2. Backend validates credentials
3. JWT token + user data returned
4. Token stored in Redux + localStorage
5. Protected routes check authentication
6. API requests include token in Authorization header
7. Token refresh (if implemented)

---


# 🌐 API Integration

## Base URL

```javascript
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
```

## Key Endpoints Used

| Endpoint | Method | Purpose |
|----------|--------|----------|
| /api/auth/login | POST | User login |
| /api/auth/register | POST | User registration |
| /api/courses | GET | Fetch all courses |
| /api/courses/:id | GET | Get single course |
| /api/courses/:id/enroll | POST | Enroll in course |
| /api/user/profile | GET | Get user profile |
| /api/user/stats | GET | Get user statistics |
| /api/instructor/courses | POST/GET | Instructor management |
| /api/admin/users | GET | Admin user management |

---

# 📊 State Management

## Redux Store Structure

```javascript
{
  auth: {
    user: {},
    token: '',
    isLoading: false
  },
  courses: {
    items: [],
    currentCourse: null,
    filters: {}
  },
}
```

---

# 🔄 Data Flow

User Action  
→ Component Event  
→ API Call  
→ Redux Dispatch  
→ State Update  
→ UI Re-render  
→ localStorage Sync  

---

# 🎨 UI/UX Features

- Loading skeletons and spinners
- User-friendly error messages
- Real-time form validation
- Toast notifications
- Helpful empty states
- Responsive tables
- Optional dark mode

---

# 🚦 Routing Structure

## Public Routes

- `/` - Landing page  
- `/courses` - Course listing  
- `/courses/:id` - Course details  
- `/login` - Login  
- `/register` - Register  

## Protected Routes

- `/dashboard/*` - Student dashboard  
- `/instructor/*` - Instructor dashboard  
- `/admin/*` - Admin panel  
- `/super-admin/*` - Super admin  

---


---

# 🛠️ Development Setup

## Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running

## Installation

```bash
git clone https://github.com/yourusername/skillbridge-frontend.git
cd skillbridge-frontend
npm install
cp .env.example .env.local
npm run dev
```

App runs at:

```
http://localhost:3000
```

---

# 🔑 Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# 📜 Available Scripts

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run format   # Run Prettier
```

---

# 🔒 Security Features

- JWT authentication
- Authorization headers
- Input validation with Zod
- XSS protection
- CSRF protection
- Rate limiting

---


# 🚀 Deployment

## Build

```bash
npm run build
```

Output directory: `.next`

## Deploy to Vercel

```bash
vercel --prod
```

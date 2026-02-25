SkillBridge - Frontend
📌 Project Overview
SkillBridge is a modern Learning Management System (LMS) that connects students with expert instructors. The frontend provides an intuitive, responsive interface for three user roles: Students, Instructors, and Administrators.

🌐 Live Demo & Repository
Frontend URL: https://skillbridge.vercel.app

Backend API: https://skillbridge-api.onrender.com

GitHub: https://github.com/yourusername/skillbridge-frontend

🎯 Core Functionality
For Students
Course Discovery: Browse and search courses with filters (category, level, price)

Enrollment: Enroll in free/paid courses with secure payment

Learning Dashboard: Track progress across all enrolled courses

Lesson Completion: Mark lessons complete, track progress (0-100%)

Course Content: Access video lessons, articles, and resources

Progress Tracking: Visual progress bars and completion stats

Recommendations: Personalized course suggestions

Certificates: Earn certificates upon course completion

For Instructors
Course Creation: Create courses with title, description, category, level

Lesson Management: Add/edit/delete lessons with drag-and-drop ordering

Content Upload: Upload thumbnails, videos, and resources

Pricing Control: Set free/paid pricing with discount options

Student Analytics: Track enrollment numbers and revenue

Course Status: Draft → Pending → Published workflow

Preview Mode: Preview courses before publishing

For Administrators
User Management: View, suspend, activate all users

Course Moderation: Approve/reject/archive courses

Category Management: Create and manage course categories

Platform Analytics: View enrollment trends and popular courses

Revenue Overview: Read-only financial dashboard

🏗️ Architecture
Technology Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

State Management: Redux Toolkit

Styling: Tailwind CSS

UI Icons: Lucide React

Forms: React Hook Form + Zod

Notifications: Sonner, SweetAlert2

HTTP Client: Fetch API with interceptors



🔐 Authentication Flow
User registers/logs in via /login or /register

Backend validates and returns JWT token + user data

Token and user stored in Redux + localStorage

Protected routes check authentication status

API requests include token in Authorization header

Token refresh on expiration (if implemented)
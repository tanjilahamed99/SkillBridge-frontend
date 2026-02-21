"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  X,
  Home,
  BookOpen,
  LogOut,
  GraduationCap,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";
import StudentPrivateRoute from "@/providers/StudentPrivateRoute";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Complete Web Development",
      progress: 68,
      color: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      progress: 42,
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 3,
      title: "Data Science & AI",
      progress: 25,
      color: "from-green-500 to-purple-600",
    },
  ];

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    router.push("/login");
    toast.success("Logged out successfully");
  };

  return (
    <StudentPrivateRoute>
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-purple-100 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}>
          {/* Sidebar Header */}
          <div className="h-20 flex items-center justify-between px-6 border-b border-purple-100">
            <Link
              href="/student/dashboard"
              className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-gray-900">
                Skill<span className="text-purple-600">Bridge</span>
              </span>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Student Profile Summary */}
          <div className="p-6 border-b border-purple-100">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-linear-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                <p className="text-sm text-gray-500">Student</p>
                <div className="flex items-center mt-1">
                  <GraduationCap className="w-3 h-3 text-purple-600 mr-1" />
                  <span className="text-xs text-purple-600">
                    5 Courses Enrolled
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 flex-1 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl transition ${
                        isActive
                          ? "bg-purple-600 text-white"
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                      }`}>
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Recent Courses Section */}
            <div className="mt-8">
              <h4 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Recent Courses
              </h4>
              <ul className="space-y-2">
                {recentCourses.map((course) => (
                  <li key={course.id}>
                    <Link
                      href={`/student/course/${course.id}`}
                      className="flex items-center px-4 py-2 hover:bg-purple-50 rounded-xl transition">
                      <div
                        className={`w-2 h-2 rounded-full bg-linear-to-r ${course.color} mr-3`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700 truncate">
                          {course.title}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-linear-to-r ${course.color}`}
                              style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">
                            {course.progress}%
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-purple-100">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:pl-72">
          {/* Page Content */}
          <main className="p-4 sm:p-6 lg:p-8">{children}</main>
        </div>
      </div>
    </StudentPrivateRoute>
  );
}

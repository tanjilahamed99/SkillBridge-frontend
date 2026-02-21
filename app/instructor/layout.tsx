"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  BookOpen,
  LogOut,
  Upload,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useDispatch";
import Logo from "@/components/Logo";

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const user = useAppSelector((state) => state.auth.user);

  const navigation = [
    { name: "Dashboard", href: "/instructor", icon: Home },
    { name: "My Courses", href: "/instructor/courses", icon: BookOpen },
    {
      name: "Create Course",
      href: "/instructor/courses/create",
      icon: Upload,
      badge: "New",
    },
  ];

  return (
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
            href="/instructor/dashboard"
            className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-linear-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
              <Logo />
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

        {/* Instructor Profile */}
        <div className="p-6 border-b border-purple-100">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-linear-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              {user?.name
                ? user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "SJ"}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500">Instructor</p>
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
                    {item.badge && (
                      <span
                        className={`text-xs font-bold px-2 py-1 rounded-full ${
                          isActive
                            ? "bg-white text-purple-600"
                            : "bg-purple-100 text-purple-600"
                        }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-purple-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-purple-100">
          <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden text-gray-600 hover:text-purple-600">
                <Menu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                Instructor Portal
              </h2>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

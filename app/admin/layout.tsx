"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  Search,
  Shield,
} from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/useDispatch";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";

// Define User type based on your auth slice
interface User {
  _id: string;
  name?: string;
  email: string;
  role?: string;
  picture?: string | null;
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user) as User | null;

  // Define navigation item type
  interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    exact?: boolean;
    submenu?: { name: string; href: string }[];
  }

  const navigation: NavItem[] = [
    { 
      name: "Dashboard", 
      href: "/admin", 
      icon: LayoutDashboard,
      exact: true 
    },
    { 
      name: "Users", 
      href: "/admin/users", 
      icon: Users,
      submenu: [
        { name: "All Users", href: "/admin/users" },
        { name: "Instructors", href: "/admin/users?role=instructor" },
        { name: "Students", href: "/admin/users?role=student" },
      ]
    },
    { 
      name: "Courses", 
      href: "/admin/courses", 
      icon: BookOpen,
      submenu: [
        { name: "All Courses", href: "/admin/courses" },
        { name: "Pending Review", href: "/admin/courses?status=pending" },
        { name: "Archived", href: "/admin/courses?status=archived" },
      ]
    }
  ];

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    toast.success("Logged out successfully");
  };

  const isActive = (href: string): boolean => {
    if (!pathname) return false;
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  // Get user initials safely
  const getUserInitial = (): string => {
    if (user?.name && user.name.length > 0) {
      return user.name.charAt(0).toUpperCase();
    }
    return 'A';
  };

  // Get user name safely
  const getUserName = (): string => {
    return user?.name || 'Admin';
  };

  // Get user email safely
  const getUserEmail = (): string => {
    return user?.email || 'admin@skillbridge.com';
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-purple-100">
          <Link href="/admin" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl text-gray-900">Skill<span className="text-purple-600">Bridge</span></span>
              <p className="text-xs text-purple-600 font-medium">Admin Panel</p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="p-6 border-b border-purple-100">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
              {getUserInitial()}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate">{getUserName()}</h3>
              <p className="text-sm text-gray-500 truncate">{getUserEmail()}</p>
              <div className="flex items-center mt-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                <span className="text-xs text-green-600">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      active
                        ? "bg-purple-600 text-white"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-purple-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition"
          >
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
                className="lg:hidden text-gray-600 hover:text-purple-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center text-sm">
                <Link href="/admin" className="text-gray-500 hover:text-purple-600">Dashboard</Link>
                {pathname && pathname !== '/admin' && (
                  <>
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-900 capitalize">
                      {pathname.split('/').pop()?.replace(/-/g, ' ') || ''}
                    </span>
                  </>
                )}
              </div>
            </div> 
          </div>

          {/* Mobile Search */}
          <div className="md:hidden px-4 pb-4">
            <div className="flex items-center relative">
              <Search className="absolute left-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
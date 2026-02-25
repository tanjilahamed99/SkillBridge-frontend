"use client";
import { UserPlus, Menu, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "./Logo";
import { useAppSelector } from "@/hooks/useDispatch";
import { useDispatch } from "react-redux";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  const navItems = ["Home", "Courses", "Contact", "About"];

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:scale-110 transition">
              <Logo />
            </div>
            <span className="font-bold text-2xl text-gray-900">
              Skill<span className="text-purple-600">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-purple-600 font-medium transition"
              >
                {item}
              </Link>
            ))}
            {user && (
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-purple-600 font-medium transition"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-600 hover:text-purple-600 font-medium transition"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition flex items-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-purple-100 shadow-lg">
          <div className="px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 font-medium hover:text-purple-600"
              >
                {item}
              </Link>
            ))}

            {user && (
              <Link
                href="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 font-medium hover:text-purple-600"
              >
                Dashboard
              </Link>
            )}

            <div className="pt-4 border-t">
              {user ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/login"
                    className="block text-gray-700 font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="block bg-purple-600 text-white text-center py-2 rounded-lg font-medium hover:bg-purple-700 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
"use client";
import { Cloud, UserPlus } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-purple-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center shadow-lg shadow-purple-200 group-hover:shadow-purple-300 transition-all group-hover:scale-110">
              <Logo />
            </div>
            <span className="font-bold text-2xl text-gray-900">
              Skill<span className="text-purple-600">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "Courses", "Features", "Pricing", "About"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-gray-600 hover:text-purple-600 font-medium transition relative group">
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Link
              href="/login"
              className="text-gray-600 hover:text-purple-600 font-medium transition hidden sm:inline-block md:px-4 py-2">
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-purple-600 text-white md:px-6 px-2 text-sm py-2 md:py-3 rounded-xl font-medium hover:bg-purple-700 transition shadow-lg shadow-purple-200 hover:shadow-purple-300 flex items-center gap-2">
              <UserPlus className="md:w-5 md:h-5 w-3 h-3" />
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

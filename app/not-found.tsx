"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Home, 
  ArrowLeft, 
  Search, 
  AlertCircle,
  BookOpen,
  GraduationCap 
} from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-purple-100 rounded-full flex items-center justify-center animate-pulse">
            <AlertCircle className="w-16 h-16 text-purple-600" />
          </div>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center animate-bounce">
            <span className="text-2xl font-bold text-orange-600">404</span>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        
        <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved. 
          Don&apos;t worry, even the best explorers get lost sometimes.
        </p>

        {/* Countdown */}
        <div className="mb-8">
          <p className="text-sm text-gray-500 mb-2">
            Redirecting to home in
          </p>
          <div className="w-20 h-20 mx-auto bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-3xl font-bold text-white">{countdown}</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition group"
          >
            <Home className="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
            <span className="font-medium text-gray-700">Go Home</span>
          </Link>

          <Link
            href="/courses"
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition group"
          >
            <BookOpen className="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
            <span className="font-medium text-gray-700">Browse Courses</span>
          </Link>

          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 p-4 bg-white rounded-xl border border-purple-100 hover:border-purple-300 hover:shadow-lg transition group sm:col-span-2 lg:col-span-1"
          >
            <GraduationCap className="w-5 h-5 text-purple-600 group-hover:scale-110 transition" />
            <span className="font-medium text-gray-700">Go to Dashboard</span>
          </Link>
        </div>

        {/* Search Suggestion */}
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <Search className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Looking for something specific?</h3>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Try searching our courses or check out these popular categories:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Web Development', 'Data Science', 'UI/UX Design', 'Mobile Development'].map((cat) => (
              <Link
                key={cat}
                href={`/courses?category=${cat.toLowerCase().replace(' ', '-')}`}
                className="px-4 py-2 bg-white rounded-lg text-sm text-purple-600 hover:bg-purple-100 transition border border-purple-200"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mt-8 inline-flex items-center gap-2 text-gray-500 hover:text-purple-600 transition group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition" />
          <span>Go Back</span>
        </button>
      </div>
    </div>
  );
}
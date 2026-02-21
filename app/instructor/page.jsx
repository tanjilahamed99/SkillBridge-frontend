"use client";
import Link from "next/link";
import {
  BookOpen,
  Users,
  DollarSign,
  Star,
  Clock,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Upload,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useDispatch";

export default function InstructorDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const stats = [
    {
      label: "Total Courses",
      value: "8",
      icon: BookOpen,
      change: "+2",
      color: "bg-purple-500",
    },
    {
      label: "Total Students",
      value: "1,234",
      icon: Users,
      change: "+156",
      color: "bg-blue-500",
    },
    {
      label: "Monthly Revenue",
      value: "$4,250",
      icon: DollarSign,
      change: "+$850",
      color: "bg-green-500",
    },
  ];

  const recentCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      students: 456,
      revenue: 6840,
      rating: 4.9,
      status: "published",
      lastUpdated: "2 days ago",
      thumbnail: "from-blue-500 to-purple-600",
    },
    {
      id: 2,
      title: "Advanced JavaScript: From Zero to Hero",
      students: 234,
      revenue: 3510,
      rating: 4.8,
      status: "published",
      lastUpdated: "5 days ago",
      thumbnail: "from-yellow-500 to-orange-600",
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      students: 189,
      revenue: 2835,
      rating: 4.7,
      status: "draft",
      lastUpdated: "1 week ago",
      thumbnail: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      title: "React Native Mobile Development",
      students: 0,
      revenue: 0,
      rating: 0,
      status: "pending",
      lastUpdated: "3 days ago",
      thumbnail: "from-cyan-500 to-blue-600",
    },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "published":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs">
            <CheckCircle className="w-3 h-3" /> Published
          </span>
        );
      case "draft":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
            <Clock className="w-3 h-3" /> Draft
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name} 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Here&apos;s what&apos;s happening with your courses today
          </p>
        </div>
        <Link
          href="/instructor/courses/create"
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
          <Upload className="w-5 h-5" />
          Create New Course
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    {stat.change} this month
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid gap-8">
        {/* Left Column - Courses */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Courses */}
          <div className="bg-white rounded-2xl border border-purple-100 overflow-hidden">
            <div className="p-6 border-b border-purple-100">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Your Courses
                </h2>
                <Link
                  href="/instructor/courses"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                  View All
                </Link>
              </div>
            </div>

            <div className="divide-y divide-purple-100">
              {recentCourses.map((course) => (
                <div
                  key={course.id}
                  className="p-6 hover:bg-purple-50 transition">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div
                      className={`md:w-32 h-20 bg-linear-to-r ${course.thumbnail} rounded-xl shrink-0`}></div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {course.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1">
                            {getStatusBadge(course.status)}
                            <span className="text-xs text-gray-500">
                              Updated {course.lastUpdated}
                            </span>
                          </div>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-3">
                        <div>
                          <p className="text-xs text-gray-500">Students</p>
                          <p className="font-semibold text-gray-900">
                            {course.students}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Revenue</p>
                          <p className="font-semibold text-gray-900">
                            ${course.revenue}
                          </p>
                        </div>
                      </div>

                      {/* Progress Bar for course completion (if applicable) */}
                      {course.status === "published" && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-500">
                              Course Progress
                            </span>
                            <span className="text-gray-700">75%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className="w-3/4 h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full"></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

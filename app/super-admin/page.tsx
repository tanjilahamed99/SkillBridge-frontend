"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  Download,
  Clock,
  CheckCircle,
  UserPlus,
  Video,
  Award,
  Settings
} from "lucide-react";

export default function SuperAdminDashboard() {
  const [timeRange, setTimeRange] = useState("week");

  const stats = [
    {
      title: "Total Users",
      value: "24,567",
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Total Courses",
      value: "1,234",
      change: "+8.1%",
      trend: "up",
      icon: BookOpen,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Total Revenue",
      value: "$124,567",
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Enrollments",
      value: "45,678",
      change: "+15.2%",
      trend: "up",
      icon: Activity,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600"
    },
  ];

  const instructorStats = [
    { name: "Dr. Sarah Johnson", students: 1234, revenue: 45678, rating: 4.9, courses: 5 },
    { name: "Prof. Michael Chen", students: 987, revenue: 34567, rating: 4.8, courses: 4 },
    { name: "Emily Rodriguez", students: 876, revenue: 29876, rating: 4.7, courses: 3 },
    { name: "James Wilson", students: 765, revenue: 23456, rating: 4.9, courses: 4 },
    { name: "Priya Patel", students: 654, revenue: 19876, rating: 4.8, courses: 3 },
  ];

  const recentActivities = [
    { user: "John Doe", action: "enrolled in", target: "Web Development", time: "2 minutes ago", type: "enrollment" },
    { user: "Sarah Chen", action: "completed", target: "UI/UX Design", time: "15 minutes ago", type: "completion" },
    { user: "Mike Ross", action: "published", target: "Advanced JavaScript", time: "1 hour ago", type: "publication" },
    { user: "Emma Watson", action: "created", target: "Data Science Course", time: "3 hours ago", type: "creation" },
    { user: "Tom Hardy", action: "submitted", target: "Assignment", time: "5 hours ago", type: "submission" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Welcome back, Super Admin. Here&apos;s what&apos;s happening with your platform.
          </p>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-purple-100 self-start">
          {["day", "week", "month", "year"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize transition ${
                timeRange === range
                  ? "bg-purple-600 text-white"
                  : "text-gray-600 hover:text-purple-600"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div className={`${stat.bgLight} p-3 rounded-xl`}>
                  <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.textColor}`} />
                </div>
                <span className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-3 sm:mt-4">
                <p className="text-xs sm:text-sm text-gray-500">{stat.title}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Monthly revenue performance</p>
            </div>
            <button className="p-2 hover:bg-purple-50 rounded-lg transition">
              <Download className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-48 sm:h-64 bg-linear-to-b from-purple-50 to-white rounded-xl flex items-center justify-center border-2 border-dashed border-purple-200">
            <p className="text-gray-400 text-sm">Revenue chart visualization</p>
          </div>
        </div>

        {/* Top Instructors */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Top Instructors</h2>
          <div className="space-y-4">
            {instructorStats.map((instructor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{instructor.name}</p>
                    <p className="text-xs text-gray-500">{instructor.courses} courses</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">${instructor.revenue}</p>
                  <p className="text-xs text-gray-500">{instructor.students} students</p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/super-admin/analytics"
            className="block text-center text-purple-600 hover:text-purple-700 text-sm font-medium mt-6"
          >
            View All Instructors →
          </Link>
        </div>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  activity.type === 'enrollment' ? 'bg-green-100' :
                  activity.type === 'completion' ? 'bg-blue-100' :
                  activity.type === 'publication' ? 'bg-purple-100' : 'bg-orange-100'
                }`}>
                  {activity.type === 'enrollment' && <UserPlus className="w-4 h-4 text-green-600" />}
                  {activity.type === 'completion' && <CheckCircle className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'publication' && <Video className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'creation' && <Award className="w-4 h-4 text-orange-600" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                    <span className="font-medium text-purple-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              href="/super-admin/admins/create"
              className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl hover:bg-purple-100 transition"
            >
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Create Admin</p>
                <p className="text-xs text-gray-500">Add new administrator</p>
              </div>
            </Link>

            <Link
              href="/super-admin/courses/pending"
              className="flex items-center gap-3 p-3 bg-orange-50 rounded-xl hover:bg-orange-100 transition"
            >
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Pending Courses</p>
                <p className="text-xs text-gray-500">12 courses need review</p>
              </div>
            </Link>

            <Link
              href="/super-admin/settings"
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Platform Settings</p>
                <p className="text-xs text-gray-500">Configure system</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
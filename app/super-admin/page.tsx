"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  BookOpen,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { superAdminAnalysis } from "@/actions/superAdmin";

export default function SuperAdminDashboard() {
  const [dashboardData, setDashboardData] = useState({
    users: {
      title: "Total Users",
      value: 0,
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    courses: {
      title: "Total Courses",
      value: 0,
      change: "+8.1%",
      trend: "up",
      icon: BookOpen,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
    revenue: {
      title: "Total Revenue",
      value: 0,
      change: "+23.5%",
      trend: "up",
      icon: DollarSign,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
    enrolment: {
      title: "Enrollments",
      value: 0,
      change: "+15.2%",
      trend: "up",
      icon: Activity,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
  });


  const instructorStats = [
    {
      name: "Dr. Sarah Johnson",
      students: 1234,
      revenue: 45678,
      rating: 4.9,
      courses: 5,
    },
    {
      name: "Prof. Michael Chen",
      students: 987,
      revenue: 34567,
      rating: 4.8,
      courses: 4,
    },
    {
      name: "Emily Rodriguez",
      students: 876,
      revenue: 29876,
      rating: 4.7,
      courses: 3,
    },
    {
      name: "James Wilson",
      students: 765,
      revenue: 23456,
      rating: 4.9,
      courses: 4,
    },
    {
      name: "Priya Patel",
      students: 654,
      revenue: 19876,
      rating: 4.8,
      courses: 3,
    },
  ];


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await superAdminAnalysis();

      if (data.success) {
        console.log("here");
        setDashboardData((prev) => ({
          users: {
            ...prev.users,
            value: data.totalUsers || 0,
          },
          courses: {
            ...prev.courses,
            value: data.totalCourses || 0,
          },
          revenue: {
            ...prev.revenue,
            value: data.revenue?.total || 0,
          },
          enrolment: {
            ...prev.enrolment,
            value: data.enrolment?.total || 0,
          },
        }));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Welcome back, Super Admin. Here&apos;s what&apos;s happening with
            your platform.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div className={`${dashboardData.users.bgLight} p-3 rounded-xl`}>
              <Users
                className={`w-5 h-5 sm:w-6 sm:h-6 ${dashboardData.users.textColor}`}
              />
            </div>
            <span
              className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                dashboardData.users.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
              {dashboardData.users.trend === "up" ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {dashboardData.users.change}
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-500">
              {dashboardData.users.title}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
              {dashboardData.users.value}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div className={`${dashboardData.courses.bgLight} p-3 rounded-xl`}>
              <BookOpen
                className={`w-5 h-5 sm:w-6 sm:h-6 ${dashboardData.courses.textColor}`}
              />
            </div>
            <span
              className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                dashboardData.courses.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
              {dashboardData.courses.trend === "up" ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {dashboardData.courses.change}
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-500">
              {dashboardData.courses.title}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
              {dashboardData.courses.value}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div className={`${dashboardData.revenue.bgLight} p-3 rounded-xl`}>
              <DollarSign
                className={`w-5 h-5 sm:w-6 sm:h-6 ${dashboardData.revenue.textColor}`}
              />
            </div>
            <span
              className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                dashboardData.revenue.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
              {dashboardData.revenue.trend === "up" ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {dashboardData.revenue.change}
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-500">
              {dashboardData.revenue.title}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
              {dashboardData.revenue.value}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6 hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div
              className={`${dashboardData.enrolment.bgLight} p-3 rounded-xl`}>
              <Users
                className={`w-5 h-5 sm:w-6 sm:h-6 ${dashboardData.enrolment.textColor}`}
              />
            </div>
            <span
              className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
                dashboardData.enrolment.trend === "up"
                  ? "text-green-600"
                  : "text-red-600"
              }`}>
              {dashboardData.enrolment.trend === "up" ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {dashboardData.enrolment.change}
            </span>
          </div>
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm text-gray-500">
              {dashboardData.enrolment.title}
            </p>
            <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">
              {dashboardData.enrolment.value}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6">
        {/* Top Instructors */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Top Instructors
          </h2>
          <div className="space-y-4">
            {instructorStats.map((instructor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                    {instructor.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">
                      {instructor.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {instructor.courses} courses
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    ${instructor.revenue}
                  </p>
                  <p className="text-xs text-gray-500">
                    {instructor.students} students
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/super-admin/users"
            className="block text-center text-purple-600 hover:text-purple-700 text-sm font-medium mt-6">
            View All Instructors →
          </Link>
        </div>
      </div>
    </div>
  );
}

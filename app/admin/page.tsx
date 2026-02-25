"use client";

import { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Download,
  ArrowUp,
  ArrowDown,
  Target,
  Activity,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react";
import { getAdminAnalytics } from "@/actions/admin";

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<unknown>({});
  const [dateRange, setDateRange] = useState("30days");

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminAnalytics();
      if (data.success) {
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };/*  */

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const metrics = [
    {
      title: "Total Users",
      value: analytics?.totalUsers || 0,
      change: "+12.3%",
      trend: "up",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Total Courses",
      value: analytics?.totalCourses || 0,
      change: "+8.1%",
      trend: "up",
      icon: BookOpen,
      color: "bg-purple-500",
    },
    {
      title: "Total Enrollments",
      value: analytics?.totalEnrollments || 0,
      change: "+15.2%",
      trend: "up",
      icon: Activity,
      color: "bg-green-500",
    },
    {
      title: "Completion Rate",
      value: `${analytics?.completionRate || 0}%`,
      change: "+5.2%",
      trend: "up",
      icon: Target,
      color: "bg-orange-500",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Platform performance and insights
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-purple-100 rounded-lg text-sm focus:border-purple-600 focus:outline-none">
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="year">This year</option>
          </select>

          <button className="p-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-purple-100">
              <div className="flex items-start justify-between">
                <div
                  className={`${metric.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span
                  className={`flex items-center gap-1 text-xs font-medium ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                  {metric.trend === "up" ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                  {metric.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">
                {metric.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-xl border border-purple-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">User Growth</h2>
          <div className="h-64 bg-linear-to-b from-purple-50 to-white rounded-lg flex items-center justify-center border-2 border-dashed border-purple-200">
            <LineChart className="w-8 h-8 text-gray-300" />
            <p className="text-gray-400 ml-2">Chart visualization</p>
          </div>
        </div>

        {/* Course Categories */}
        <div className="bg-white rounded-xl border border-purple-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Course Categories
          </h2>
          <div className="h-64 bg-linear-to-b from-purple-50 to-white rounded-lg flex items-center justify-center border-2 border-dashed border-purple-200">
            <PieChart className="w-8 h-8 text-gray-300" />
            <p className="text-gray-400 ml-2">Chart visualization</p>
          </div>
        </div>
      </div>

      {/* Enrollment Trends */}
      <div className="bg-white rounded-xl border border-purple-100 p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Enrollment Trends
        </h2>
        <div className="h-80 bg-linear-to-b from-purple-50 to-white rounded-lg flex items-center justify-center border-2 border-dashed border-purple-200">
          <BarChart3 className="w-8 h-8 text-gray-300" />
          <p className="text-gray-400 ml-2">Chart visualization</p>
        </div>
      </div>
    </div>
  );
}

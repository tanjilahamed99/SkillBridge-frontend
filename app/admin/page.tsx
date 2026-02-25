"use client";

import { useState, useEffect } from "react";
import {
  Users,
  BookOpen,
  Target,
  Activity,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Star,
  UserPlus,
} from "lucide-react";
import { getAdminAnalytics } from "@/actions/admin";

// Define types based on backend response
interface Overview {
  totalUsers: number;
  totalStudents: number;
  totalInstructors: number;
  totalAdmins: number;
  totalCourses: number;
  publishedCourses: number;
  pendingCourses: number;
  draftCourses: number;
  archivedCourses: number;
  totalEnrollments: number;
  totalCompletions: number;
  totalRevenue: number;
  averageCompletionRate: number;
}

interface CategoryDistribution {
  _id: string;
  count: number;
  students: number;
  revenue: number;
}

interface LevelDistribution {
  _id: string;
  count: number;
  students: number;
}

interface TopInstructor {
  name: string;
  email: string;
  picture?: string;
  totalCourses: number;
  publishedCourses: number;
  totalStudents: number;
  totalRevenue: number;
  avgRating: number;
}

interface PopularCourse {
  title: string;
  thumbnail?: string;
  category: string;
  level: string;
  instructorName: string;
  totalEnrollments: number;
  averageRating: number;
  revenue: number;
  isFree?: boolean;
  price?: number;
}

interface RecentActivity {
  type: "enrollment" | "course_creation";
  courseTitle: string;
  studentName?: string;
  instructorName?: string;
  enrolledAt?: string;
  createdAt?: string;
}

interface GrowthTrend {
  month: string;
  count: number;
}

interface AnalyticsData {
  overview: Overview;
  distribution: {
    categories: CategoryDistribution[];
    levels: LevelDistribution[];
  };
  topInstructors: TopInstructor[];
  popularCourses: PopularCourse[];
  recentActivities: RecentActivity[];
  growthTrends: {
    users: GrowthTrend[];
    courses: GrowthTrend[];
  };
}

export default function AdminAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "instructors" | "courses" | "trends"
  >("overview");

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const { data } = await getAdminAnalytics();
      console.log("Analytics data:", data);
      if (data.success) {
        setAnalytics(data.data);
      }
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Format number with commas
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  // Overview metrics cards
  const overviewMetrics = [
    {
      title: "Total Users",
      value: analytics?.overview.totalUsers || 0,
      subValue: `${analytics?.overview.totalStudents || 0} students • ${analytics?.overview.totalInstructors || 0} instructors`,
      icon: Users,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Courses",
      value: analytics?.overview.totalCourses || 0,
      subValue: `${analytics?.overview.publishedCourses || 0} published • ${analytics?.overview.pendingCourses || 0} pending`,
      icon: BookOpen,
      color: "bg-purple-500",
      bgLight: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Enrollments",
      value: formatNumber(analytics?.overview.totalEnrollments || 0),
      subValue: `${formatNumber(analytics?.overview.totalCompletions || 0)} completions`,
      icon: Activity,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Revenue",
      value: formatCurrency(analytics?.overview.totalRevenue || 0),
      subValue: `${analytics?.overview.averageCompletionRate || 0}% avg. completion`,
      icon: DollarSign,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
  ];

  // Secondary metrics
  const secondaryMetrics = [
    {
      title: "Completion Rate",
      value: `${analytics?.overview.averageCompletionRate || 0}%`,
      icon: Target,
      color: "bg-indigo-500",
    },
    {
      title: "Students per Course",
      value: analytics?.overview.totalCourses
        ? Math.round(
            (analytics.overview.totalEnrollments /
              analytics.overview.totalCourses) *
              10,
          ) / 10
        : 0,
      icon: Users,
      color: "bg-pink-500",
    },
    {
      title: "Published Ratio",
      value: analytics?.overview.totalCourses
        ? `${Math.round((analytics.overview.publishedCourses / analytics.overview.totalCourses) * 100)}%`
        : "0%",
      icon: CheckCircle,
      color: "bg-teal-500",
    },
    {
      title: "Revenue per Student",
      value: analytics?.overview.totalStudents
        ? formatCurrency(
            analytics.overview.totalRevenue / analytics.overview.totalStudents,
          )
        : formatCurrency(0),
      icon: TrendingUp,
      color: "bg-amber-500",
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
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overviewMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white p-5 rounded-xl border border-purple-100 hover:shadow-lg transition">
              <div className="flex items-start justify-between">
                <div
                  className={`${metric.color} w-10 h-10 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 mt-3">
                {metric.value}
              </p>
              <p className="text-sm font-medium text-gray-900 mt-1">
                {metric.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{metric.subValue}</p>
            </div>
          );
        })}
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {secondaryMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 rounded-xl border border-purple-100 flex items-center gap-3">
              <div
                className={`${metric.color} w-10 h-10 rounded-lg flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-900">
                  {metric.value}
                </p>
                <p className="text-xs text-gray-500">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-purple-100">
        <div className="flex gap-4 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              activeTab === "overview"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            Overview
          </button>
          <button
            onClick={() => setActiveTab("instructors")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              activeTab === "instructors"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            Top Instructors
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              activeTab === "courses"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            Popular Courses
          </button>
          <button
            onClick={() => setActiveTab("trends")}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition ${
              activeTab === "trends"
                ? "border-purple-600 text-purple-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            Growth Trends
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Category Distribution */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Course Categories
              </h2>
              <div className="space-y-4">
                {analytics?.distribution.categories.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{cat._id}</p>
                      <p className="text-xs text-gray-500">
                        {cat.count} courses • {formatNumber(cat.students)}{" "}
                        students
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900">
                      {formatCurrency(cat.revenue)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Level Distribution */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Course Levels
              </h2>
              <div className="space-y-4">
                {analytics?.distribution.levels.map((level, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 capitalize">
                        {level._id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {level.count} courses • {formatNumber(level.students)}{" "}
                        students
                      </p>
                    </div>
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{
                          width: `${(level.count / (analytics?.distribution.levels.reduce((acc, l) => acc + l.count, 0) || 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-purple-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Recent Activities
              </h2>
              <div className="space-y-4">
                {analytics?.recentActivities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        activity.type === "enrollment"
                          ? "bg-green-100"
                          : "bg-blue-100"
                      }`}>
                      {activity.type === "enrollment" ? (
                        <UserPlus className="w-4 h-4 text-green-600" />
                      ) : (
                        <BookOpen className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        {activity.type === "enrollment" ? (
                          <>
                            <span className="font-medium">
                              {activity.studentName}
                            </span>{" "}
                            enrolled in{" "}
                            <span className="font-medium">
                              {activity.courseTitle}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="font-medium">
                              {activity.instructorName}
                            </span>{" "}
                            created{" "}
                            <span className="font-medium">
                              {activity.courseTitle}
                            </span>
                          </>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(
                          activity.enrolledAt || activity.createdAt || "",
                        ).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Top Instructors Tab */}
        {activeTab === "instructors" && (
          <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Courses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Students
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Revenue
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Rating
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analytics?.topInstructors.map((instructor, idx) => (
                    <tr key={idx} className="hover:bg-purple-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-linear-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                            {instructor.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {instructor.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {instructor.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {instructor.publishedCourses}
                        </p>
                        <p className="text-xs text-gray-500">
                          Total: {instructor.totalCourses}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {formatNumber(instructor.totalStudents)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(instructor.totalRevenue)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium text-gray-900">
                            {instructor.avgRating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Popular Courses Tab */}
        {activeTab === "courses" && (
          <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Instructor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Enrollments
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {analytics?.popularCourses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-purple-50 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {course.title}
                            </p>
                            <p className="text-xs text-gray-500 capitalize">
                              {course.level}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {course.instructorName}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {course.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {formatNumber(course.totalEnrollments)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-900">
                            {course.averageRating?.toFixed(1) || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          {formatCurrency(course.revenue)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Growth Trends Tab */}
        {activeTab === "trends" && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* User Growth */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                User Growth
              </h2>
              <div className="space-y-4">
                {analytics?.growthTrends.users.map((trend, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{trend.month}</span>
                    <span className="font-medium text-gray-900">
                      {trend.count} users
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Growth */}
            <div className="bg-white rounded-xl border border-purple-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Course Growth
              </h2>
              <div className="space-y-4">
                {analytics?.growthTrends.courses.map((trend, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{trend.month}</span>
                    <span className="font-medium text-gray-900">
                      {trend.count} courses
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

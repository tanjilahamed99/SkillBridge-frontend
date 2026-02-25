"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  Clock,
  TrendingUp,
  PlayCircle,
  ChevronRight,
  Loader2,
  AlertCircle,
  CheckCircle,
  BarChart,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useDispatch";
import { useEffect, useState } from "react";
import { getStudentStats } from "@/actions/students";
import { toast } from "sonner";
import Image from "next/image";

// Define types
interface Course {
  courseId: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
    picture?: string;
  };
  thumbnail: string;
  category: string;
  level: string;
  enrolledAt: string;
  status: "active" | "completed" | "dropped";
  progress: number;
  totalLessons: number;
  completedLessons: number;
  lastAccessed?: string;
  nextLesson?: {
    _id: string;
    title: string;
    order: number;
    duration: string;
  };
}

interface Stats {
  totalEnrolledCourses: number;
  activeCourses: number;
  completedCourses: number;
  averageProgress: number;
  totalCompletedLessons: number;
  totalLessons: number;
  certificatesEarned: number;
  completionRate: number;
  categoryDistribution: Record<string, number>;
  levelDistribution: Record<string, number>;
}

export default function StudentDashboard() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const { data } = await getStudentStats();
        if (data.success) {
          setStats(data.data.stats);
          setEnrolledCourses(data.data.enrolledCourses);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Stats cards configuration
  const statsCards = [
    {
      label: "Enrolled Courses",
      value: stats?.totalEnrolledCourses || 0,
      icon: BookOpen,
      color: "bg-blue-500",
      bgLight: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      label: "In Progress",
      value: stats?.activeCourses || 0,
      icon: TrendingUp,
      color: "bg-orange-500",
      bgLight: "bg-orange-50",
      textColor: "text-orange-600",
    },
    {
      label: "Completed",
      value: stats?.completedCourses || 0,
      icon: CheckCircle,
      color: "bg-green-500",
      bgLight: "bg-green-50",
      textColor: "text-green-600",
    },
  ];

  // Progress stats
  const progressStats = [
    {
      label: "Average Progress",
      value: `${stats?.averageProgress || 0}%`,
      icon: BarChart,
      color: "bg-indigo-500",
    },
    {
      label: "Lessons Completed",
      value: `${stats?.totalCompletedLessons || 0}/${stats?.totalLessons || 0}`,
      icon: CheckCircle,
      color: "bg-teal-500",
    },
    {
      label: "Completion Rate",
      value: `${stats?.completionRate || 0}%`,
      icon: TrendingUp,
      color: "bg-pink-500",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0] || "Student"}! 👋
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mt-1">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-xl border border-purple-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    {stat.label}
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {progressStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-4 sm:p-5 rounded-xl border border-purple-100 flex items-center gap-4">
              <div
                className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-500">{stat.label}</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Continue Learning
          </h2>
          <Link
            href="/dashboard/courses"
            className="text-purple-600 hover:text-purple-700 flex items-center text-xs sm:text-sm font-medium">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {enrolledCourses.length === 0 ? (
          <div className="bg-purple-50 rounded-xl p-6 sm:p-8 text-center border border-purple-100">
            <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-purple-300 mx-auto mb-3" />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
              No courses in progress
            </h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              Start your learning journey by enrolling in a course
            </p>
            <Link
              href="/courses"
              className="bg-purple-600 text-white px-5 sm:px-6 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition inline-block text-sm sm:text-base">
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {enrolledCourses.slice(0, 3).map((course) => (
              <div
                key={course.courseId}
                className="bg-white p-4 sm:p-5 rounded-xl border border-purple-100 hover:shadow-lg transition">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Course Thumbnail */}
                  <div className="w-full sm:w-40 h-24 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl shrink-0 overflow-hidden">
                    {course.thumbnail ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${course.thumbnail}`}
                        width={500}
                        height={500}
                        alt={course.title}
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <PlayCircle className="w-8 h-8 text-white opacity-70" />
                      </div>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      {course.instructor?.name || "Instructor"}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs sm:text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">
                          {course.progress || 0}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full"
                          style={{ width: `${course.progress || 0}%` }}
                        />
                      </div>
                    </div>

                    {/* Course Stats */}
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.completedLessons || 0}/
                        {course.totalLessons || 0} lessons
                      </span>
                      {course.nextLesson && (
                        <>
                          <span className="hidden xs:inline text-gray-300">
                            •
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Next: {course.nextLesson.title}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Continue Button */}
                  <Link
                    href={`/dashboard/courses/${course.courseId}`}
                    className="w-full sm:w-auto bg-purple-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-purple-700 transition text-sm whitespace-nowrap">
                    Continue
                  </Link>
                </div>
              </div>
            ))}

            {enrolledCourses.length > 3 && (
              <div className="text-center mt-4">
                <Link
                  href="/dashboard/courses"
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium inline-flex items-center">
                  View all {enrolledCourses.length} courses
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Grid3x3,
  List,
  PlayCircle,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import { getStudentStats } from "@/actions/students";
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

export default function StudentCourses() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "completed" | "dropped"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);

  console.log(enrolledCourses);

  // Filter courses based on status and search
  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesStatus =
      filterStatus === "all" || course.status === filterStatus;
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.instructor.email
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <PlayCircle className="w-3 h-3" />
            Active
          </span>
        );
      case "completed":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case "dropped":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            <XCircle className="w-3 h-3" />
            Dropped
          </span>
        );
      default:
        return null;
    }
  };

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const { data } = await getStudentStats();
        if (data.success) {
          setEnrolledCourses(data.data.enrolledCourses);
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">
          Track and manage all your enrolled courses
        </p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-5 rounded-2xl border border-purple-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses by title, instructor, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Status Filters */}
          <div className="flex flex-wrap gap-2">
            {(["all", "active", "completed", "dropped"] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition ${
                    filterStatus === status
                      ? status === "all"
                        ? "bg-purple-600 text-white"
                        : status === "active"
                          ? "bg-green-600 text-white"
                          : status === "completed"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {status}
                </button>
              ),
            )}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-3 rounded-xl transition ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}>
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {filterStatus !== "all" && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-gray-500">Active filter:</span>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                filterStatus === "active"
                  ? "bg-green-100 text-green-700"
                  : filterStatus === "completed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
              }`}>
              {filterStatus}
            </span>
            <button
              onClick={() => setFilterStatus("all")}
              className="text-xs text-purple-600 hover:text-purple-700">
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium">{filteredCourses.length}</span> of{" "}
        <span className="font-medium">{enrolledCourses.length}</span> courses
      </p>

      {/* Courses Grid/List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-purple-100 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500">
            Try adjusting your filters or search query
          </p>
        </div>
      ) : (
        <div className={"grid md:grid-cols-2 lg:grid-cols-3 gap-6"}>
          {filteredCourses.map((course, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-2xl border ${
                course.status === "active"
                  ? "border-green-200"
                  : course.status === "completed"
                    ? "border-blue-200"
                    : course.status === "dropped"
                      ? "border-gray-200"
                      : "border-purple-100"
              } overflow-hidden hover:shadow-xl transition`}>
              <div>
                {/* Thumbnail */}
                <div
                  className={`h-40 bg-linear-to-r ${course.thumbnail} p-4 relative`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${course.thumbnail}`}
                    width={500}
                    height={500}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    unoptimized={true}
                  />
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(course.status)}
                  </div>
                  {course.status === "active" && course.progress > 0 && (
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-white/90 backdrop-blur rounded-lg p-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">
                            {course.progress}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${course.thumbnail}`}
                            style={{ width: `${course.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    by {course.instructor.name}
                  </p>

                  <Link
                    href={`/dashboard/courses/${course.courseId}`}
                    className="bg-green-600 mt-2 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm">
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  Grid3x3,
  List,
} from "lucide-react";
import { deleteCourse, getCurses } from "@/actions/instructor";
import { useAppSelector } from "@/hooks/useDispatch";
import Swal from "sweetalert2";
import { updateUser } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Image from "next/image";

// Define TypeScript interfaces
interface Course {
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  isFree: boolean;
  status: "published" | "draft" | "pending";
  thumbnail: string;
  students?: number;
  lesson?: string;
  revenue?: number;
  createdAt?: string;
}

interface User {
  _id: string;
  createdCourses?: Array<{ _id: string }>;
}

export default function InstructorCourses() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "published" | "draft" | "pending"
  >("all");
  const [coursesData, setCoursesData] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const user = useAppSelector((state) => state.auth.user) as User | null;
  const dispatch = useDispatch();

  const handleDeleteCourse = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        const response = await deleteCourse(id);

        if (response?.data?.success) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your course has been deleted.",
            icon: "success",
          });

          // Update Redux state
          if (user && user.createdCourses) {
            const updatedCourses = user.createdCourses.filter(
              (course) => course._id !== id,
            );
            dispatch(updateUser({ createdCourses: updatedCourses }));
          }

          // Update local state
          setCoursesData(coursesData.filter((course) => course._id !== id));
        }
      }
    } catch (error) {
      console.error("Delete error:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete course",
        icon: "error",
      });
    }
  };

  // Filter and search courses
  const filteredCourses = coursesData
    .filter((course) =>
      filterStatus === "all" ? true : course.status === filterStatus,
    )
    .filter(
      (course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Published
          </span>
        );
      case "draft":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
            <Clock className="w-3 h-3" /> Draft
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
            <AlertCircle className="w-3 h-3" /> Pending
          </span>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (user?._id) {
      const fetchCourses = async () => {
        try {
          const response = await getCurses(user._id);
          if (response?.data?.data?.length > 0) {
            setCoursesData(response.data.data);
          }
        } catch (error) {
          console.error("Fetch courses error:", error);
        }
      };
      fetchCourses();
    }
  }, [user]);

  // Calculate stats
  const stats = {
    total: coursesData.length,
    published: coursesData.filter((c) => c.status === "published").length,
    pending: coursesData.filter((c) => c.status === "pending").length,
    draft: coursesData.filter((c) => c.status === "draft").length,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">
            Manage and organize your course content
          </p>
        </div>
        <Link
          href="/instructor/courses/create"
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Course
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-5 rounded-2xl border border-purple-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 flex-wrap">
            {(["all", "published", "draft", "pending"] as const).map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-xl font-medium capitalize transition ${
                    filterStatus === status
                      ? status === "all"
                        ? "bg-purple-600 text-white"
                        : status === "published"
                          ? "bg-green-600 text-white"
                          : status === "pending"
                            ? "bg-yellow-600 text-white"
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
                  : "bg-gray-100 text-gray-600"
              }`}>
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-3 rounded-xl transition ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}>
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-purple-100">
          <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-10 h-10 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500 mb-6">
            {searchQuery
              ? "Try adjusting your search or filters"
              : "Start by creating your first course"}
          </p>
          {!searchQuery && (
            <Link
              href="/instructor/courses/create"
              className="inline-flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
              <Plus className="w-5 h-5" />
              Create New Course
            </Link>
          )}
        </div>
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }>
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-xl transition">
              {viewMode === "grid" ? (
                /* Grid View */
                <>
                  <div className="h-40 bg-gray-100 relative">
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
                      <div className="w-full h-full bg-linear-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-purple-400" />
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(course.status)}
                    </div>
                    {course.isFree && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                        FREE
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                        {course.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-gray-400" />
                        <span className="font-bold text-gray-900">
                          {course.price === 0 ? "Free" : `$${course.price}`}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {course.description.length > 100
                        ? course.description.substring(0, 100) + "..."
                        : course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Students</p>
                        <p className="font-semibold text-gray-900">
                          {course.students || 0}
                        </p>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <BookOpen className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Lessons</p>
                        <p className="font-semibold text-gray-900">
                          {course.lesson
                            ? (() => {
                                try {
                                  const parsed = JSON.parse(course.lesson);
                                  return Array.isArray(parsed)
                                    ? parsed.length
                                    : 0;
                                } catch {
                                  return 0;
                                }
                              })()
                            : 0}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Link
                        href={`/instructor/courses/edit/${course._id}`}
                        className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteCourse(course._id)}
                        className="p-2 border border-red-200 rounded-xl hover:bg-red-50 transition">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>

                    {/* Revenue (if published) */}
                    {course.status === "published" &&
                      (course.revenue ?? 0) > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">Revenue</span>
                            <span className="font-bold text-green-600">
                              ${course.revenue}
                            </span>
                          </div>
                        </div>
                      )}
                  </div>
                </>
              ) : (
                /* List View */
                <div className="p-5 flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden shrink-0">
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
                      <div className="w-full h-full bg-linear-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-purple-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          {getStatusBadge(course.status)}
                          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                          {course.isFree && (
                            <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                              FREE
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                          {course.description.length > 100
                            ? course.description.substring(0, 100) + "..."
                            : course.description}
                        </p>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-sm flex-wrap">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" /> {course.students || 0}{" "}
                            students
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.lesson
                              ? (() => {
                                  try {
                                    const parsed = JSON.parse(course.lesson);
                                    return Array.isArray(parsed)
                                      ? parsed.length
                                      : 0;
                                  } catch {
                                    return 0;
                                  }
                                })()
                              : 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />{" "}
                            {course.price === 0 ? "Free" : `$${course.price}`}
                          </span>
                        </div>

                        {course.status === "published" &&
                          (course.revenue ?? 0) > 0 && (
                            <p className="text-sm text-green-600 mt-2">
                              Revenue: ${course.revenue}
                            </p>
                          )}
                      </div>

                      <div className="flex lg:flex-col gap-2">
                        <Link
                          href={`/instructor/courses/edit/${course._id}`}
                          className="bg-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2">
                          <Edit className="w-4 h-4" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteCourse(course._id)}
                          className="px-4 py-2 border border-red-200 text-red-500 rounded-xl font-medium hover:bg-red-50 transition flex items-center justify-center gap-2">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Search,
  CheckCircle,
  Clock,
  DollarSign,
  AlertCircle,
  Archive,
} from "lucide-react";
import { getAllCourses, updateCourseStatus } from "@/actions/superAdmin";
import { toast } from "sonner";

interface Lesson {
  title: string;
  description: string;
  duration: string;
  type: string;
  order: number;
  _id?: string;
}

interface CourseData {
  _id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  language: string;
  price: number;
  isFree: boolean;
  status: string;
  tags: string[];
  prerequisites: string[];
  objectives: string[];
  thumbnail: string | null;
  lessons?: Lesson[];
  lesson?: string; // For parsed JSON string
  totalEnrollments?: number;
  instructor?: {
    name: string;
    email: string;
    _id: string;
  };
  students?: string[]; // Array of student IDs or names
}

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [courses, setCourses] = useState<CourseData[]>([]);

  const stats = {
    total: courses.length,
    published: courses.filter((c) => c.status === "published").length,
    pending: courses.filter((c) => c.status === "pending").length,
    draft: courses.filter((c) => c.status === "draft").length,
    archived: courses.filter((c) => c.status === "archive").length,
  };

  const categories = [...new Set(courses.map((c) => c.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || course.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
            <CheckCircle className="w-3 h-3" /> Published
          </span>
        );
      case "pending":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case "draft":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
            <AlertCircle className="w-3 h-3" /> Draft
          </span>
        );
      case "archive":
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
            <Archive className="w-3 h-3" /> Archived
          </span>
        );
      default:
        return null;
    }
  };

  const handleUpdateStatus = async (courseId: string, newStatus: string) => {
    // Implement API call to update course status
    try {
      const { data } = await updateCourseStatus(courseId, {
        status: newStatus,
      });
      if (data.success) {
        setCourses((prev) =>
          prev.map((course) =>
            course._id === courseId ? { ...course, status: newStatus } : course,
          ),
        );
        toast.success(`Course status updated to ${newStatus}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await getAllCourses();
        if (data.success) {
          setCourses(data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Courses Management
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage all courses across the platform
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Courses</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">
            {stats.total}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-xs text-gray-500">Published</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {stats.published}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-100">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">
            {stats.pending}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">Draft</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-600">
            {stats.draft}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100">
          <p className="text-xs text-gray-500">Archived</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">
            {stats.archived}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-purple-100">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search courses by title or instructor..."
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Status Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {["all", "published", "pending", "draft", "archived"].map(
              (status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${
                    statusFilter === status
                      ? status === "all"
                        ? "bg-purple-600 text-white"
                        : status === "published"
                          ? "bg-green-600 text-white"
                          : status === "pending"
                            ? "bg-yellow-600 text-white"
                            : status === "draft"
                              ? "bg-gray-600 text-white"
                              : "bg-red-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}>
                  {status}
                </button>
              ),
            )}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-purple-100 rounded-lg text-sm focus:border-purple-600 focus:outline-none">
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid/Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Course
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Instructor
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Students
                </th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course, idx) => (
                <tr key={idx} className="hover:bg-purple-50 transition">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${course.thumbnail}`}
                          alt="image not found"
                          width={500}
                          height={500}
                          unoptimized={true}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">
                          {course.title.slice(0, 30)}...
                        </p>
                        <p className="text-xs text-gray-500">
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
                            : 0}{" "}
                          lessons
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {course.instructor?.name || "Unknown Instructor"}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {course.category}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(course.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {/* {course.students.length || 0}
                       */}
                      - 0
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          handleUpdateStatus(course._id, "published");
                        }}
                        className="p-1.5 hover:bg-green-100 rounded-lg transition"
                        title="Publish">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </button>
                      <button
                        onClick={() => {
                          handleUpdateStatus(course._id, "archive");
                        }}
                        className="p-1.5 hover:bg-red-100 rounded-lg transition"
                        title="Archive">
                        <Archive className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 sm:px-6 py-4 border-t border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-medium">1-{filteredCourses.length}</span> of{" "}
            <span className="font-medium">{courses.length}</span> courses
          </p>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50 disabled:opacity-50"
              disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">
              1
            </button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">
              2
            </button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">
              3
            </button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

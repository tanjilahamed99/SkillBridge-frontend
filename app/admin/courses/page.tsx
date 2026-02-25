"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Star,
  Calendar,
  Archive,
  Copy,
  Download,
  MoreHorizontal,
  AlertCircle,
  BookOpen
} from "lucide-react";
import { getCourses, updateCourseStatus } from "@/actions/admin";
import { toast } from "sonner";

interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
  };
  category: string;
  level: string;
  price: number;
  isFree: boolean;
  thumbnail: string;
  status: "published" | "pending" | "draft" | "archived" | "rejected";
  totalEnrollments: number;
  averageRating: number;
  totalReviews: number;
  createdAt: string;
  totalLessons: number;
}

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "pending" | "draft" | "archived">("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const { data } = await getCourses();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (courseId: string, newStatus: string) => {
    try {
      const { data } = await updateCourseStatus(courseId, newStatus);
      if (data.success) {
        setCourses(courses.map(c => 
          c._id === courseId ? { ...c, status: newStatus as any } : c
        ));
        toast.success(`Course ${newStatus}`);
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Failed to update course");
    }
  };

  const handleArchiveCourse = async (courseId: string) => {
    if (window.confirm("Are you sure you want to archive this course?")) {
      try {
        const { data } = await archiveCourse(courseId);
        if (data.success) {
          setCourses(courses.map(c => 
            c._id === courseId ? { ...c, status: "archived" } : c
          ));
          toast.success("Course archived");
        }
      } catch (error) {
        console.error("Error archiving course:", error);
        toast.error("Failed to archive course");
      }
    }
  };

  const categories = [...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Published</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'draft':
        return <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Draft</span>;
      case 'archived':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium flex items-center gap-1"><Archive className="w-3 h-3" /> Archived</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage all courses on the platform
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4" />
            Add Course
          </button>
          <button className="p-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Courses</p>
          <p className="text-xl font-bold text-gray-900">{courses.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-xs text-gray-500">Published</p>
          <p className="text-xl font-bold text-green-600">
            {courses.filter(c => c.status === 'published').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-100">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl font-bold text-yellow-600">
            {courses.filter(c => c.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100">
          <p className="text-xs text-gray-500">Archived</p>
          <p className="text-xl font-bold text-red-600">
            {courses.filter(c => c.status === 'archived').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-purple-100">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center justify-between w-full"
        >
          <span className="font-medium text-gray-700">Filters</span>
          <Filter className="w-5 h-5 text-purple-600" />
        </button>

        <div className={`${showFilters ? 'block' : 'hidden'} lg:block space-y-4 lg:space-y-0 lg:flex lg:items-center lg:gap-4`}>
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title or instructor..."
              className="w-full pl-9 pr-4 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course) => (
                <tr key={course._id} className="hover:bg-purple-50 transition">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                        {course.title.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{course.title}</p>
                        <p className="text-xs text-gray-500">{course.totalLessons} lessons</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{course.instructor.name}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{course.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(course.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium">
                        {course.isFree ? 'Free' : `$${course.price}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{course.totalEnrollments}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm">{course.averageRating.toFixed(1)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {new Date(course.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/courses/${course._id}`}
                        className="p-1.5 hover:bg-purple-100 rounded-lg transition"
                        title="View Course"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </Link>
                      
                      {course.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(course._id, 'published')}
                            className="p-1.5 hover:bg-green-100 rounded-lg transition"
                            title="Approve"
                          >
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(course._id, 'rejected')}
                            className="p-1.5 hover:bg-red-100 rounded-lg transition"
                            title="Reject"
                          >
                            <XCircle className="w-4 h-4 text-red-600" />
                          </button>
                        </>
                      )}

                      {course.status !== 'archived' && (
                        <button
                          onClick={() => handleArchiveCourse(course._id)}
                          className="p-1.5 hover:bg-orange-100 rounded-lg transition"
                          title="Archive"
                        >
                          <Archive className="w-4 h-4 text-orange-600" />
                        </button>
                      )}

                      <button className="p-1.5 hover:bg-red-100 rounded-lg transition" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>

                      <button className="p-1.5 hover:bg-purple-100 rounded-lg transition">
                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-purple-100 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing 1-{filteredCourses.length} of {courses.length} courses
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">2</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Users,
  Star,
  Calendar,
  Download,
  BookOpen,
  AlertCircle,
  Archive,
  Copy
} from "lucide-react";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Dr. Sarah Johnson",
      category: "Web Development",
      price: 49.99,
      status: "published",
      students: 1234,
      rating: 4.9,
      revenue: 67890,
      createdAt: "2024-01-15",
      thumbnail: "web-dev.jpg",
      lessons: 48
    },
    {
      id: 2,
      title: "Advanced JavaScript: From Zero to Hero",
      instructor: "Michael Chen",
      category: "Web Development",
      price: 39.99,
      status: "published",
      students: 876,
      rating: 4.8,
      revenue: 34567,
      createdAt: "2024-02-01",
      thumbnail: "js.jpg",
      lessons: 36
    },
    {
      id: 3,
      title: "UI/UX Design Masterclass",
      instructor: "Emily Rodriguez",
      category: "Design",
      price: 44.99,
      status: "published",
      students: 654,
      rating: 4.9,
      revenue: 29876,
      createdAt: "2024-01-20",
      thumbnail: "uiux.jpg",
      lessons: 42
    },
    {
      id: 4,
      title: "Data Science & AI Fundamentals",
      instructor: "James Wilson",
      category: "Data Science",
      price: 59.99,
      status: "pending",
      students: 0,
      rating: 0,
      revenue: 0,
      createdAt: "2024-03-10",
      thumbnail: "datascience.jpg",
      lessons: 56
    },
    {
      id: 5,
      title: "React Native Mobile Development",
      instructor: "Priya Patel",
      category: "Mobile Development",
      price: 54.99,
      status: "draft",
      students: 0,
      rating: 0,
      revenue: 0,
      createdAt: "2024-02-28",
      thumbnail: "react-native.jpg",
      lessons: 42
    },
    {
      id: 6,
      title: "Cloud Computing with AWS",
      instructor: "Alex Rivera",
      category: "Cloud Computing",
      price: 49.99,
      status: "published",
      students: 432,
      rating: 4.7,
      revenue: 21567,
      createdAt: "2024-01-10",
      thumbnail: "aws.jpg",
      lessons: 45
    },
    {
      id: 7,
      title: "Digital Marketing Strategy",
      instructor: "Lisa Thompson",
      category: "Marketing",
      price: 39.99,
      status: "archived",
      students: 876,
      rating: 4.6,
      revenue: 34567,
      createdAt: "2023-12-05",
      thumbnail: "marketing.jpg",
      lessons: 32
    },
    {
      id: 8,
      title: "Python for Data Analysis",
      instructor: "David Kim",
      category: "Data Science",
      price: 44.99,
      status: "pending",
      students: 0,
      rating: 0,
      revenue: 0,
      createdAt: "2024-03-05",
      thumbnail: "python.jpg",
      lessons: 38
    },
  ];

  const stats = {
    total: courses.length,
    published: courses.filter(c => c.status === 'published').length,
    pending: courses.filter(c => c.status === 'pending').length,
    draft: courses.filter(c => c.status === 'draft').length,
    archived: courses.filter(c => c.status === 'archived').length,
  };

  const categories = [...new Set(courses.map(c => c.category))];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || course.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium"><CheckCircle className="w-3 h-3" /> Published</span>;
      case 'pending':
        return <span className="flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-xs font-medium"><Clock className="w-3 h-3" /> Pending</span>;
      case 'draft':
        return <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"><AlertCircle className="w-3 h-3" /> Draft</span>;
      case 'archived':
        return <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium"><Archive className="w-3 h-3" /> Archived</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Courses Management</h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Manage all courses across the platform
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" />
            Add Course
          </button>
          <button className="p-2 border border-purple-200 rounded-lg hover:bg-purple-50 transition">
            <Download className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-xs text-gray-500">Total Courses</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-xs text-gray-500">Published</p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">{stats.published}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-100">
          <p className="text-xs text-gray-500">Pending</p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500">Draft</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-600">{stats.draft}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-red-100">
          <p className="text-xs text-gray-500">Archived</p>
          <p className="text-xl sm:text-2xl font-bold text-red-600">{stats.archived}</p>
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
            {["all", "published", "pending", "draft", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition ${
                  statusFilter === status
                    ? status === 'all' ? 'bg-purple-600 text-white' :
                      status === 'published' ? 'bg-green-600 text-white' :
                      status === 'pending' ? 'bg-yellow-600 text-white' :
                      status === 'draft' ? 'bg-gray-600 text-white' :
                      'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-purple-100 rounded-lg text-sm focus:border-purple-600 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Courses Grid/Table */}
      <div className="bg-white rounded-xl border border-purple-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Instructor</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Students</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rating</th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="hover:bg-purple-50 transition">
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                        {course.title.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{course.title}</p>
                        <p className="text-xs text-gray-500">{course.lessons} lessons</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">{course.instructor}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">{course.category}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {getStatusBadge(course.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm text-gray-600">{course.students.toLocaleString()}</span>
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    {course.rating > 0 ? (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{course.rating}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4">
                    <span className="text-sm font-medium text-gray-900">
                      ${course.revenue.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-purple-100 rounded-lg transition" title="View">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1.5 hover:bg-blue-100 rounded-lg transition" title="Edit">
                        <Edit className="w-4 h-4 text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-green-100 rounded-lg transition" title="Publish">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-100 rounded-lg transition" title="Archive">
                        <Archive className="w-4 h-4 text-red-600" />
                      </button>
                      <button className="p-1.5 hover:bg-purple-100 rounded-lg transition" title="Duplicate">
                        <Copy className="w-4 h-4 text-purple-600" />
                      </button>
                      <button className="p-1.5 hover:bg-red-100 rounded-lg transition" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-600" />
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
            Showing <span className="font-medium">1-{filteredCourses.length}</span> of <span className="font-medium">{courses.length}</span> courses
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50 disabled:opacity-50" disabled>
              Previous
            </button>
            <button className="px-3 py-1 bg-purple-600 text-white rounded-lg text-sm">1</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">2</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">3</button>
            <button className="px-3 py-1 border border-purple-200 rounded-lg text-sm text-gray-600 hover:bg-purple-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
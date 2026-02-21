"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Copy,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Users,
  Star,
  Upload,
  ChevronDown,
  Grid3x3,
  List
} from "lucide-react";

export default function InstructorCourses() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft' | 'pending'>('all');

  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
      category: "Development",
      price: 49.99,
      status: "published",
      students: 456,
      rating: 4.9,
      revenue: 6840,
      lessons: 48,
      lastUpdated: "2024-03-15",
      thumbnail: "from-blue-500 to-purple-600",
      isFree: false
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      description: "Master Figma, Adobe XD, user research, and prototyping",
      category: "Design",
      price: 44.99,
      status: "published",
      students: 234,
      rating: 4.8,
      revenue: 3510,
      lessons: 42,
      lastUpdated: "2024-03-10",
      thumbnail: "from-purple-500 to-pink-600",
      isFree: false
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      description: "Learn JavaScript from scratch",
      category: "Development",
      price: 0,
      status: "published",
      students: 189,
      rating: 4.7,
      revenue: 0,
      lessons: 32,
      lastUpdated: "2024-03-05",
      thumbnail: "from-yellow-500 to-orange-600",
      isFree: true
    },
    {
      id: 4,
      title: "React Native Mobile Development",
      description: "Build cross-platform mobile apps",
      category: "Mobile",
      price: 59.99,
      status: "draft",
      students: 0,
      rating: 0,
      revenue: 0,
      lessons: 36,
      lastUpdated: "2024-03-01",
      thumbnail: "from-cyan-500 to-blue-600",
      isFree: false
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "Learn Python, pandas, numpy",
      category: "Data Science",
      price: 54.99,
      status: "pending",
      students: 0,
      rating: 0,
      revenue: 0,
      lessons: 45,
      lastUpdated: "2024-02-28",
      thumbnail: "from-green-500 to-purple-600",
      isFree: false
    },
    {
      id: 6,
      title: "Digital Marketing Strategy",
      description: "Master SEO and social media",
      category: "Marketing",
      price: 39.99,
      status: "published",
      students: 123,
      rating: 4.6,
      revenue: 1845,
      lessons: 28,
      lastUpdated: "2024-02-20",
      thumbnail: "from-pink-500 to-rose-600",
      isFree: false
    }
  ];

  const filteredCourses = filterStatus === 'all' 
    ? courses 
    : courses.filter(c => c.status === filterStatus);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"><CheckCircle className="w-3 h-3" /> Published</span>;
      case 'draft':
        return <span className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"><Clock className="w-3 h-3" /> Draft</span>;
      case 'pending':
        return <span className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium"><AlertCircle className="w-3 h-3" /> Pending</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-600 mt-1">Manage and organize your course content</p>
        </div>
        <Link
          href="/instructor/courses/create"
          className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Create New Course
        </Link>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-purple-100">
          <p className="text-sm text-gray-500">Total Courses</p>
          <p className="text-2xl font-bold text-gray-900">{courses.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-green-100">
          <p className="text-sm text-gray-500">Published</p>
          <p className="text-2xl font-bold text-green-600">{courses.filter(c => c.status === 'published').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-yellow-100">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">{courses.filter(c => c.status === 'pending').length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-200">
          <p className="text-sm text-gray-500">Drafts</p>
          <p className="text-2xl font-bold text-gray-600">{courses.filter(c => c.status === 'draft').length}</p>
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
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
            />
          </div>

          {/* Status Filters */}
          <div className="flex gap-2">
            {(['all', 'published', 'draft', 'pending'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition ${
                  filterStatus === status
                    ? status === 'all' ? 'bg-purple-600 text-white' :
                      status === 'published' ? 'bg-green-600 text-white' :
                      status === 'pending' ? 'bg-yellow-600 text-white' :
                      'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition ${
                viewMode === 'grid' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition ${
                viewMode === 'list' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Courses Grid/List */}
      <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-xl transition">
            {viewMode === 'grid' ? (
              /* Grid View */
              <>
                <div className={`h-40 bg-gradient-to-r ${course.thumbnail} p-4 relative`}>
                  <div className="absolute top-4 right-4">
                    {getStatusBadge(course.status)}
                  </div>
                  {course.isFree && (
                    <div className="absolute top-4 left-4 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
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
                      <span className="font-bold text-gray-900">{course.price === 0 ? 'Free' : `$${course.price}`}</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">{course.description}</p>

                  {/* Course Stats */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Students</p>
                      <p className="font-semibold text-gray-900">{course.students}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Lessons</p>
                      <p className="font-semibold text-gray-900">{course.lessons}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-500">Rating</p>
                      <div className="flex items-center justify-center">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900 ml-1">{course.rating || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/instructor/courses/${course.id}/edit`}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <button className="p-2 border border-purple-200 rounded-xl hover:bg-purple-50 transition">
                      <Copy className="w-4 h-4 text-purple-600" />
                    </button>
                    <button className="p-2 border border-red-200 rounded-xl hover:bg-red-50 transition">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>

                  {/* Revenue (if published) */}
                  {course.status === 'published' && course.revenue > 0 && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Revenue</span>
                        <span className="font-bold text-green-600">${course.revenue}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* List View */
              <div className="p-5 flex flex-col lg:flex-row gap-6">
                <div className={`lg:w-48 h-24 bg-gradient-to-r ${course.thumbnail} rounded-xl flex-shrink-0`}></div>
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {getStatusBadge(course.status)}
                        <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                          {course.category}
                        </span>
                        {course.isFree && (
                          <span className="bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">FREE</span>
                        )}
                      </div>
                      <h3 className="font-bold text-gray-900 text-lg mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {course.students} students</span>
                        <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> {course.lessons} lessons</span>
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-400" /> {course.rating || 'N/A'}</span>
                        <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {course.price === 0 ? 'Free' : `$${course.price}`}</span>
                      </div>

                      {course.status === 'published' && course.revenue > 0 && (
                        <p className="text-sm text-green-600 mt-2">Revenue: ${course.revenue}</p>
                      )}
                    </div>

                    <div className="flex lg:flex-col gap-2">
                      <Link
                        href={`/instructor/courses/${course.id}/edit`}
                        className="bg-purple-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-purple-700 transition flex items-center justify-center gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                      <Link
                        href={`/instructor/courses/${course.id}/preview`}
                        className="border border-purple-200 text-purple-600 px-4 py-2 rounded-xl font-medium hover:bg-purple-50 transition flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Search,
  Grid3x3,
  List,
  Clock,
  PlayCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  Users,
  Download,
} from "lucide-react";

export default function StudentCourses() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'completed' | 'dropped'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample courses data with status
  const courses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      description: "Learn HTML, CSS, JavaScript, React, Node.js and more",
      status: "active",
      progress: 68,
      grade: "A-",
      enrolledDate: "2024-01-15",
      completedDate: null,
      thumbnail: "from-blue-500 to-purple-600",
      category: "Development",
      lessons: 48,
      completedLessons: 33,
      duration: "12 weeks",
      rating: 4.9,
      students: 3245,
      certificate: false,
      nextLesson: "React Hooks Deep Dive",
      deadline: "2024-06-30"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      description: "Master Figma, Adobe XD, user research, and prototyping",
      status: "active",
      progress: 42,
      grade: "B+",
      enrolledDate: "2024-02-01",
      completedDate: null,
      thumbnail: "from-purple-500 to-pink-600",
      category: "Design",
      lessons: 42,
      completedLessons: 18,
      duration: "10 weeks",
      rating: 4.8,
      students: 2189,
      certificate: false,
      nextLesson: "Wireframing in Figma",
      deadline: "2024-05-15"
    },
    {
      id: 3,
      title: "Data Science & AI Fundamentals",
      instructor: "Priya Patel",
      description: "Master Python, Pandas, Scikit-learn, and TensorFlow",
      status: "completed",
      progress: 100,
      grade: "A",
      enrolledDate: "2023-09-10",
      completedDate: "2024-01-20",
      thumbnail: "from-green-500 to-purple-600",
      category: "Data Science",
      lessons: 56,
      completedLessons: 56,
      duration: "16 weeks",
      rating: 4.9,
      students: 1876,
      certificate: true,
      certificateUrl: "/certificates/data-science",
      nextLesson: null,
      deadline: null
    },
    {
      id: 4,
      title: "Advanced JavaScript: From Zero to Hero",
      instructor: "James Wilson",
      description: "Deep dive into JavaScript concepts, closures, promises, and async patterns",
      status: "active",
      progress: 15,
      grade: null,
      enrolledDate: "2024-03-05",
      completedDate: null,
      thumbnail: "from-yellow-500 to-orange-600",
      category: "Development",
      lessons: 36,
      completedLessons: 5,
      duration: "8 weeks",
      rating: 4.7,
      students: 1243,
      certificate: false,
      nextLesson: "Understanding Closures",
      deadline: "2024-07-15"
    },
    {
      id: 5,
      title: "React Native Mobile Development",
      instructor: "Emma Brown",
      description: "Build cross-platform mobile apps with React Native",
      status: "dropped",
      progress: 23,
      grade: null,
      enrolledDate: "2023-11-20",
      completedDate: null,
      thumbnail: "from-cyan-500 to-blue-600",
      category: "Mobile",
      lessons: 42,
      completedLessons: 10,
      duration: "10 weeks",
      rating: 4.6,
      students: 892,
      certificate: false,
      nextLesson: null,
      deadline: null,
      dropReason: "Time constraints"
    },
    {
      id: 6,
      title: "Python for Data Analysis",
      instructor: "David Kim",
      description: "Learn pandas, numpy, and data visualization with Python",
      status: "completed",
      progress: 100,
      grade: "A-",
      enrolledDate: "2023-08-15",
      completedDate: "2023-12-10",
      thumbnail: "from-indigo-500 to-purple-600",
      category: "Data Science",
      lessons: 38,
      completedLessons: 38,
      duration: "10 weeks",
      rating: 4.8,
      students: 1567,
      certificate: true,
      certificateUrl: "/certificates/python-analysis",
      nextLesson: null,
      deadline: null
    },
    {
      id: 7,
      title: "Digital Marketing Strategy",
      instructor: "Lisa Thompson",
      description: "Master SEO, social media, and content marketing",
      status: "active",
      progress: 55,
      grade: "B",
      enrolledDate: "2024-02-20",
      completedDate: null,
      thumbnail: "from-pink-500 to-rose-600",
      category: "Marketing",
      lessons: 32,
      completedLessons: 18,
      duration: "8 weeks",
      rating: 4.7,
      students: 1023,
      certificate: false,
      nextLesson: "SEO Best Practices",
      deadline: "2024-06-01"
    },
    {
      id: 8,
      title: "Cloud Computing with AWS",
      instructor: "Alex Rivera",
      description: "Learn AWS services, architecture, and deployment",
      status: "dropped",
      progress: 8,
      grade: null,
      enrolledDate: "2024-01-10",
      completedDate: null,
      thumbnail: "from-orange-500 to-red-600",
      category: "Cloud",
      lessons: 45,
      completedLessons: 4,
      duration: "12 weeks",
      rating: 4.8,
      students: 2134,
      certificate: false,
      nextLesson: null,
      deadline: null,
      dropReason: "Changed career path"
    }
  ];

  // Filter courses based on status and search
  const filteredCourses = courses.filter(course => {
    const matchesStatus = filterStatus === 'all' || course.status === filterStatus;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Calculate stats
  const stats = {
    total: courses.length,
    active: courses.filter(c => c.status === 'active').length,
    completed: courses.filter(c => c.status === 'completed').length,
    dropped: courses.filter(c => c.status === 'dropped').length
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'active':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
            <PlayCircle className="w-3 h-3" />
            Active
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            <CheckCircle className="w-3 h-3" />
            Completed
          </span>
        );
      case 'dropped':
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
        <p className="text-gray-600 mt-1">Track and manage all your enrolled courses</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-green-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <PlayCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.completed}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Dropped</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.dropped}</p>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <XCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
        </div>
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
          <div className="flex gap-2">
            {(['all', 'active', 'completed', 'dropped'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-xl font-medium capitalize transition ${
                  filterStatus === status
                    ? status === 'all' ? 'bg-purple-600 text-white' :
                      status === 'active' ? 'bg-green-600 text-white' :
                      status === 'completed' ? 'bg-blue-600 text-white' :
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
                viewMode === 'grid'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition ${
                viewMode === 'list'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Filters */}
        {filterStatus !== 'all' && (
          <div className="flex items-center gap-2 mt-4">
            <span className="text-sm text-gray-500">Active filter:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              filterStatus === 'active' ? 'bg-green-100 text-green-700' :
              filterStatus === 'completed' ? 'bg-blue-100 text-blue-700' :
              'bg-gray-100 text-gray-600'
            }`}>
              {filterStatus}
            </span>
            <button
              onClick={() => setFilterStatus('all')}
              className="text-xs text-purple-600 hover:text-purple-700"
            >
              Clear filter
            </button>
          </div>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium">{filteredCourses.length}</span> of <span className="font-medium">{courses.length}</span> courses
      </p>

      {/* Courses Grid/List */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-purple-100 text-center">
          <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No courses found</h3>
          <p className="text-gray-500">Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className={viewMode === 'grid' 
          ? "grid md:grid-cols-2 lg:grid-cols-3 gap-6" 
          : "space-y-4"
        }>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white rounded-2xl border ${
                course.status === 'active' ? 'border-green-200' :
                course.status === 'completed' ? 'border-blue-200' :
                course.status === 'dropped' ? 'border-gray-200' :
                'border-purple-100'
              } overflow-hidden hover:shadow-xl transition`}
            >
              {viewMode === 'grid' ? (
                /* Grid View */
                <div>
                  {/* Thumbnail */}
                  <div className={`h-40 bg-linear-to-r ${course.thumbnail} p-4 relative`}>
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(course.status)}
                    </div>
                    {course.status === 'active' && course.progress > 0 && (
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="bg-white/90 backdrop-blur rounded-lg p-2">
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium text-gray-900">{course.progress}%</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-linear-to-r ${course.thumbnail}`}
                              style={{ width: `${course.progress}%` }}
                            ></div>
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
                      {course.grade && (
                        <span className="text-xs font-bold text-gray-600">
                          Grade: <span className="text-purple-600">{course.grade}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                    <p className="text-sm text-gray-500 mb-3">by {course.instructor}</p>

                    {/* Course Meta */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {course.students}
                      </span>
                    </div>

                    {/* Status-specific content */}
                    {course.status === 'active' && (
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-gray-500">Next: </span>
                          <span className="text-gray-900 font-medium">{course.nextLesson}</span>
                        </div>
                        {course.deadline && (
                          <div className="flex items-center text-sm text-orange-600">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            Due by {new Date(course.deadline).toLocaleDateString()}
                          </div>
                        )}
                        <Link
                          href={`/student/course/${course.id}`}
                          className="block w-full text-center bg-purple-600 text-white py-2 rounded-xl font-medium hover:bg-purple-700 transition"
                        >
                          Continue Learning
                        </Link>
                      </div>
                    )}

                    {course.status === 'completed' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Completed:</span>
                          <span className="text-gray-900 font-medium">
                            {/* {new Date(course.completedDate).toLocaleDateString()} */}
                          </span>
                        </div>
                        {/* {course.certificate && (
                          <Link
                            ={course.certificateUrl}
                            className="block w-full text-center bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition md:flex items-center justify-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Get Certificate
                          </Link>
                        )} */}
                      </div>
                    )}

                    {course.status === 'dropped' && (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-500">
                          Dropped: {course.dropReason}
                        </div>
                        <button className="w-full bg-gray-100 text-gray-600 py-2 rounded-xl font-medium hover:bg-gray-200 transition">
                          Re-enroll
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                /* List View */
                <div className="p-5 flex flex-col lg:flex-row gap-6">
                  {/* Thumbnail */}
                  <div className={`lg:w-48 h-32 bg-linear-to-r ${course.thumbnail} rounded-xl relative shrink-0`}>
                    <div className="absolute top-3 right-3">
                      {getStatusBadge(course.status)}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                          {course.grade && (
                            <span className="text-xs font-bold text-gray-600">
                              Grade: <span className="text-purple-600">{course.grade}</span>
                            </span>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{course.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">by {course.instructor}</p>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                        
                        {/* Meta Info */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {course.completedLessons}/{course.lessons} lessons
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {course.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {course.students} students
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            {course.rating}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex lg:flex-col gap-2">
                        {course.status === 'active' && (
                          <>
                            <Link
                              href={`/student/course/${course.id}`}
                              className="bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-700 transition text-center whitespace-nowrap"
                            >
                              Continue
                            </Link>
                            <button className="border border-purple-200 text-purple-600 px-6 py-2 rounded-xl font-medium hover:bg-purple-50 transition">
                              Details
                            </button>
                          </>
                        )}
                        {/* {course.status === 'completed' && course.certificate && (
                          <Link
                            href={course.certificateUrl}
                            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition flex items-center justify-center"
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Certificate
                          </Link>
                        )}
                        {course.status === 'dropped' && (
                          <button className="bg-gray-100 text-gray-600 px-6 py-2 rounded-xl font-medium hover:bg-gray-200 transition">
                            Re-enroll
                          </button>
                        )} */}
                      </div>
                    </div>

                    {/* Progress Bar for Active Courses */}
                    {course.status === 'active' && (
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium text-gray-900">{course.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-linear-to-r ${course.thumbnail}`}
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                        {course.nextLesson && (
                          <p className="text-sm text-gray-500 mt-2">
                            Next: <span className="text-gray-700">{course.nextLesson}</span>
                          </p>
                        )}
                      </div>
                    )}

                    {/* Completion Info */}
                    {course.status === 'completed' && (
                      <div className="mt-3 flex items-center gap-4 text-sm">
                        <span className="text-gray-500">Completed on:</span>
                        <span className="text-gray-900 font-medium">
                          {/* {new Date(course.completedDate).toLocaleDateString()} */}
                        </span>
                      </div>
                    )}

                    {/* Drop Info */}
                    {course.status === 'dropped' && course.dropReason && (
                      <div className="mt-3 text-sm text-gray-500">
                        Reason: {course.dropReason}
                      </div>
                    )}
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
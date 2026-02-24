"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Users,
  Clock,
  BookOpen,
  DollarSign,
  SlidersHorizontal,
  X,
  Sparkles,
  Grid3x3,
  List,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppSelector } from "@/hooks/useDispatch";
import { toast } from "sonner";
import { enrollInCourse, getAllCourse } from "@/actions/students";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { EnrollmentData, updateUser } from "@/features/auth/authSlice";

// Define Course interface
interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: {
    _id: string;
    name: string;
    email: string;
    picture?: string;
  };
  category: string;
  level: "beginner" | "intermediate" | "advanced" | "all";
  price: number;
  isFree: boolean;
  thumbnail: string;
  totalLessons: number;
  totalEnrollments: number;
  averageRating: number;
  totalReviews: number;
  duration?: string;
  whatYouWillLearn: string[];
  createdAt: string;
  lesson?: string; // Add this field for lessons data
}

// Define User interface to match your auth slice
interface User {
  _id: string;
  role?: string;
  enrolledCourses?: Array<string | EnrollmentData>;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  const user = useAppSelector((state) => state.auth.user) as User | null;

  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      try {
        const { data } = await getAllCourse();
        if (data.success) {
          setCourses(data.courses);
          setFilteredCourses(data.courses);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(courses.map((c) => c.category))];

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...courses];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          course.instructor.name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()),
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (course) => course.category === selectedCategory,
      );
    }

    // Apply level filter
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel);
    }

    // Apply price filter
    if (priceFilter === "free") {
      filtered = filtered.filter((course) => course.isFree);
    } else if (priceFilter === "paid") {
      filtered = filtered.filter((course) => !course.isFree);
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.totalEnrollments - a.totalEnrollments);
        break;
      case "newest":
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.averageRating - a.averageRating);
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [
    courses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    priceFilter,
    sortBy,
  ]);

  const handleEnroll = async (courseId: string, coursePrice?: number) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You want to enroll in this course!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, enroll me!",
      });

      if (result.isConfirmed) {
        const { data } = await enrollInCourse(courseId);
        if (data.success) {
          // Create full enrollment object
          const enrollmentData: EnrollmentData = {
            courseId: courseId,
            enrolledAt: new Date().toISOString(),
            status: "active",
            progress: 0,
            completedLessons: [],
            paymentStatus: coursePrice === 0 ? "completed" : "pending",
            paymentAmount: coursePrice || 0,
          };

          // Get existing enrollments
          const currentEnrollments = user?.enrolledCourses || [];

          // Add new enrollment
          dispatch(
            updateUser({
              enrolledCourses: [...currentEnrollments, enrollmentData],
            }),
          );

          await Swal.fire({
            title: "Enrolled!",
            text: "You have successfully enrolled in the course.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.error("Enrollment error:", error);
      toast.error("Failed to enroll in course");
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedLevel("all");
    setPriceFilter("all");
    setSortBy("popular");
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "beginner":
        return (
          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
            Beginner
          </span>
        );
      case "intermediate":
        return (
          <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
            Intermediate
          </span>
        );
      case "advanced":
        return (
          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
            Advanced
          </span>
        );
      case "all":
        return (
          <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
            All Levels
          </span>
        );
      default:
        return null;
    }
  };

  const getLessonCount = (course: Course): number => {
    if (!course.lesson) return 0;
    try {
      const parsed = JSON.parse(course.lesson);
      return Array.isArray(parsed) ? parsed.length : 0;
    } catch {
      return 0;
    }
  };

  const isUserEnrolled = (courseId: string): boolean => {
    if (!user || !user.enrolledCourses) return false;
    
    return user.enrolledCourses.some((enrollment) => {
      if (typeof enrollment === "string") {
        return enrollment === courseId;
      }
      return enrollment?.courseId === courseId || enrollment?._id === courseId;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-linear-to-br from-purple-600 to-purple-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Expand Your Skills with Our Courses
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto">
              Discover thousands of courses taught by expert instructors. Learn
              at your own pace and advance your career.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for courses..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl text-white border-2 border-white focus:ring-2 focus:ring-purple-300 bg-purple-900/50 backdrop-blur-sm placeholder:text-purple-200"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl border border-purple-100 p-4 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-between w-full px-4 py-2 bg-purple-50 rounded-lg">
              <span className="font-medium text-gray-700">Filters</span>
              <SlidersHorizontal className="w-5 h-5 text-purple-600" />
            </button>

            {/* Filter Options */}
            <div
              className={`${showFilters ? "flex" : "hidden"} lg:flex flex-col lg:flex-row gap-4 w-full`}>
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="flex-1 px-4 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>

              {/* Level Filter */}
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="flex-1 px-4 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none">
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              {/* Price Filter */}
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="flex-1 px-4 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none">
                <option value="all">All Prices</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>

              {/* Sort By Dropdown - Add this */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-4 py-2 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition flex items-center gap-2">
                <X className="w-4 h-4" />
                Clear
              </button>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery ||
            selectedCategory !== "all" ||
            selectedLevel !== "all" ||
            priceFilter !== "all") && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-purple-100">
              <span className="text-sm text-gray-500">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedCategory !== "all" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {selectedLevel !== "all" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1 capitalize">
                  {selectedLevel}
                  <button onClick={() => setSelectedLevel("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {priceFilter !== "all" && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1 capitalize">
                  {priceFilter}
                  <button onClick={() => setPriceFilter("all")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing{" "}
            <span className="font-semibold">{filteredCourses.length}</span>{" "}
            courses
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading courses...</p>
            </div>
          </div>
        )}

        {/* No Results */}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-purple-100">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No courses found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition">
              Clear all filters
            </button>
          </div>
        )}

        {/* Courses Grid/List */}
        {!loading && (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className={`bg-white rounded-xl border border-purple-100 overflow-hidden hover:shadow-lg transition ${
                  viewMode === "list" ? "flex flex-col md:flex-row" : ""
                }`}>
                {/* Thumbnail */}
                <div
                  className={`relative ${viewMode === "list" ? "md:w-48 h-48 md:h-auto" : "w-full h-48"}`}>
                  <div className="w-full h-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                    {course.thumbnail ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${course.thumbnail}`}
                        alt={course.title}
                        height={500}
                        width={500}
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <BookOpen className="w-12 h-12 text-white opacity-50" />
                    )}
                  </div>
                  {course.isFree && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
                      FREE
                    </div>
                  )}
                  {course.averageRating >= 4.8 && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      BESTSELLER
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1">
                  {/* Category & Level */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                      {course.category}
                    </span>
                    {getLevelBadge(course.level)}
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                    <Link
                      href={`/courses/${course._id}`}
                      className="hover:text-purple-600 transition">
                      {course.title}
                    </Link>
                  </h3>

                  {/* Description (list view only) */}
                  {viewMode === "list" && (
                    <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                      {course.description}
                    </p>
                  )}

                  {/* Instructor */}
                  <p className="text-sm text-gray-500 mb-3">
                    by{" "}
                    <span className="text-gray-700 font-medium">
                      {course.instructor.name}
                    </span>
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {course.totalEnrollments?.toLocaleString() || 0} students
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3 h-3" />
                      {getLessonCount(course)} lessons
                    </span>
                    {course.duration && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    )}
                  </div>

                  {/* Price & Action Button */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {course.isFree ? (
                        <span className="text-2xl font-bold text-green-600">
                          Free
                        </span>
                      ) : (
                        <>
                          <DollarSign className="w-4 h-4 text-gray-400" />
                          <span className="text-2xl font-bold text-gray-900">
                            ${course.price}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Action Button Logic */}
                    {!user ? (
                      <Link
                        href="/login"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition text-sm">
                        Login to Enroll
                      </Link>
                    ) : isUserEnrolled(course._id) ? (
                      <Link
                        href={`/dashboard/courses/${course._id}`}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition text-sm">
                        Continue
                      </Link>
                    ) : user.role === "student" ? (
                      <button
                        onClick={() => handleEnroll(course._id, course.price)}
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition text-sm">
                        Enroll Now
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
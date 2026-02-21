"use client";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  PlayCircle,
  Star,
  ChevronRight,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useDispatch";

export default function StudentDashboard() {
  const user = useAppSelector((state) => state.auth.user);
  const stats = [
    {
      label: "Enrolled Courses",
      value: "5",
      icon: BookOpen,
      color: "bg-blue-500",
    },
    {
      label: "Hours Learned",
      value: "124",
      icon: Clock,
      color: "bg-green-500",
    },
    { label: "Certificates", value: "2", icon: Award, color: "bg-purple-500" },
    {
      label: "Completion Rate",
      value: "78%",
      icon: TrendingUp,
      color: "bg-orange-500",
    },
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      progress: 68,
      lessonsLeft: 15,
      image: "from-blue-500 to-purple-600",
      nextLesson: "React Hooks Deep Dive",
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      progress: 42,
      lessonsLeft: 24,
      image: "from-purple-500 to-pink-600",
      nextLesson: "Wireframing in Figma",
    },
    {
      id: 3,
      title: "Data Science & AI Fundamentals",
      instructor: "Priya Patel",
      progress: 25,
      lessonsLeft: 36,
      image: "from-green-500 to-purple-600",
      nextLesson: "Python for Data Analysis",
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "Advanced JavaScript",
      instructor: "James Wilson",
      rating: 4.9,
      students: 1234,
      image: "from-yellow-500 to-orange-600",
    },
    {
      id: 5,
      title: "React Native Mobile Dev",
      instructor: "Emma Brown",
      rating: 4.8,
      students: 892,
      image: "from-cyan-500 to-blue-600",
    },
  ];


  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || "Student"}! 👋
        </h1>
        <p className="text-gray-600 mt-1">
          Continue your learning journey and track your progress
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning & Upcoming Deadlines */}
      <div className="grid gap-8">
        {/* Continue Learning Section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Continue Learning
            </h2>
            <Link
              href="/dashboard/courses"
              className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {inProgressCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white p-5 rounded-2xl border border-purple-100 hover:shadow-lg transition">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div
                    className={`w-full sm:w-48 h-24 bg-linear-to-r ${course.image} rounded-xl flex items-center justify-center`}>
                    <PlayCircle className="w-10 h-10 text-white opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {course.instructor}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">
                          {course.progress}%
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-linear-to-r ${course.image}`}
                          style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="mt-3 flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-500">Next: </span>
                      <span className="text-gray-700 ml-1">
                        {course.nextLesson}
                      </span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-500">
                        {course.lessonsLeft} lessons left
                      </span>
                    </div>
                  </div>
                  <button className="w-full sm:w-auto bg-purple-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-purple-700 transition">
                    Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recommended Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Recommended for You
          </h2>
          <Link
            href="/student/courses"
            className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium">
            Browse All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-lg transition">
              <div className={`h-32 bg-linear-to-r ${course.image} p-4`}>
                <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-purple-600 w-fit">
                  Recommended
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {course.instructor}
                </p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">
                      {course.rating}
                    </span>
                    <span className="text-xs text-gray-400 ml-2">
                      ({course.students})
                    </span>
                  </div>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                    Enroll
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  PlayCircle,
  Star,
  Users,
  ChevronRight,
  Calendar,
  MessageCircle
} from "lucide-react";

export default function StudentDashboard() {
  const stats = [
    { label: "Enrolled Courses", value: "5", icon: BookOpen, color: "bg-blue-500" },
    { label: "Hours Learned", value: "124", icon: Clock, color: "bg-green-500" },
    { label: "Certificates", value: "2", icon: Award, color: "bg-purple-500" },
    { label: "Completion Rate", value: "78%", icon: TrendingUp, color: "bg-orange-500" },
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      instructor: "Sarah Johnson",
      progress: 68,
      lessonsLeft: 15,
      image: "from-blue-500 to-purple-600",
      nextLesson: "React Hooks Deep Dive"
    },
    {
      id: 2,
      title: "UI/UX Design Masterclass",
      instructor: "Michael Chen",
      progress: 42,
      lessonsLeft: 24,
      image: "from-purple-500 to-pink-600",
      nextLesson: "Wireframing in Figma"
    },
    {
      id: 3,
      title: "Data Science & AI Fundamentals",
      instructor: "Priya Patel",
      progress: 25,
      lessonsLeft: 36,
      image: "from-green-500 to-purple-600",
      nextLesson: "Python for Data Analysis"
    },
  ];

  const recommendedCourses = [
    {
      id: 4,
      title: "Advanced JavaScript",
      instructor: "James Wilson",
      rating: 4.9,
      students: 1234,
      image: "from-yellow-500 to-orange-600"
    },
    {
      id: 5,
      title: "React Native Mobile Dev",
      instructor: "Emma Brown",
      rating: 4.8,
      students: 892,
      image: "from-cyan-500 to-blue-600"
    },
  ];

  const upcomingDeadlines = [
    { id: 1, course: "Web Development", task: "Project Submission", due: "2 days left", type: "urgent" },
    { id: 2, course: "UI/UX Design", task: "Quiz 3", due: "5 days left", type: "normal" },
    { id: 3, course: "Data Science", task: "Assignment 2", due: "1 week left", type: "normal" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, John! 👋</h1>
        <p className="text-gray-600 mt-1">Continue your learning journey and track your progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-2xl border border-purple-100 hover:shadow-lg transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue Learning & Upcoming Deadlines */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Continue Learning Section - Takes 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Continue Learning</h2>
            <Link href="/student/courses" className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium">
              View All
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="space-y-4">
            {inProgressCourses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl border border-purple-100 hover:shadow-lg transition">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className={`w-full sm:w-48 h-24 bg-linear-to-r ${course.image} rounded-xl flex items-center justify-center`}>
                    <PlayCircle className="w-10 h-10 text-white opacity-80" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                    
                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium text-gray-900">{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-linear-to-r ${course.image}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Next Lesson */}
                    <div className="mt-3 flex items-center text-sm">
                      <Clock className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-gray-500">Next: </span>
                      <span className="text-gray-700 ml-1">{course.nextLesson}</span>
                      <span className="text-gray-400 mx-2">•</span>
                      <span className="text-gray-500">{course.lessonsLeft} lessons left</span>
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

        {/* Upcoming Deadlines - Takes 1 column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h2>
            <Link href="/student/calendar" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View Calendar
            </Link>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-purple-100">
            <div className="space-y-4">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    deadline.type === 'urgent' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{deadline.task}</p>
                    <p className="text-sm text-gray-500">{deadline.course}</p>
                    <p className={`text-xs mt-1 ${
                      deadline.type === 'urgent' ? 'text-red-500' : 'text-gray-400'
                    }`}>
                      {deadline.due}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action */}
            <button className="w-full mt-4 bg-purple-50 text-purple-600 py-2 rounded-xl font-medium hover:bg-purple-100 transition flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              View Full Schedule
            </button>
          </div>

          {/* Recent Messages */}
          <div className="bg-white p-5 rounded-2xl border border-purple-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Messages</h3>
              <span className="bg-purple-100 text-purple-600 text-xs font-bold px-2 py-1 rounded-full">3 new</span>
            </div>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Instructor Team</p>
                    <p className="text-xs text-gray-500">New message in Web Dev...</p>
                  </div>
                  <span className="text-xs text-gray-400">5m</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center justify-center">
              <MessageCircle className="w-4 h-4 mr-2" />
              View All Messages
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Courses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Recommended for You</h2>
          <Link href="/student/courses" className="text-purple-600 hover:text-purple-700 flex items-center text-sm font-medium">
            Browse All
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedCourses.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl border border-purple-100 overflow-hidden hover:shadow-lg transition">
              <div className={`h-32 bg-linear-to-r ${course.image} p-4`}>
                <div className="bg-white/90 backdrop-blur px-2 py-1 rounded-lg text-xs font-semibold text-purple-600 w-fit">
                  Recommended
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{course.instructor}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{course.rating}</span>
                    <span className="text-xs text-gray-400 ml-2">({course.students})</span>
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
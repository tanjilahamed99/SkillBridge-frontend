"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  PlayCircle,
  CheckCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  FileText,
  Video,
  CheckSquare,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useAppSelector } from "@/hooks/useDispatch";
import { toast } from "sonner";
import { getCourseData } from "@/actions/students";

// Define types
interface Lesson {
  _id: string;
  title: string;
  description: string;
  duration: string;
  type: "video" | "article" | "quiz" | "assignment";
  order: number;
  content?: {
    videoUrl?: string;
    article?: string;
  };
}

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
  level: string;
  thumbnail: string;
  totalLessons: number;
  totalEnrollments: number;
  whatYouWillLearn: string[];
  lesson: string; // This is a JSON string
}

export default function CourseLearningPage() {
  const params = useParams();
  const courseId = params?.id as string | undefined;

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  // Parse lessons from JSON string
  const parseLessons = (lessonString: string): Lesson[] => {
    if (!lessonString) return [];
    try {
      // Handle case where it might already be an array
      if (Array.isArray(lessonString)) {
        return lessonString;
      }
      // Parse JSON string
      const parsed = JSON.parse(lessonString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing lessons:", error);
      return [];
    }
  };

  // Load completed lessons from localStorage (or you can use API)
  const loadCompletedLessons = (courseId: string): string[] => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`course_${courseId}_completed`);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  };

  // Save completed lessons to localStorage
  const saveCompletedLessons = (courseId: string, completed: string[]) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`course_${courseId}_completed`, JSON.stringify(completed));
    }
  };

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setShowSidebar(false);
      } else {
        setShowSidebar(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch course data
  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const { data } = await getCourseData(courseId);
        if (data.success) {
          setCourse(data.courseData);
          
          // Parse lessons
          const parsedLessons = parseLessons(data.courseData.lesson);
          console.log("Parsed lessons:", parsedLessons); // Debug log
          setLessons(parsedLessons);
          
          // Load completed lessons
          const savedCompleted = loadCompletedLessons(courseId);
          setCompletedLessons(savedCompleted);
          
          // Set first lesson as current if available
          if (parsedLessons.length > 0) {
            // Try to find first incomplete lesson
            const firstIncomplete = parsedLessons.find(
              l => !savedCompleted.includes(l._id)
            );
            setCurrentLesson(firstIncomplete || parsedLessons[0]);
          }
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        setError("Failed to load course content");
        toast.error("Failed to load course content");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Update progress when completed lessons change
  useEffect(() => {
    if (lessons.length > 0) {
      const newProgress = Math.round((completedLessons.length / lessons.length) * 100);
      setProgress(newProgress);
      // Save to localStorage
      if (courseId) {
        saveCompletedLessons(courseId, completedLessons);
      }
    }
  }, [completedLessons, lessons.length, courseId]);

  // Handle lesson completion
  const handleCompleteLesson = (lessonId: string) => {
    let newCompleted: string[];

    if (completedLessons.includes(lessonId)) {
      // Mark as incomplete
      newCompleted = completedLessons.filter((id) => id !== lessonId);
      toast.info("Lesson marked as incomplete");
    } else {
      // Mark as complete
      newCompleted = [...completedLessons, lessonId];
      toast.success("Lesson marked as complete!");
    }

    setCompletedLessons(newCompleted);
  };

  // Navigate to next/previous lesson
  const goToNextLesson = () => {
    if (!currentLesson || lessons.length === 0) return;

    const currentIndex = lessons.findIndex(
      (l) => l._id === currentLesson._id
    );
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
      if (isMobile) setShowSidebar(false);
    }
  };

  const goToPrevLesson = () => {
    if (!currentLesson || lessons.length === 0) return;

    const currentIndex = lessons.findIndex(
      (l) => l._id === currentLesson._id
    );
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
      if (isMobile) setShowSidebar(false);
    }
  };

  // Select a lesson from sidebar
  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    if (isMobile) setShowSidebar(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading course content...</p>
        </div>
      </div>
    );
  }

  if (error || !course || lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Course Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "The course you're looking for doesn't exist or you don't have access."}
          </p>
          <Link
            href="/dashboard"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition inline-block">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-purple-100 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left section */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(!showSidebar)}
                className="p-2 hover:bg-purple-50 rounded-lg transition lg:hidden"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-[200px] sm:max-w-[300px]">
                {course.title}
              </h1>
            </div>

            {/* Progress - Desktop */}
            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {progress}% Complete
              </span>
            </div>

            {/* Right section */}
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center text-white font-semibold">
              {user?.name?.charAt(0) || "S"}
            </div>
          </div>

          {/* Mobile progress bar */}
          <div className="lg:hidden pb-3">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Course progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Course Content */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-20 w-80 bg-white border-r border-purple-100 transform transition-transform duration-300 ease-in-out ${
            showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } ${isMobile ? "mt-16 h-[calc(100vh-4rem)]" : ""}`}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar header */}
            <div className="p-4 border-b border-purple-100 flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Course Content</h2>
              <button
                onClick={() => setShowSidebar(false)}
                className="lg:hidden p-1 hover:bg-purple-50 rounded-lg transition"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Course info */}
            <div className="p-4 bg-purple-50 border-b border-purple-100">
              <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-xs text-gray-500">
                {lessons.length} lessons • {progress}% complete
              </p>
            </div>

            {/* Lessons list */}
            <div className="flex-1 overflow-y-auto">
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson._id);
                const isCurrent = currentLesson?._id === lesson._id;

                return (
                  <button
                    key={lesson._id}
                    onClick={() => selectLesson(lesson)}
                    className={`w-full text-left p-4 border-b border-purple-100 hover:bg-purple-50 transition ${
                      isCurrent ? "bg-purple-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 mt-0.5">
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-300" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium ${
                            isCompleted
                              ? "text-gray-500 line-through"
                              : isCurrent
                                ? "text-purple-700"
                                : "text-gray-900"
                          }`}
                        >
                          {index + 1}. {lesson.title}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                          {lesson.type === "video" ? (
                            <Video className="w-3 h-3" />
                          ) : (
                            <FileText className="w-3 h-3" />
                          )}
                          <span>{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {/* Lesson header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>
                    Lesson {lessons.findIndex(l => l._id === currentLesson._id) + 1} of {lessons.length}
                  </span>
                  <span>•</span>
                  <span className="capitalize">{currentLesson.type}</span>
                  <span>•</span>
                  <span>{currentLesson.duration}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {currentLesson.title}
                </h1>
                <p className="text-gray-600">{currentLesson.description}</p>
              </div>

              {/* Video/Content Area */}
              <div className="bg-black rounded-xl overflow-hidden aspect-video mb-6 flex items-center justify-center">
                {currentLesson.type === "video" ? (
                  <div className="text-center">
                    <PlayCircle className="w-16 h-16 text-white opacity-50 cursor-pointer hover:opacity-75 transition" />
                    <p className="text-white mt-2">Video Player</p>
                  </div>
                ) : (
                  <div className="bg-white w-full h-full p-8 overflow-y-auto">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html:
                          currentLesson.content?.article ||
                          "<p>No content available</p>",
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Lesson Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={goToPrevLesson}
                    disabled={lessons.findIndex(l => l._id === currentLesson._id) === 0}
                    className="flex-1 sm:flex-none px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    onClick={goToNextLesson}
                    disabled={lessons.findIndex(l => l._id === currentLesson._id) === lessons.length - 1}
                    className="flex-1 sm:flex-none px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleCompleteLesson(currentLesson._id)}
                  className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    completedLessons.includes(currentLesson._id)
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}
                >
                  {completedLessons.includes(currentLesson._id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <CheckSquare className="w-4 h-4" />
                      Mark as Complete
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Select a lesson to start learning</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-purple-100 p-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setShowSidebar(true)}
            className="flex items-center gap-2 text-purple-600"
          >
            <Menu className="w-5 h-5" />
            <span className="text-sm font-medium">Lessons</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevLesson}
              disabled={!currentLesson || lessons.findIndex(l => l._id === currentLesson._id) === 0}
              className="p-2 hover:bg-purple-50 rounded-lg transition disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm text-gray-600">
              {currentLesson 
                ? `${lessons.findIndex(l => l._id === currentLesson._id) + 1}/${lessons.length}`
                : `0/${lessons.length}`}
            </span>
            <button
              onClick={goToNextLesson}
              disabled={!currentLesson || lessons.findIndex(l => l._id === currentLesson._id) === lessons.length - 1}
              className="p-2 hover:bg-purple-50 rounded-lg transition disabled:opacity-30"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => currentLesson && handleCompleteLesson(currentLesson._id)}
            className={`p-2 rounded-lg transition ${
              currentLesson && completedLessons.includes(currentLesson._id)
                ? "text-green-600"
                : "text-purple-600"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
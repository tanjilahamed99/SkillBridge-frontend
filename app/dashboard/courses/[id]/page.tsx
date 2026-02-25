"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
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
import { useAppSelector, useAppDispatch } from "@/hooks/useDispatch";
import { toast } from "sonner";
import { getCourseData, updateLessonStatus } from "@/actions/students";
import { EnrollmentData, updateUser } from "@/features/auth/authSlice";

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

// Type guard to check if enrollment is an object
const isEnrollmentObject = (
  enrollment: string | EnrollmentData | { _id: string },
): enrollment is EnrollmentData => {
  if (typeof enrollment === "string") return false;
  return (
    enrollment !== null &&
    typeof enrollment === "object" &&
    "courseId" in enrollment
  );
};

export default function CourseLearningPage() {
  const params = useParams();
  const courseId = params?.id as string | undefined;
  const dispatch = useAppDispatch();

  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const user = useAppSelector((state) => state.auth.user);

  const loadCompletedLessons = (courseId: string): number[] => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(`course_${courseId}_completed`);
        return stored ? JSON.parse(stored) : [];
      } catch (error) {
        console.error("Error loading completed lessons:", error);
        return [];
      }
    }
    return [];
  };


  const saveCompletedLessons = (courseId: string, completed: number[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(
          `course_${courseId}_completed`,
          JSON.stringify(completed),
        );
      } catch (error) {
        console.error("Error saving completed lessons:", error);
      }
    }
  };

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

  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const { data } = await getCourseData(courseId);

        if (data.success) {
          // Set course data
          setCourse(data.courseData);

          // Parse lessons from JSON string
          const parseLesson = JSON.parse(data.courseData.lesson);
          setLessons(parseLesson);

          // Load completed lessons from user's Redux data FIRST
          let savedCompleted: number[] = [];

          if (user && courseId && user.enrolledCourses) {
            // Find the enrollment for this course in user data
            const courseEnrollment = user.enrolledCourses.find((item) => {
              if (typeof item === "string") {
                return item === courseId;
              } else if (item && typeof item === "object") {
                // Use type guard to check if it's EnrollmentData
                if (isEnrollmentObject(item)) {
                  return item.courseId === courseId || item._id === courseId;
                } else {
                  // It's just { _id: string }
                  return item._id === courseId;
                }
              }
              return false;
            });

            // If enrollment exists and has completedLessons, use them
            if (courseEnrollment && isEnrollmentObject(courseEnrollment)) {
              const completed = courseEnrollment.completedLessons || [];
              if (Array.isArray(completed)) {
                savedCompleted = completed.map(Number);
              }
            }
          }

          // If no completed lessons found in user data, try localStorage as fallback
          if (savedCompleted.length === 0) {
            const localStorageCompleted = loadCompletedLessons(courseId);
            if (localStorageCompleted.length > 0) {
              savedCompleted = localStorageCompleted;
            }
          }

          // Set completed lessons state
          setCompletedLessons(savedCompleted);

          // Set current lesson after lessons are loaded
          if (parseLesson.length > 0) {
            // Find first incomplete lesson (compare by order)
            const firstIncomplete = parseLesson.find(
              (l: Lesson) => !savedCompleted.includes(l.order),
            );
            setCurrentLesson(firstIncomplete || parseLesson[0]);
          }
        } else {
          setError("Failed to load course data");
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


  useEffect(() => {
    if (lessons.length > 0) {
      const newProgress = Math.round(
        (completedLessons.length / lessons.length) * 100,
      );
      setProgress(newProgress);

      // Save to localStorage
      if (courseId) {
        saveCompletedLessons(courseId, completedLessons);
      }
    }
  }, [completedLessons, lessons.length, courseId]);


  const handleCompleteLesson = async (lessonOrder: number) => {
    // Check if courseId is valid
    if (!user || !courseId || !user.enrolledCourses) {
      toast.error("You must be logged in to track progress");
      return;
    }

    // Type assertion - we know courseId exists because of the check above
    const currentCourseId = courseId as string;

    let newCompleted: number[];

    // Find the current enrollment for this course
    const currentEnrollment = user.enrolledCourses.find((item) => {
      if (typeof item === "string") {
        return item === currentCourseId;
      } else if (item && typeof item === "object") {
        // Use the type guard to check if it's EnrollmentData
        if (isEnrollmentObject(item)) {
          return (
            item.courseId === currentCourseId || item._id === currentCourseId
          );
        } else {
          // It's just { _id: string }
          return item._id === currentCourseId;
        }
      }
      return false;
    });

    if (!currentEnrollment || !isEnrollmentObject(currentEnrollment)) {
      toast.error("Enrollment not found for this course");
      return;
    }

    // Filter out the current course from enrolledCourses
    const otherEnrollments = user.enrolledCourses.filter((item) => {
      if (typeof item === "string") {
        return item !== currentCourseId;
      } else if (item && typeof item === "object") {
        if (isEnrollmentObject(item)) {
          return (
            item.courseId !== currentCourseId && item._id !== currentCourseId
          );
        } else {
          return item._id !== currentCourseId;
        }
      }
      return true;
    });

    // Update completed lessons based on current action
    if (completedLessons.includes(lessonOrder)) {
      // Mark as incomplete
      newCompleted = completedLessons.filter((i) => i !== lessonOrder);
      toast.info("Lesson marked as incomplete");
    } else {
      // Mark as complete
      newCompleted = [...completedLessons, lessonOrder];
      toast.success("Lesson marked as complete!");
    }

    // Create updated enrollment object with new completed lessons
    const updatedEnrollment: EnrollmentData = {
      ...currentEnrollment,
      completedLessons: newCompleted.map(String),
      progress: Math.round((newCompleted.length / lessons.length) * 100),
      lastAccessed: new Date().toISOString(),
    };

    try {
      await updateLessonStatus(currentCourseId, [
        ...otherEnrollments,
        updatedEnrollment,
      ]);
    } catch (error) {
      console.error("Error updating lesson status:", error);
      toast.error("Failed to update lesson status");
    }

    // Dispatch update to Redux
    dispatch(
      updateUser({
        enrolledCourses: [...otherEnrollments, updatedEnrollment],
      }),
    );

    // Update local state
    setCompletedLessons(newCompleted);
  };


  const goToNextLesson = () => {
    if (!currentLesson || lessons.length === 0) return;

    const currentIndex = lessons.findIndex(
      (l) => l.order === currentLesson.order,
    );
    if (currentIndex < lessons.length - 1) {
      setCurrentLesson(lessons[currentIndex + 1]);
    }
  };

  const goToPrevLesson = () => {
    if (!currentLesson || lessons.length === 0) return;

    const currentIndex = lessons.findIndex(
      (l) => l.order === currentLesson.order,
    );
    if (currentIndex > 0) {
      setCurrentLesson(lessons[currentIndex - 1]);
    }
  };

  const selectLesson = (lesson: Lesson) => {
    setCurrentLesson(lesson);
    if (isMobile) setShowSidebar(false);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
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
            {/* Left section - Course Title and Menu */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleSidebar}
                className="p-2 hover:bg-purple-50 rounded-lg transition lg:hidden"
                aria-label="Toggle sidebar">
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900 truncate max-w-37.5 sm:max-w-75">
                {course.title}
              </h1>
            </div>

            {/* Progress - Desktop */}
            <div className="hidden lg:flex items-center gap-4 flex-1 max-w-md mx-8">
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}></div>
              </div>
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                {progress}% Complete
              </span>
            </div>

            {/* Right section - User Avatar */}
            <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center text-white font-semibold">
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
                className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Dropdown */}
      {isMobile && showSidebar && (
        <div className="lg:hidden bg-white border-b border-purple-100 p-4 max-h-80 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Course Content</h2>
            <button
              onClick={() => setShowSidebar(false)}
              className="p-1 hover:bg-purple-50 rounded-lg transition">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Course info */}
          <div className="bg-purple-50 rounded-lg p-3 mb-3">
            <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-xs text-gray-500">
              {lessons.length} lessons • {progress}% complete
            </p>
          </div>

          {/* Lessons list */}
          <div className="space-y-1">
            {lessons.map((lesson, index) => {
              const isCompleted = completedLessons.includes(lesson.order);
              const isCurrent = currentLesson?.order === lesson.order;

              return (
                <button
                  key={lesson.order}
                  onClick={() => selectLesson(lesson)}
                  className={`w-full text-left p-3 rounded-lg hover:bg-purple-50 transition ${
                    isCurrent ? "bg-purple-50" : ""
                  }`}>
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      ) : (
                        <Circle className="w-4 h-4 text-gray-300" />
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
                        }`}>
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
      )}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <aside
            className={`w-80 bg-white border-r border-purple-100 transition-all duration-300 ${
              showSidebar ? "block" : "hidden"
            }`}>
            <div className="h-full flex flex-col">
              {/* Sidebar header */}
              <div className="p-4 border-b border-purple-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Course Content</h2>
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
                  const isCompleted = completedLessons.includes(lesson.order);
                  const isCurrent = currentLesson?.order === lesson.order;

                  return (
                    <button
                      key={lesson.order}
                      onClick={() => selectLesson(lesson)}
                      className={`w-full text-left p-4 border-b border-purple-100 hover:bg-purple-50 transition ${
                        isCurrent ? "bg-purple-50" : ""
                      }`}>
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
                            }`}>
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
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          {currentLesson ? (
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {/* Lesson header */}
              <div className="mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <span>
                    Lesson{" "}
                    {lessons.findIndex((l) => l.order === currentLesson.order) +
                      1}{" "}
                    of {lessons.length}
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
                    disabled={
                      lessons.findIndex(
                        (l) => l.order === currentLesson.order,
                      ) === 0
                    }
                    className="flex-1 sm:flex-none px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <button
                    onClick={goToNextLesson}
                    disabled={
                      lessons.findIndex(
                        (l) => l.order === currentLesson.order,
                      ) ===
                      lessons.length - 1
                    }
                    className="flex-1 sm:flex-none px-4 py-2 border border-purple-200 text-gray-600 rounded-lg hover:bg-purple-50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleCompleteLesson(currentLesson.order)}
                  className={`w-full sm:w-auto px-6 py-2 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    completedLessons.includes(currentLesson.order)
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-purple-600 text-white hover:bg-purple-700"
                  }`}>
                  {completedLessons.includes(currentLesson.order) ? (
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
    </div>
  );
}

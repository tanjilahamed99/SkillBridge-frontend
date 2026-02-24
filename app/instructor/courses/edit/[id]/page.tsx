"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  GripVertical,
  Video,
  DollarSign,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Tag,
  BookOpen,
  Layers,
  ChevronUp,
  Loader2,
} from "lucide-react";
import { getCourseById, updateCourse } from "@/actions/instructor";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { toast } from "sonner";
import Image from "next/image";
import { updateUser } from "@/features/auth/authSlice";

interface User {
  _id: string;
  createdCourses?: Array<{ _id: string }>;
}

interface Lesson {
  title: string;
  description: string;
  duration: string;
  type: string;
  order: number;
  _id?: string;
}

interface CourseData {
  _id?: string;
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
}

export default function EditCourse() {
  const router = useRouter();
  const params = useParams();
  const courseId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const user = useAppSelector((state) => state.auth.user) as User | null;
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();

  const [courseData, setCourseData] = useState<CourseData>({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    language: "english",
    price: 49.99,
    isFree: false,
    status: "draft",
    tags: [],
    prerequisites: ["", "", ""],
    objectives: ["", "", "", ""],
    thumbnail: null,
  });

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      title: "",
      description: "",
      duration: "00:00",
      type: "video",
      order: 1,
    },
  ]);

  const [newTag, setNewTag] = useState("");

  const categories = [
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Mobile Development",
    "Cloud Computing",
    "Digital Marketing",
    "Business",
    "Photography",
    "Music",
  ];

  // Fetch course data on component mount
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      setLoading(true);
      try {
        const response = await getCourseById(courseId);

        if (response?.data?.success && response.data.data) {
          const course = response.data.data;

          // Populate form with existing course data
          setCourseData({
            title: course.title || "",
            description: course.description || "",
            category: course.category || "",
            level: course.level || "beginner",
            language: course.language || "english",
            price: course.price || 49.99,
            isFree: course.isFree || false,
            status: course.status || "draft",
            tags: course.tags || [],
            prerequisites: course.prerequisites?.length
              ? course.prerequisites
              : ["", "", ""],
            objectives: course.objectives?.length
              ? course.objectives
              : ["", "", "", ""],
            thumbnail: course.thumbnail || null,
          });

          // Set lessons if they exist

          if (JSON.parse(course.lesson)?.length) {
            setLessons(JSON.parse(course.lesson));
          }

          // Set thumbnail preview if exists
          if (course.thumbnail) {
            setThumbnailPreview(
              `${process.env.NEXT_PUBLIC_API_URL}/uploads/${course.thumbnail}`,
            );
          }
        } else {
          toast.error("Course not found");
          router.push("/instructor/courses");
        }
      } catch (error) {
        console.error("Error fetching course:", error);
        toast.error("Failed to load course data");
        router.push("/instructor/courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, router]);

  const validateBasicInfo = () => {
    const newErrors: { [key: string]: string } = {};

    if (!courseData.title.trim()) {
      newErrors.title = "Course title is required";
    } else if (courseData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!courseData.description.trim()) {
      newErrors.description = "Course description is required";
    } else if (courseData.description.length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    if (!courseData.category) {
      newErrors.category = "Please select a category";
    }

    // Thumbnail is optional for editing (only required if no existing thumbnail)
    if (!thumbnailFile && !courseData.thumbnail) {
      newErrors.thumbnail = "Course thumbnail is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addTag = () => {
    if (newTag && !courseData.tags.includes(newTag)) {
      setCourseData({
        ...courseData,
        tags: [...courseData.tags, newTag],
      });
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setCourseData({
      ...courseData,
      tags: courseData.tags.filter((t) => t !== tag),
    });
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      setThumbnailFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear thumbnail error if any
      if (errors.thumbnail) {
        setErrors({ ...errors, thumbnail: "" });
      }
    }
  };

  const moveLesson = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === lessons.length - 1)
    )
      return;

    const newLessons = [...lessons];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newLessons[index], newLessons[newIndex]] = [
      newLessons[newIndex],
      newLessons[index],
    ];

    // Update order
    newLessons.forEach((lesson, i) => {
      lesson.order = i + 1;
    });

    setLessons(newLessons);
  };

  const handleSave = async (
    publishStatus?: "draft" | "pending" | "published",
  ) => {
    if (!validateBasicInfo()) {
      setActiveTab("basic");
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append("title", courseData.title);
      formData.append("description", courseData.description);
      formData.append("category", courseData.category);
      formData.append("lesson", JSON.stringify(lessons));
      formData.append("level", courseData.level);
      formData.append("price", courseData.price.toString());
      formData.append("isFree", courseData.isFree.toString());
      formData.append("status", publishStatus || courseData.status);
      formData.append("tags", JSON.stringify(courseData.tags));
      formData.append(
        "prerequisites",
        JSON.stringify(courseData.prerequisites.filter((p) => p.trim() !== "")),
      );
      formData.append(
        "objectives",
        JSON.stringify(courseData.objectives.filter((o) => o.trim() !== "")),
      );

      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const response = await updateCourse(courseId, formData);

      if (response?.data?.success) {
        toast.success("Course updated successfully");

        // Get the full course data from response
        const updatedCourseData = response.data.data;

        if (user) {
          // Check if the course already exists in user's createdCourses
          // Compare with either courseId or _id
          const courseExists = user.createdCourses?.some(
            (course) =>
              course.courseId === updatedCourseData._id ||
              course._id === updatedCourseData._id,
          );

          let updatedCourses;

          if (courseExists) {
            // Update existing course - PRESERVE the structure of user.createdCourses
            updatedCourses = user.createdCourses.map((course) => {
              // Check if this is the course we're updating
              if (
                course.courseId === updatedCourseData._id ||
                course._id === updatedCourseData._id
              ) {
                // Return object with the SAME STRUCTURE as user.createdCourses
                return {
                  courseId: updatedCourseData._id, // Keep the courseId field
                  _id: course._id || updatedCourseData._id, // Keep existing _id or use new one
                  status: updatedCourseData.status || course.status,
                  thumbnail: updatedCourseData.thumbnail || course.thumbnail,
                  totalStudents:
                    updatedCourseData.totalEnrollments ||
                    course.totalStudents ||
                    0,
                  totalRevenue: course.totalRevenue || 0, // Keep existing revenue
                  // Preserve any other fields that were in the original
                  ...course, // Keep existing fields
                  // Override with new data but only specific fields
                  title: updatedCourseData.title, // Add title if needed
                };
              }
              return course;
            });
          } else {
            // Add new course to the array - match the structure of user.createdCourses
            const newCourseEntry = {
              courseId: updatedCourseData._id,
              _id: updatedCourseData._id,
              status: updatedCourseData.status || "draft",
              thumbnail: updatedCourseData.thumbnail || null,
              totalStudents: updatedCourseData.totalEnrollments || 0,
              totalRevenue: 0,
              title: updatedCourseData.title, // Add title if your structure supports it
            };

            updatedCourses = [...(user.createdCourses || []), newCourseEntry];
          }
          dispatch(updateUser({ createdCourses: updatedCourses }));
        }

        router.push("/instructor/courses");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      setError("An error occurred while saving the course. Please try again.");
      toast.error("Failed to update course");
    } finally {
      setIsSaving(false);
    }
  };

  const addLesson = () => {
    const newLesson = {
      title: "",
      description: "",
      duration: "00:00",
      type: "video",
      order: lessons.length + 1,
    };
    setLessons([...lessons, newLesson]);
  };

  const removeLesson = (index: number) => {
    const newLessons = lessons.filter((_, i) => i !== index);
    // Update orders
    newLessons.forEach((lesson, i) => {
      lesson.order = i + 1;
    });
    setLessons(newLessons);
  };

  const tabs = [
    { id: "basic", name: "Basic Info", icon: <BookOpen className="w-4 h-4" /> },
    {
      id: "content",
      name: "Course Content",
      icon: <Layers className="w-4 h-4" />,
    },
    {
      id: "pricing",
      name: "Pricing",
      icon: <DollarSign className="w-4 h-4" />,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading course data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4 sm:py-0 sm:h-20 gap-4 sm:gap-0">
            {/* Left side */}
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/instructor/courses"
                className="p-1.5 sm:p-2 hover:bg-purple-50 rounded-lg sm:rounded-xl transition shrink-0">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </Link>
              <div className="min-w-0">
                {" "}
                {/* Allows text truncation */}
                <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">
                  Edit Course
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate hidden xs:block">
                  Update your course information
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex flex-col md:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="w-full xs:w-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 border border-purple-200 text-purple-600 rounded-lg sm:rounded-xl font-medium hover:bg-purple-50 transition disabled:opacity-50 text-xs sm:text-sm">
                Save Draft
              </button>
              <button
                onClick={() => handleSave("pending")}
                disabled={isSaving}
                className="w-full xs:w-auto bg-purple-600 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-medium hover:bg-purple-700 transition shadow-md sm:shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm">
                {isSaving ? (
                  <>
                    <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
                    <span className="hidden xs:inline">Saving...</span>
                    <span className="xs:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline">Update Course</span>
                    <span className="xs:hidden">Update</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Tabs - Horizontal scroll on mobile */}
        <div className="bg-white rounded-lg sm:rounded-xl border border-purple-100 p-1.5 sm:p-2 mb-4 sm:mb-6 overflow-x-auto">
          <div className="flex flex-nowrap sm:flex-wrap gap-1.5 sm:gap-2 min-w-max sm:min-w-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium text-xs sm:text-sm whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}>
                <span className="w-4 h-4 sm:w-5 sm:h-5">{tab.icon}</span>
                <span className="hidden xs:inline">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-purple-100 p-4 sm:p-6 md:p-8">
          {activeTab === "basic" && (
            <div className="space-y-4 sm:space-y-6 md:space-y-8">
              {/* Title */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => {
                    setCourseData({ ...courseData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: "" });
                  }}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl focus:outline-none transition ${
                    errors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-100 focus:border-purple-600"
                  }`}
                  placeholder="e.g., Complete Web Development Bootcamp"
                />
                {errors.title ? (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {errors.title}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Title should be descriptive and catch attention (minimum 10
                    characters)
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  value={courseData.description}
                  onChange={(e) => {
                    setCourseData({
                      ...courseData,
                      description: e.target.value,
                    });
                    if (errors.description)
                      setErrors({ ...errors, description: "" });
                  }}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl focus:outline-none transition ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-100 focus:border-purple-600"
                  }`}
                  placeholder="Describe what students will learn, course requirements, target audience..."
                />
                {errors.description ? (
                  <p className="text-xs sm:text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {errors.description}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 50 characters. Include key learning outcomes and
                    target audience.
                  </p>
                )}
              </div>

              {/* Category and Level */}
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={courseData.category}
                    onChange={(e) => {
                      setCourseData({
                        ...courseData,
                        category: e.target.value,
                      });
                      if (errors.category)
                        setErrors({ ...errors, category: "" });
                    }}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 rounded-lg sm:rounded-xl focus:outline-none transition ${
                      errors.category
                        ? "border-red-500 focus:border-red-500"
                        : "border-purple-100 focus:border-purple-600"
                    }`}>
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-xs sm:text-sm text-red-500 mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Level
                  </label>
                  <select
                    value={courseData.level}
                    onChange={(e) =>
                      setCourseData({ ...courseData, level: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-purple-100 rounded-lg sm:rounded-xl focus:border-purple-600 focus:outline-none">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all">All Levels</option>
                  </select>
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  Course Thumbnail{" "}
                  {!courseData.thumbnail && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 transition ${
                    errors.thumbnail ? "border-red-500" : "border-purple-200"
                  }`}>
                  {thumbnailPreview ? (
                    <div className="relative max-w-2xl mx-auto">
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail"
                        className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl shadow-lg"
                        width={512}
                        height={256}
                        unoptimized={true}
                      />
                      <button
                        onClick={() => {
                          setThumbnailFile(null);
                          setThumbnailPreview(null);
                        }}
                        className="absolute top-2 sm:top-4 right-2 sm:right-4 p-1.5 sm:p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transition">
                        <X className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mb-3 sm:mb-4">
                        <Upload className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
                      </div>
                      <span className="text-purple-600 font-semibold text-base sm:text-lg text-center">
                        Click to upload new thumbnail
                      </span>
                      <span className="text-xs sm:text-sm text-gray-500 mt-2 text-center">
                        or drag and drop
                      </span>
                      <span className="text-xs text-gray-400 mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-50 rounded-full text-center">
                        PNG, JPG, GIF up to 5MB • 1280x720 recommended
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                      />
                    </label>
                  )}
                </div>
                {errors.thumbnail && (
                  <p className="text-xs sm:text-sm text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    {errors.thumbnail}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                  Tags
                </label>
                <div className="flex flex-col xs:flex-row gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-purple-100 rounded-lg sm:rounded-xl focus:border-purple-600 focus:outline-none"
                    placeholder="Add a tag (e.g., JavaScript, React)"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    onClick={addTag}
                    className="w-full xs:w-auto px-4 sm:px-6 py-2 sm:py-3 bg-purple-600 text-white rounded-lg sm:rounded-xl hover:bg-purple-700 transition font-medium text-sm sm:text-base">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {courseData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 bg-purple-50 text-purple-700 rounded-full text-xs sm:text-sm">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-purple-900 ml-0.5">
                        <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                  What students will learn
                </label>
                {courseData.objectives.map((objective, index) => (
                  <div
                    key={index}
                    className="flex flex-col xs:flex-row gap-2 mb-2">
                    <input
                      type="text"
                      value={objective}
                      onChange={(e) => {
                        const newObjectives = [...courseData.objectives];
                        newObjectives[index] = e.target.value;
                        setCourseData({
                          ...courseData,
                          objectives: newObjectives,
                        });
                      }}
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-purple-100 rounded-lg sm:rounded-xl focus:border-purple-600 focus:outline-none"
                      placeholder={`Learning objective ${index + 1}`}
                    />
                    <button
                      onClick={() => {
                        const newObjectives = courseData.objectives.filter(
                          (_, i) => i !== index,
                        );
                        setCourseData({
                          ...courseData,
                          objectives: newObjectives,
                        });
                      }}
                      className="w-full xs:w-auto p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition flex items-center justify-center">
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setCourseData({
                      ...courseData,
                      objectives: [...courseData.objectives, ""],
                    })
                  }
                  className="mt-2 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  Add Learning Objective
                </button>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-4 sm:space-y-6">
              <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 sm:gap-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                    Course Lessons
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Add lessons with titles and descriptions
                  </p>
                </div>
                <button
                  onClick={addLesson}
                  className="w-full xs:w-auto bg-purple-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-purple-700 transition flex items-center justify-center gap-1 sm:gap-2 font-medium text-sm shadow-sm hover:shadow">
                  <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                  Add Lesson
                </button>
              </div>

              {/* Lessons List */}
              <div className="space-y-3 sm:space-y-4">
                {lessons.map((lesson, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-purple-100 rounded-lg sm:rounded-xl p-4 sm:p-5 hover:border-purple-300 transition group">
                    {/* Lesson Header */}
                    <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3 mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 cursor-move" />
                        <span className="text-xs sm:text-sm font-medium text-purple-600 bg-purple-50 px-2 sm:px-3 py-1 rounded-full">
                          Lesson {index + 1}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400 hidden xs:inline">
                        •
                      </span>
                      <span className="text-xs text-gray-500">
                        {lesson.type === "video" ? "Video Lesson" : "Article"}
                      </span>
                    </div>

                    {/* Title Field */}
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Lesson Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => {
                            const newLessons = [...lessons];
                            newLessons[index].title = e.target.value;
                            setLessons(newLessons);
                          }}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border-2 border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition"
                          placeholder="e.g., Introduction to the Course"
                        />
                      </div>

                      {/* Description Field */}
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                          Lesson Description
                        </label>
                        <textarea
                          value={lesson.description || ""}
                          onChange={(e) => {
                            const newLessons = [...lessons];
                            newLessons[index].description = e.target.value;
                            setLessons(newLessons);
                          }}
                          rows={2}
                          className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm border-2 border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-200 transition resize-none"
                          placeholder="Brief description of what this lesson covers..."
                        />
                      </div>

                      {/* Lesson Options */}
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
                        {/* Duration */}
                        <div className="flex items-center gap-1 sm:gap-2">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                          <input
                            type="text"
                            value={lesson.duration}
                            onChange={(e) => {
                              const newLessons = [...lessons];
                              newLessons[index].duration = e.target.value;
                              setLessons(newLessons);
                            }}
                            className="w-16 sm:w-20 px-1.5 sm:px-2 py-1 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none text-xs sm:text-sm"
                            placeholder="10:30"
                          />
                          <span className="text-xs text-gray-400">min</span>
                        </div>

                        {/* Lesson Type */}
                        <select
                          value={lesson.type}
                          onChange={(e) => {
                            const newLessons = [...lessons];
                            newLessons[index].type = e.target.value;
                            setLessons(newLessons);
                          }}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 border border-purple-100 rounded-lg focus:border-purple-600 focus:outline-none text-xs sm:text-sm">
                          <option value="video">Video</option>
                          <option value="article">Article</option>
                          <option value="quiz">Quiz</option>
                          <option value="assignment">Assignment</option>
                        </select>

                        {/* Move Up/Down Buttons */}
                        <div className="flex items-center gap-1 ml-auto">
                          <button
                            onClick={() => moveLesson(index, "up")}
                            disabled={index === 0}
                            className="p-1 sm:p-1.5 text-gray-500 hover:bg-purple-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition"
                            title="Move up">
                            <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => moveLesson(index, "down")}
                            disabled={index === lessons.length - 1}
                            className="p-1 sm:p-1.5 text-gray-500 hover:bg-purple-100 rounded-lg disabled:opacity-30 disabled:hover:bg-transparent transition"
                            title="Move down">
                            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => removeLesson(index)}
                            className="p-1 sm:p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="Delete lesson">
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {lessons.length === 0 && (
                <div className="text-center py-8 sm:py-12 bg-purple-50 rounded-lg sm:rounded-xl border-2 border-dashed border-purple-200">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Video className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                  </div>
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                    No lessons yet
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4 px-4">
                    Start adding lessons to build your course content
                  </p>
                  <button
                    onClick={addLesson}
                    className="inline-flex items-center gap-1 sm:gap-2 bg-purple-600 text-white px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg sm:rounded-xl hover:bg-purple-700 transition font-medium text-sm">
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                    Add Your First Lesson
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="max-w-2xl space-y-6 sm:space-y-8">
              {/* Price Type */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-3 sm:mb-4">
                  Course Type
                </label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <label
                    className={`p-4 sm:p-6 border-2 rounded-lg sm:rounded-xl cursor-pointer transition ${
                      !courseData.isFree
                        ? "border-purple-600 bg-purple-50"
                        : "border-purple-100 hover:border-purple-300"
                    }`}>
                    <input
                      type="radio"
                      checked={!courseData.isFree}
                      onChange={() =>
                        setCourseData({
                          ...courseData,
                          isFree: false,
                          price: 49.99,
                        })
                      }
                      className="sr-only"
                    />
                    <DollarSign
                      className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 ${
                        !courseData.isFree ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-semibold text-xs sm:text-base text-center ${
                        !courseData.isFree ? "text-purple-600" : "text-gray-600"
                      }`}>
                      Paid Course
                    </p>
                  </label>

                  <label
                    className={`p-4 sm:p-6 border-2 rounded-lg sm:rounded-xl cursor-pointer transition ${
                      courseData.isFree
                        ? "border-purple-600 bg-purple-50"
                        : "border-purple-100 hover:border-purple-300"
                    }`}>
                    <input
                      type="radio"
                      checked={courseData.isFree}
                      onChange={() =>
                        setCourseData({ ...courseData, isFree: true, price: 0 })
                      }
                      className="sr-only"
                    />
                    <Tag
                      className={`w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-1 sm:mb-2 ${
                        courseData.isFree ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-semibold text-xs sm:text-base text-center ${
                        courseData.isFree ? "text-purple-600" : "text-gray-600"
                      }`}>
                      Free Course
                    </p>
                  </label>
                </div>
              </div>

              {/* Price Input */}
              {!courseData.isFree && (
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative max-w-xs">
                    <DollarSign className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <input
                      type="number"
                      value={courseData.price}
                      onChange={(e) =>
                        setCourseData({
                          ...courseData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full pl-8 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-purple-100 rounded-lg sm:rounded-xl focus:border-purple-600 focus:outline-none"
                      placeholder="49.99"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {/* Pricing Tips */}
              <div className="bg-linear-to-br from-purple-50 to-white p-4 sm:p-6 rounded-lg sm:rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
                  <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  Pricing Tips
                </h4>
                <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  <li className="flex items-start gap-1 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>
                      Courses with video content typically sell better at $49-99
                    </span>
                  </li>
                  <li className="flex items-start gap-1 sm:gap-2">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
                    <span>
                      Free courses can help build your audience and get reviews
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

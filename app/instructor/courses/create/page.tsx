"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Upload,
  X,
  Plus,
  Trash2,
  GripVertical,
  FileText,
  Video,
  DollarSign,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Tag,
  Globe,
  BookOpen,
  Target,
  Layers,
} from "lucide-react";
import { createCurse } from "@/actions/instructor";
import { useAppDispatch, useAppSelector } from "@/hooks/useDispatch";
import { toast } from "sonner";
import Image from "next/image";
import { updateUser } from "@/features/auth/authSlice";

export default function CreateCourse() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const user = useAppSelector((state) => state.auth.user);
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    language: "english",
    price: 49.99,
    isFree: false,
    status: "draft",
    tags: [] as string[],
    prerequisites: ["", "", ""],
    objectives: ["", "", "", ""],
    thumbnail: null as File | null,
  });

  const [lessons, setLessons] = useState([
    {
      id: 1,
      title: "Introduction to the Course",
      duration: "10:30",
      isPreview: true,
      type: "video",
      order: 1,
    },
    {
      id: 2,
      title: "Setting Up Development Environment",
      duration: "15:45",
      isPreview: false,
      type: "video",
      order: 2,
    },
    {
      id: 3,
      title: "Course Resources and Materials",
      duration: "5:20",
      isPreview: true,
      type: "article",
      order: 3,
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

    if (!thumbnailFile) {
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
        alert("Please upload an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB");
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
      formData.append("level", courseData.level);
      formData.append("language", courseData.language);
      formData.append("price", courseData.price.toString());
      formData.append("isFree", courseData.isFree.toString());
      formData.append("status", publishStatus || courseData.status);
      formData.append("tags", JSON.stringify(courseData.tags));
      formData.append(
        "prerequisites",
        JSON.stringify(courseData.prerequisites),
      );
      formData.append("objectives", JSON.stringify(courseData.objectives));
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }
      const { data } = await createCurse(user._id, formData);
      if (data.success) {
        router.push(`/instructor/courses`);
        toast.success("Course created successfully");
        dispatch(
          updateUser({
            createdCourses: [...user.createdCourses, data.data],
          }),
        );
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setError("An error occurred while saving the course. Please try again.");
    } finally {
      setIsSaving(false);
    }
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
    { id: "settings", name: "Settings", icon: <Target className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white border-b border-purple-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <Link
                href="/instructor/courses"
                className="p-2 hover:bg-purple-50 rounded-xl transition">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Create New Course
                </h1>
                <p className="text-sm text-gray-500">
                  Fill in the details to create your course
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave("draft")}
                disabled={isSaving}
                className="px-6 py-2.5 border border-purple-200 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition disabled:opacity-50">
                Save Draft
              </button>
              <button
                onClick={() => handleSave("pending")}
                disabled={isSaving}
                className="bg-purple-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-purple-700 transition shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center gap-2">
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Submit for Review
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl border border-purple-100 p-2 mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                }`}>
                {tab.icon}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-2xl border border-purple-100 p-6 md:p-8">
          {activeTab === "basic" && (
            <div className="space-y-8">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={courseData.title}
                  onChange={(e) => {
                    setCourseData({ ...courseData, title: e.target.value });
                    if (errors.title) setErrors({ ...errors, title: "" });
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.title
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-100 focus:border-purple-600"
                  }`}
                  placeholder="e.g., Complete Web Development Bootcamp"
                />
                {errors.title ? (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.title}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Title should be descriptive and catch attention (minimum 10
                    characters)
                  </p>
                )}
              </div>
              <p className="text-sm text-red-600">{error}</p>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={6}
                  value={courseData.description}
                  onChange={(e) => {
                    setCourseData({
                      ...courseData,
                      description: e.target.value,
                    });
                    if (errors.description)
                      setErrors({ ...errors, description: "" });
                  }}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
                    errors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-purple-100 focus:border-purple-600"
                  }`}
                  placeholder="Describe what students will learn, course requirements, target audience..."
                />
                {errors.description ? (
                  <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.description}
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Minimum 50 characters. Include key learning outcomes and
                    target audience.
                  </p>
                )}
              </div>

              {/* Category */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition ${
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
                    <p className="text-sm text-red-500 mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Level
                  </label>
                  <select
                    value={courseData.level}
                    onChange={(e) =>
                      setCourseData({ ...courseData, level: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none">
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                    <option value="all">All Levels</option>
                  </select>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Course Language
                </label>
                <select
                  value={courseData.language}
                  onChange={(e) =>
                    setCourseData({ ...courseData, language: e.target.value })
                  }
                  className="w-full md:w-96 px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none">
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Course Thumbnail <span className="text-red-500">*</span>
                </label>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 transition ${
                    errors.thumbnail ? "border-red-500" : "border-purple-200"
                  }`}>
                  {thumbnailPreview ? (
                    <div className="relative max-w-2xl mx-auto">
                      <Image
                        src={thumbnailPreview}
                        alt="Thumbnail"
                        className="w-full h-64 object-cover rounded-xl shadow-lg"
                        width={512}
                        height={256}
                      />
                      <button
                        onClick={() => {
                          setThumbnailFile(null);
                          setThumbnailPreview(null);
                        }}
                        className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 shadow-lg transition">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center cursor-pointer">
                      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                        <Upload className="w-10 h-10 text-purple-600" />
                      </div>
                      <span className="text-purple-600 font-semibold text-lg">
                        Click to upload
                      </span>
                      <span className="text-sm text-gray-500 mt-2">
                        or drag and drop
                      </span>
                      <span className="text-xs text-gray-400 mt-4 px-4 py-2 bg-gray-50 rounded-full">
                        PNG, JPG, GIF up to 5MB • Recommended size: 1280x720
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
                  <p className="text-sm text-red-500 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.thumbnail}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Tag className="w-4 h-4 inline mr-1" />
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="flex-1 px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                    placeholder="Add a tag (e.g., JavaScript, React)"
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTag())
                    }
                  />
                  <button
                    onClick={addTag}
                    className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition font-medium">
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {courseData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm">
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="hover:text-purple-900 ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  What students will learn
                </label>
                {courseData.objectives.map((objective, index) => (
                  <div key={index} className="flex gap-2 mb-2">
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
                      className="flex-1 px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
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
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition">
                      <Trash2 className="w-5 h-5" />
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
                  className="mt-2 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Learning Objective
                </button>
              </div>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6">
              {/* Lessons Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Course Lessons
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Organize your course content into lessons
                  </p>
                </div>
                <button className="bg-purple-600 text-white px-4 py-2.5 rounded-xl hover:bg-purple-700 transition flex items-center gap-2 font-medium">
                  <Plus className="w-4 h-4" />
                  Add Lesson
                </button>
              </div>

              {/* Lessons List */}
              <div className="space-y-3">
                {lessons.map((lesson, index) => (
                  <div
                    key={lesson.id}
                    className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl border border-purple-100 group">
                    <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {lesson.type === "video" ? (
                          <Video className="w-4 h-4 text-purple-600" />
                        ) : (
                          <FileText className="w-4 h-4 text-purple-600" />
                        )}
                        <input
                          type="text"
                          value={lesson.title}
                          onChange={(e) => {
                            const newLessons = [...lessons];
                            newLessons[index].title = e.target.value;
                            setLessons(newLessons);
                          }}
                          className="bg-transparent border-b border-transparent hover:border-purple-300 focus:border-purple-600 focus:outline-none px-2 py-1 flex-1 font-medium"
                          placeholder="Lesson title"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <input
                          type="text"
                          value={lesson.duration}
                          onChange={(e) => {
                            const newLessons = [...lessons];
                            newLessons[index].duration = e.target.value;
                            setLessons(newLessons);
                          }}
                          className="w-16 bg-transparent border-b border-transparent hover:border-purple-300 focus:border-purple-600 focus:outline-none px-1"
                          placeholder="10:30"
                        />
                      </div>

                      <label className="flex items-center gap-1 text-sm">
                        <input
                          type="checkbox"
                          checked={lesson.isPreview}
                          onChange={(e) => {
                            const newLessons = [...lessons];
                            newLessons[index].isPreview = e.target.checked;
                            setLessons(newLessons);
                          }}
                          className="rounded text-purple-600"
                        />
                        Preview
                      </label>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => moveLesson(index, "up")}
                          disabled={index === 0}
                          className="p-1 hover:bg-purple-200 rounded disabled:opacity-30 transition">
                          <ChevronDown className="w-4 h-4 rotate-180" />
                        </button>
                        <button
                          onClick={() => moveLesson(index, "down")}
                          disabled={index === lessons.length - 1}
                          className="p-1 hover:bg-purple-200 rounded disabled:opacity-30 transition">
                          <ChevronDown className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-red-200 rounded transition">
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pricing" && (
            <div className="max-w-2xl space-y-8">
              {/* Price Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Course Type
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label
                    className={`p-6 border-2 rounded-xl cursor-pointer transition ${
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
                      className={`w-8 h-8 mx-auto mb-2 ${
                        !courseData.isFree ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-semibold text-center ${
                        !courseData.isFree ? "text-purple-600" : "text-gray-600"
                      }`}>
                      Paid Course
                    </p>
                  </label>

                  <label
                    className={`p-6 border-2 rounded-xl cursor-pointer transition ${
                      courseData.isFree
                        ? "border-purple-600 bg-purple-50"
                        : "border-purple-100 hover:border-purple-300"
                    }`}>
                    <input
                      type="radio"
                      checked={courseData.isFree}
                      onChange={() =>
                        setCourseData({
                          ...courseData,
                          isFree: true,
                          price: 0,
                        })
                      }
                      className="sr-only"
                    />
                    <Tag
                      className={`w-8 h-8 mx-auto mb-2 ${
                        courseData.isFree ? "text-purple-600" : "text-gray-400"
                      }`}
                    />
                    <p
                      className={`font-semibold text-center ${
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative max-w-xs">
                    <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="number"
                      value={courseData.price}
                      onChange={(e) =>
                        setCourseData({
                          ...courseData,
                          price: parseFloat(e.target.value),
                        })
                      }
                      className="w-full pl-12 pr-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                      placeholder="49.99"
                      min="0"
                      step="0.01"
                    />
                  </div>
                </div>
              )}

              {/* Pricing Tips */}
              <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-purple-600" />
                  Pricing Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Courses with video content typically sell better at $49-99
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Free courses can help build your audience and get reviews
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="max-w-2xl space-y-8">
              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Globe className="w-4 h-4 inline mr-1" />
                  Course Language
                </label>
                <select
                  value={courseData.language}
                  onChange={(e) =>
                    setCourseData({ ...courseData, language: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none">
                  <option value="english">English</option>
                  <option value="spanish">Spanish</option>
                  <option value="french">French</option>
                  <option value="german">German</option>
                  <option value="chinese">Chinese</option>
                </select>
              </div>

              {/* Prerequisites */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Prerequisites (Optional)
                </label>
                {courseData.prerequisites.map((prereq, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={prereq}
                      onChange={(e) => {
                        const newPrereqs = [...courseData.prerequisites];
                        newPrereqs[index] = e.target.value;
                        setCourseData({
                          ...courseData,
                          prerequisites: newPrereqs,
                        });
                      }}
                      className="flex-1 px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                      placeholder={`e.g., Basic JavaScript knowledge`}
                    />
                    <button
                      onClick={() => {
                        const newPrereqs = courseData.prerequisites.filter(
                          (_, i) => i !== index,
                        );
                        setCourseData({
                          ...courseData,
                          prerequisites: newPrereqs,
                        });
                      }}
                      className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() =>
                    setCourseData({
                      ...courseData,
                      prerequisites: [...courseData.prerequisites, ""],
                    })
                  }
                  className="mt-2 text-purple-600 hover:text-purple-700 font-medium flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Prerequisite
                </button>
              </div>

              {/* Publishing Options */}
              <div className="border-t border-purple-100 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Publishing Options
                </h3>

                <div className="space-y-4">
                  <label className="flex items-start gap-3 p-4 border-2 border-purple-100 rounded-xl hover:border-purple-300 cursor-pointer transition">
                    <input
                      type="radio"
                      name="publish"
                      value="draft"
                      checked={courseData.status === "draft"}
                      onChange={() =>
                        setCourseData({ ...courseData, status: "draft" })
                      }
                      className="mt-1"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Save as Draft
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Work on your course privately. Only you can see it.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-purple-100 rounded-xl hover:border-purple-300 cursor-pointer transition">
                    <input
                      type="radio"
                      name="publish"
                      value="pending"
                      checked={courseData.status === "pending"}
                      onChange={() =>
                        setCourseData({ ...courseData, status: "pending" })
                      }
                      className="mt-1"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Submit for Review
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Submit for admin approval. Review takes 24-48 hours.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border-2 border-purple-100 rounded-xl hover:border-purple-300 cursor-pointer transition">
                    <input
                      type="radio"
                      name="publish"
                      value="published"
                      checked={courseData.status === "published"}
                      onChange={() =>
                        setCourseData({ ...courseData, status: "published" })
                      }
                      className="mt-1"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">
                        Publish Immediately
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        Make your course live right away for students to enroll.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

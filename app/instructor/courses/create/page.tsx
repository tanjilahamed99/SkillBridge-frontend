"use client";

import { use, useState } from "react";
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
  PlayCircle,
  FileText,
  Link as LinkIcon,
  Image,
  Video,
  DollarSign,
  Tag,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  Eye,
} from "lucide-react";
import { createCurse } from "@/actions/instructor";
import { useAppSelector } from "@/hooks/useDispatch";

export default function CreateCourse() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [isSaving, setIsSaving] = useState(false);
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

          
          console.log(thumbnail)
          
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    category: "",
    level: "beginner",
    language: "english",
    price: 0,
    isFree: false,
    isPublished: false,
    thumbnail: thumbnail,
    tags: [] as string[],
    prerequisites: ["", "", ""],
    objectives: ["", "", "", ""],
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
    {
      id: 4,
      title: "First Project Overview",
      duration: "20:15",
      isPreview: false,
      type: "video",
      order: 4,
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

  const handleSave = async () => {
    console.log(courseData);

    //     setIsSaving(true);
    try {
      const response = await createCurse(user._id, courseData);
      console.log("Course created:", response.data);
      //       setIsSaving(false);
      //       router.push("/instructor/courses");
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnail(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const tabs = [
    { id: "basic", name: "Basic Info" },
    { id: "content", name: "Course Content" },
    { id: "pricing", name: "Pricing" },
    { id: "settings", name: "Settings" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link
            href="/instructor/courses"
            className="p-2 hover:bg-purple-50 rounded-xl transition">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Create New Course
            </h1>
            <p className="text-gray-600 mt-1">
              Fill in the details to create your course
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => router.push("/instructor/courses/preview")}
            className="px-6 py-3 border border-purple-200 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition shadow-lg shadow-purple-200 disabled:opacity-50 flex items-center gap-2">
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Save Course
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-purple-100">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 px-2 font-medium transition relative ${
                activeTab === tab.id
                  ? "text-purple-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}>
              {tab.name}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl border border-purple-100 p-6">
        {activeTab === "basic" && (
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={courseData.title}
                onChange={(e) =>
                  setCourseData({ ...courseData, title: e.target.value })
                }
                className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                placeholder="e.g., Complete Web Development Bootcamp"
              />
              <p className="text-xs text-gray-500 mt-1">
                Title should be descriptive and catch attention
              </p>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={6}
                value={courseData.description}
                onChange={(e) =>
                  setCourseData({ ...courseData, description: e.target.value })
                }
                className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                placeholder="Describe what students will learn, course requirements, target audience..."
              />
            </div>

            {/* Category & Level */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={courseData.category}
                  onChange={(e) =>
                    setCourseData({ ...courseData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Level
                </label>
                <select
                  value={courseData.level}
                  onChange={(e) =>
                    setCourseData({ ...courseData, level: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none">
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="all">All Levels</option>
                </select>
              </div>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Thumbnail <span className="text-red-500">*</span>
              </label>
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-6">
                {thumbnail ? (
                  <div className="relative">
                    <img
                      src={thumbnail}
                      alt="Thumbnail"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      onClick={() => setThumbnail(null)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer">
                    <Upload className="w-12 h-12 text-purple-400 mb-3" />
                    <span className="text-purple-600 font-medium">
                      Click to upload
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      or drag and drop
                    </span>
                    <span className="text-xs text-gray-400 mt-2">
                      PNG, JPG, GIF up to 2MB
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
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-1 px-4 py-2 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === "Enter" && addTag()}
                />
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {courseData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full">
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="hover:text-purple-900">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* What students will learn */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="flex-1 px-4 py-2 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
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
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl">
                    <Trash2 className="w-4 h-4" />
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
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
                <Plus className="w-4 h-4" />
                Add Objective
              </button>
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-6">
            {/* Lessons Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Course Lessons
              </h3>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Lesson
              </button>
            </div>

            {/* Lessons List */}
            <div className="space-y-3">
              {lessons.map((lesson, index) => (
                <div
                  key={lesson.id}
                  className="flex items-center gap-3 p-4 bg-purple-50 rounded-xl group">
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
                        className="bg-transparent border-b border-transparent hover:border-purple-300 focus:border-purple-600 focus:outline-none px-2 py-1 flex-1"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">
                      {lesson.duration}
                    </span>

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

                    <button
                      onClick={() => moveLesson(index, "up")}
                      disabled={index === 0}
                      className="p-1 hover:bg-purple-200 rounded disabled:opacity-30">
                      <ChevronDown className="w-4 h-4 rotate-180" />
                    </button>
                    <button
                      onClick={() => moveLesson(index, "down")}
                      disabled={index === lessons.length - 1}
                      className="p-1 hover:bg-purple-200 rounded disabled:opacity-30">
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-red-200 rounded">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div className="max-w-md space-y-6">
            {/* Price Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
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
                    className="mr-2"
                  />
                  Paid
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    checked={courseData.isFree}
                    onChange={() =>
                      setCourseData({ ...courseData, isFree: true, price: 0 })
                    }
                    className="mr-2"
                  />
                  Free
                </label>
              </div>
            </div>

            {/* Price */}
            {!courseData.isFree && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price ($) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="number"
                    value={courseData.price}
                    onChange={(e) =>
                      setCourseData({
                        ...courseData,
                        price: parseFloat(e.target.value),
                      })
                    }
                    className="w-full pl-10 pr-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                    placeholder="49.99"
                    min="0"
                    step="0.01"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Set a competitive price for your course
                </p>
              </div>
            )}

            {/* Pricing Tips */}
            <div className="bg-purple-50 p-4 rounded-xl">
              <h4 className="font-medium text-gray-900 mb-2">Pricing Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • Courses with video content typically sell better at $49-99
                </li>
                <li>• Free courses can help build your audience</li>
                <li>• Consider promotional pricing for launch</li>
                <li>• Update prices based on demand and updates</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-6">
            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Language
              </label>
              <select
                value={courseData.language}
                onChange={(e) =>
                  setCourseData({ ...courseData, language: e.target.value })
                }
                className="w-full md:w-96 px-4 py-3 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none">
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
            </div>

            {/* Prerequisites */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className="flex-1 px-4 py-2 border border-purple-100 rounded-xl focus:border-purple-600 focus:outline-none"
                    placeholder={`Prerequisite ${index + 1}`}
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
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl">
                    <Trash2 className="w-4 h-4" />
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
                className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center gap-1">
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
                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="publish"
                    value="draft"
                    defaultChecked
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Save as Draft
                    </span>
                    <p className="text-sm text-gray-500">
                      Work on your course privately before publishing
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="publish"
                    value="submit"
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Submit for Review
                    </span>
                    <p className="text-sm text-gray-500">
                      Submit your course for admin approval before publishing
                    </p>
                  </div>
                </label>

                <label className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="publish"
                    value="publish"
                    className="mt-1"
                  />
                  <div>
                    <span className="font-medium text-gray-900">
                      Publish Immediately
                    </span>
                    <p className="text-sm text-gray-500">
                      Make your course live right away
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

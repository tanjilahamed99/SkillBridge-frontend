import { ArrowRight, Brain, Code, Palette, Star } from "lucide-react";
import Link from "next/link";
import React from "react";

const Popular = () => {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-16">
          <div>
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Start Learning
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
              Popular Courses
            </h2>
          </div>
          <Link
            href="/courses"
            className="group flex items-center text-purple-600 font-semibold text-lg mt-4 sm:mt-0">
            View All Courses
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Complete Web Development",
              category: "Development",
              lessons: 48,
              students: 3245,
              price: 49.99,
              icon: <Code className="w-8 h-8" />,
              color: "from-blue-500 to-purple-600",
            },
            {
              title: "UI/UX Design Masterclass",
              category: "Design",
              lessons: 42,
              students: 2189,
              price: 44.99,
              icon: <Palette className="w-8 h-8" />,
              color: "from-purple-500 to-pink-600",
            },
            {
              title: "Data Science & AI",
              category: "Data Science",
              lessons: 56,
              students: 1876,
              price: 59.99,
              icon: <Brain className="w-8 h-8" />,
              color: "from-green-500 to-purple-600",
            },
          ].map((course, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-purple-100">
              <div
                className={`h-56 bg-linear-to-r ${course.color} p-8 relative overflow-hidden`}>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-purple-600 shadow-lg">
                  Best Seller
                </div>
                <div className="text-white transform group-hover:scale-110 transition duration-500">
                  {course.icon}
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    {course.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {course.lessons} lessons
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">4.9</span>
                  </div>
                  <span className="text-gray-500">
                    {course.students.toLocaleString()} students
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900">
                    ${course.price}
                  </span>
                  <button className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition shadow-lg shadow-purple-200 group-hover:shadow-purple-300">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Popular;

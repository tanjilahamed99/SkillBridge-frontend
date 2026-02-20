import { GraduationCap, PlayCircle, Rocket, Sparkles, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-purple-50 via-white to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              Join 50,000+ learners worldwide
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Master Your
              <span className="text-purple-600 block">Future Today</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mt-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Transform your career with industry-leading courses, expert
              mentorship, and a community that supports your growth every step
              of the way.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-10">
              <Link
                href="/signup"
                className="bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-700 transition shadow-xl shadow-purple-200 hover:shadow-purple-300 inline-flex items-center justify-center group text-lg">
                Start Learning Now
                <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/demo"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition border-2 border-purple-200 inline-flex items-center justify-center group text-lg">
                <PlayCircle className="mr-2 w-5 h-5 group-hover:scale-110 transition" />
                Watch Demo
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-8 mt-12 justify-center lg:justify-start">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-linear-to-br from-purple-400 to-purple-600 border-2 border-white shadow-lg"
                    />
                  ))}
                </div>
                <span className="ml-4 text-gray-600">
                  <span className="font-bold text-gray-900">50K+</span> active
                  learners
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  <span className="font-bold text-gray-900">4.9</span> (12.5k
                  reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Cards */}
          <div className="relative hidden lg:block">
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
              {/* Featured Course Card */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-gray-900">
                    Featured Course
                  </h3>
                  <span className="text-xs text-purple-600 bg-purple-50 px-3 py-1 rounded-full font-medium">
                    New
                  </span>
                </div>

                <div className="bg-linear-to-r from-purple-500 to-purple-700 h-48 rounded-2xl relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-xl">UI/UX Masterclass</p>
                    <p className="text-sm text-purple-100">
                      12 weeks • 42 lessons
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Your progress</span>
                    <span className="font-bold text-purple-600">68%</span>
                  </div>
                  <div className="h-2 bg-purple-100 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full"></div>
                  </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <GraduationCap className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-sm text-gray-600">Graduates</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl">
                    <TrendingUp className="w-6 h-6 text-purple-600 mb-2" />
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                    <p className="text-sm text-gray-600">Success rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

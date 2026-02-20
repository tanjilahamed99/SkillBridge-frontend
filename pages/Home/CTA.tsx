import { Link, Rocket } from "lucide-react";
import React from "react";

const CTA = () => {
  return (
    <section className="bg-gray-900 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-transparent"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Join thousands of students who have already transformed their careers
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-purple-600 text-white px-10 py-5 rounded-xl font-semibold hover:bg-purple-700 transition shadow-xl shadow-purple-900/30 inline-flex items-center justify-center group text-lg">
            Get Started Free
            <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
          </Link>
          <Link
            href="/courses"
            className="bg-transparent text-white px-10 py-5 rounded-xl font-semibold hover:bg-white/10 transition border-2 border-gray-700 inline-flex items-center justify-center text-lg">
            Browse Courses
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-6">
          No credit card required • 7-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CTA;

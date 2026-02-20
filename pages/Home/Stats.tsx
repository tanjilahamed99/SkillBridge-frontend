import { Award, BookOpen, Target, Users } from "lucide-react";
import React from "react";

const Stats = () => {
  return (
    <section className="bg-linear-to-r from-purple-600 to-purple-800 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/api/placeholder/400/400')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            {
              number: "50K+",
              label: "Active Students",
              icon: <Users className="w-8 h-8 mx-auto mb-4" />,
            },
            {
              number: "500+",
              label: "Expert Instructors",
              icon: <Award className="w-8 h-8 mx-auto mb-4" />,
            },
            {
              number: "1000+",
              label: "Online Courses",
              icon: <BookOpen className="w-8 h-8 mx-auto mb-4" />,
            },
            {
              number: "95%",
              label: "Success Rate",
              icon: <Target className="w-8 h-8 mx-auto mb-4" />,
            },
          ].map((stat, index) => (
            <div key={index} className="text-white">
              <div className="text-purple-100">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {stat.number}
              </div>
              <div className="text-purple-200 text-lg">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

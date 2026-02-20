import { Award, BookOpen, Clock, Users } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-6">
            Everything You Need to
            <br />
            Excel in Your Career
          </h2>
          <p className="text-lg text-gray-600">
            We provide cutting-edge tools and resources to accelerate your
            learning journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Expert-Led Courses",
              desc: "Learn from industry professionals with 10+ years experience",
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community",
              desc: "Join a network of 50,000+ motivated learners",
            },
            {
              icon: <Award className="w-8 h-8" />,
              title: "Certification",
              desc: "Earn recognized certificates upon completion",
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Flexible Learning",
              desc: "Self-paced with lifetime access to all materials",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-all group-hover:scale-110">
                <div className="text-purple-600 group-hover:text-white transition">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

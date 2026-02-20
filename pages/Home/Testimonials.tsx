import { MessageCircle, Star } from "lucide-react";
import React from "react";

const Testimonials = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">
            What Our Students Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Web Developer",
              company: "Google",
              quote:
                "This platform transformed my career. I went from zero to landing my dream job in 6 months.",
            },
            {
              name: "Michael Chen",
              role: "Data Scientist",
              company: "Microsoft",
              quote:
                "The quality of instruction is outstanding. Worth every penny and every minute invested.",
            },
            {
              name: "Emily Rodriguez",
              role: "UX Designer",
              company: "Apple",
              quote:
                "The community support and mentorship program made all the difference in my journey.",
            },
          ].map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-linear-to-br from-purple-400 to-purple-600 rounded-full border-4 border-purple-200"></div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900 text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-purple-600">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-lg italic">
                {testimonial.quote}
              </p>
              <MessageCircle className="w-6 h-6 text-purple-300 mt-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

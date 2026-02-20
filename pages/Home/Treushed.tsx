import React from "react";

const Treushed = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-500 uppercase tracking-wider mb-10">
          Trusted by leading companies worldwide
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center justify-items-center opacity-60">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-8 w-24 bg-linear-to-r from-gray-300 to-gray-400 rounded"></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Treushed;

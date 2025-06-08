import React from 'react';

const learningItems = [
  "Advanced React patterns",
  "System Design",
  "Database optimization",
  "Cloud services (e.g., AWS, Azure, or GCP)"
];

const Learning = () => {
  return (
    <section id="learning" className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-400">🌱 Currently Learning</h2>
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-xl">
          <ul className="space-y-4">
            {learningItems.map((item, index) => (
              <li key={index} className="flex items-center text-lg text-gray-300">
                <span className="text-teal-400 mr-3">●</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Learning;
import React from "react";

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg leading-relaxed mb-4">
          Welcome to BlogO, a space where passion meets creativity! We are a
          team of enthusiastic writers and storytellers dedicated to sharing
          insightful and engaging content across various topics.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          Our mission is to provide a platform that inspires, informs, and
          entertains our readers. We believe in the power of words and the
          importance of community, which is why we invite you to be part of our
          journey.
        </p>
        <p className="text-lg leading-relaxed mb-4">
          At BlogO, we value your feedback and encourage interaction. Whether
          you have suggestions, questions, or simply want to share your
          thoughts, we’d love to hear from you!
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Our Values</h2>
        <ul className="list-disc list-inside mb-4">
          <li>Integrity: We uphold honesty and transparency in our content.</li>
          <li>Creativity: We celebrate originality and unique perspectives.</li>
          <li>Community: We foster a welcoming environment for all voices.</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-6 mb-2">Join Us</h2>
        <p className="text-lg leading-relaxed">
          Thank you for visiting BlogO. Together, let’s explore, learn, and grow
          through the power of storytelling!
        </p>
      </div>
    </div>
  );
};

export default About;

import React from "react";

const Card = ({ title, thumbnail, onClick }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform transform hover:scale-105"
      onClick={onClick}
    >
      <img src={thumbnail} alt={title} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          {title}
        </h2>
      </div>
    </div>
  );
};

export default Card;

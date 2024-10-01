// components/ConfirmationDialog.jsx
import React from "react";

const ConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6">
        <h2 className="text-lg font-bold mb-4">Are you sure?</h2>
        <p className="text-gray-700 mb-6">
          Do you really want to delete this post? This action cannot be undone.
        </p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 font-semibold px-4 py-2 rounded-md mr-2 hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;

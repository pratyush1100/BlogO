const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <svg
        className="animate-spin h-16 w-16 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;

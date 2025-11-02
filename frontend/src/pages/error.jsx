// error.jsx
import * as React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      {/* Big 404 number */}
      <h1 className="text-7xl md:text-9xl font-extrabold text-primary mb-4">
        404
      </h1>

      {/* Message */}
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/80 transition-all"
        >
          Go Home
        </button>
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;

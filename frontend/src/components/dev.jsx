import React from "react";

const Dev = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">🚧 Page Under Development</h1>
        <p className="text-lg mb-6">
          We’re working hard to bring this page to life. Check back soon!
        </p>
        <div className="animate-bounce text-4xl">🔧</div>
      </div>
    </div>
  );
};

export default Dev;

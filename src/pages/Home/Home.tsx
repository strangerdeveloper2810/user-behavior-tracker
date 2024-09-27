import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-gray-800 dark:text-gray-100">
        Welcome to User Behavior App
      </h1>
      <Link
        to="/dashboard"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    toast.success("Navigating to Dashboard...");
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl text-gray-800 dark:text-gray-100 text-center">
        Welcome to User Behavior App
      </h1>
      <button
        onClick={handleGoToDashboard}
        className="mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Home;

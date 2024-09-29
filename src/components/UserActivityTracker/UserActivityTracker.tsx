import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { throttle } from "lodash";

interface UserAction {
  clicks: { timestamp: number }[];
  mouseMoves: { timestamp: number }[];
  formSubmissions: { timestamp: number }[];
  timeOnPage: number;
  navigation: { timestamp: number; path: string }[]; // Add navigation tracking
}

const UserActivityTracker: React.FC = () => {
  const [userAction, setUserAction] = useState<UserAction>({
    clicks: [],
    mouseMoves: [],
    formSubmissions: [],
    timeOnPage: 0,
    navigation: [],
  });

  const location = useLocation();

  useEffect(() => {
    const savedData = localStorage.getItem("userAction");
    if (savedData) {
      setUserAction(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    const startTime = Date.now();

    const interval = setInterval(() => {
      const currentTime = Date.now();
      const timeSpent = (currentTime - startTime) / 1000;
      setUserAction((prev) => {
        const updatedActions = { ...prev, timeOnPage: timeSpent };
        localStorage.setItem("userAction", JSON.stringify(updatedActions));
        return updatedActions;
      });
    }, 1000);

    const handleClick = throttle(() => {
      const timestamp = Date.now();
      setUserAction((prev) => {
        const updatedActions = {
          ...prev,
          clicks: [...prev.clicks, { timestamp }],
        };
        localStorage.setItem("userAction", JSON.stringify(updatedActions));
        return updatedActions;
      });
      toast.info("You clicked on the page!");
    }, 1000);

    const handleMouseMove = throttle(() => {
      const timestamp = Date.now();
      setUserAction((prev) => {
        const updatedActions = {
          ...prev,
          mouseMoves: [...prev.mouseMoves, { timestamp }],
        };
        localStorage.setItem("userAction", JSON.stringify(updatedActions));
        return updatedActions;
      });

      if (userAction.mouseMoves.length === 0) {
        toast.info("Mouse moved for the first time!");
      }
    }, 1000);

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    // Track page navigation
    setUserAction((prev) => {
      const updatedActions = {
        ...prev,
        navigation: [
          ...prev.navigation,
          { timestamp: Date.now(), path: location.pathname },
        ],
      };
      localStorage.setItem("userAction", JSON.stringify(updatedActions));
      return updatedActions;
    });

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval);
    };
  }, [location.pathname]); // Run effect when location changes

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const timestamp = Date.now();
    setUserAction((prev) => {
      const updatedActions = {
        ...prev,
        formSubmissions: [...prev.formSubmissions, { timestamp }],
      };
      localStorage.setItem("userAction", JSON.stringify(updatedActions));
      return updatedActions;
    });

    toast.success("Form submitted successfully!");

    // Send data to server using Axios
    try {
      await axios.post("https://example.com/api/userActions", userAction);
      toast.success("User actions sent to the server successfully!");
    } catch (error) {
      toast.error("Failed to send data to the server.");
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        User Actions Summary
      </h3>
      <ul className="mt-4 space-y-2">
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Total Clicks:{" "}
          <span className="font-semibold">{userAction.clicks.length}</span>
        </li>
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Total Mouse Moves:{" "}
          <span className="font-semibold">{userAction.mouseMoves.length}</span>
        </li>
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Time on Page:{" "}
          <span className="font-semibold">
            {userAction.timeOnPage.toFixed(2)}
          </span>{" "}
          seconds
        </li>
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Total Form Submissions:{" "}
          <span className="font-semibold">
            {userAction.formSubmissions.length}
          </span>
        </li>
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Total Navigations:{" "}
          <span className="font-semibold">{userAction.navigation.length}</span>
        </li>
      </ul>

      <form onSubmit={handleFormSubmit} className="mt-6">
        <label className="block mb-2 text-lg text-gray-700 dark:text-gray-300">
          Sample Form:
        </label>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          placeholder="Enter your name"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserActivityTracker;

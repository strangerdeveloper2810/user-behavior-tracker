import React from "react";
import UserActivityChart from "../../components/UserActivityChart";
import UserActivityTracker from "../../components/UserActivityTracker";

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        User Behavior Dashboard
      </h2>
      <UserActivityChart />
      <UserActivityTracker />
    </div>
  );
};

export default Dashboard;

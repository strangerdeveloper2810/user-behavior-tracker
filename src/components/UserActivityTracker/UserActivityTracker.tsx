import React, { useEffect, useState } from "react";

interface UserAction {
  clicks: number;
  mouseMoves: number;
  timeOnPage: number;
}

const UserActivityTracker: React.FC = () => {
  const [userAction, setUserAction] = useState<UserAction>({
    clicks: 0,
    mouseMoves: 0,
    timeOnPage: 0,
  });

  useEffect(() => {
    const startTime = Date.now();

    // Cập nhật thời gian mỗi giây
    const interval = setInterval(() => {
      const currentTime = Date.now();
      setUserAction((prev) => ({
        ...prev,
        timeOnPage: (currentTime - startTime) / 1000, // Tính thời gian theo giây
      }));
    }, 1000); // Mỗi 1 giây cập nhật 1 lần

    const handleClick = () => {
      setUserAction((prev) => ({ ...prev, clicks: prev.clicks + 1 }));
    };

    const handleMouseMove = () => {
      setUserAction((prev) => ({ ...prev, mouseMoves: prev.mouseMoves + 1 }));
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup khi component unmount
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(interval); // Dừng interval khi unmount để tránh rò rỉ bộ nhớ
    };
  }, []);

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
        {" "}
        {/* Chỉnh màu chữ */}
        User Actions Summary
      </h3>
      <ul className="mt-4 space-y-2">
        {" "}
        {/* Thêm khoảng cách giữa các item */}
        <li className="text-lg text-gray-700 dark:text-gray-300">
          {" "}
          {/* Chỉnh màu cho light/dark */}
          Total Clicks:{" "}
          <span className="font-semibold">{userAction.clicks}</span>
        </li>
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Total Mouse Moves:{" "}
          <span className="font-semibold">{userAction.mouseMoves}</span>
        </li>
        <li className="text-lg text-gray-700 dark:text-gray-300">
          Time on Page:{" "}
          <span className="font-semibold">
            {userAction.timeOnPage.toFixed(2)}
          </span>{" "}
          seconds
        </li>
      </ul>
    </div>
  );
};

export default UserActivityTracker;

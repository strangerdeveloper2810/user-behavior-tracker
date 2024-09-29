import React, { useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const getDataFromLocalStorage = (filter: string) => {
  const savedData = localStorage.getItem("userAction");
  const actions = savedData
    ? JSON.parse(savedData)
    : { clicks: [], mouseMoves: [], formSubmissions: [] };
  const now = Date.now();

  const filterDataByTime = (data: { timestamp: number }[], filter: string) => {
    let timeLimit = 0;
    switch (filter) {
      case "24h":
        timeLimit = 24 * 60 * 60 * 1000; // 24 giờ
        break;
      case "7d":
        timeLimit = 7 * 24 * 60 * 60 * 1000; // 7 ngày
        break;
      case "30d":
        timeLimit = 30 * 24 * 60 * 60 * 1000; // 30 ngày
        break;
      default:
        timeLimit = Infinity;
    }
    return data.filter((event) => now - event.timestamp <= timeLimit);
  };

  return {
    clicks: filterDataByTime(actions.clicks, filter).length,
    mouseMoves: filterDataByTime(actions.mouseMoves, filter).length,
    formSubmissions: filterDataByTime(actions.formSubmissions, filter).length,
  };
};

const UserActivityChart: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState<string>("24h");

  const data = [
    {
      name: "User Behavior",
      clicks: getDataFromLocalStorage(timeFilter).clicks,
      mouseMoves: getDataFromLocalStorage(timeFilter).mouseMoves,
      formSubmissions: getDataFromLocalStorage(timeFilter).formSubmissions,
    },
  ];

  return (
    <div className="mt-5">
      <select
        className="mb-4 p-2 border rounded"
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
      >
        <option value="24h">Last 24 hours</option>
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
      </select>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
          <Line type="monotone" dataKey="mouseMoves" stroke="#82ca9d" />
          <Line type="monotone" dataKey="formSubmissions" stroke="#ff7300" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;

import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Page A", clicks: 400, time: 2400 },
  { name: "Page B", clicks: 300, time: 2210 },
  { name: "Page C", clicks: 200, time: 2290 },
  { name: "Page D", clicks: 278, time: 2000 },
];

const UserActivityChart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="clicks" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default UserActivityChart;

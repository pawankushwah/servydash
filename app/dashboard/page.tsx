"use client";

import Image from "next/image";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  PieChart, Pie, Cell,
  LineChart, Line,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

export default function Dashboard() {
  // Dummy data
  const serviceData = [
    { name: "Jan", services: 12 },
    { name: "Feb", services: 18 },
    { name: "Mar", services: 9 },
    { name: "Apr", services: 15 },
    { name: "May", services: 22 },
    { name: "Jun", services: 17 },
  ];
  const transactionData = [
    { name: "Completed", value: 400 },
    { name: "Pending", value: 150 },
    { name: "Refunded", value: 50 },
  ];
  const COLORS = ["#06b6d4", "#6366f1", "#f59e42"];
  const revenueData = [
    { month: "Jan", revenue: 1200 },
    { month: "Feb", revenue: 1800 },
    { month: "Mar", revenue: 900 },
    { month: "Apr", revenue: 1500 },
    { month: "May", revenue: 2200 },
    { month: "Jun", revenue: 1700 },
  ];
  const productTypeData = [
    { type: "File", value: 24 },
    { type: "Event", value: 12 },
    { type: "Service", value: 18 },
    { type: "Course", value: 9 },
  ];
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-6 md:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Services Added (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={serviceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="services" fill="#06b6d4" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Transactions</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={transactionData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  // label
                >
                  {transactionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Revenue (Last 6 Months)</h2>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow p-4 sm:p-6 border border-gray-100 dark:border-gray-800">
            <h2 className="text-base sm:text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Product Types</h2>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart cx="50%" cy="50%" outerRadius={70} data={productTypeData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis />
                <Radar name="Types" dataKey="value" stroke="#f59e42" fill="#f59e42" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
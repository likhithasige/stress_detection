import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

export default function ResultsPage({ setRoute }) {
  const [results, setResults] = useState({
    accuracy: 0.92,
    roc: [0.1, 0.4, 0.7, 0.9],
    confusionMatrix: [
      [80, 5],
      [8, 70],
    ],
    pieData: { stressed: 45, calm: 55 },
  });

  const pieChartData = {
    labels: ["Stressed", "Calm"],
    datasets: [
      {
        data: [results.pieData.stressed, results.pieData.calm],
        backgroundColor: ["#A7C7E7", "#BEE3DB"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-soft-gradient p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 w-full max-w-3xl text-center fade-in"
      >
        <h2 className="text-3xl font-semibold text-deepIndigo mb-4">Stress Detection Results 🌿</h2>
        <p className="text-gray-600 mb-8">Here’s how your model performed on the uploaded data.</p>

        <div className="flex flex-wrap justify-around items-center gap-10">
          {/* Pie Chart */}
          <div className="w-72 h-72">
            <Pie data={pieChartData} />
          </div>

          {/* Metrics */}
          <div className="text-left space-y-3">
            <p className="text-lg">
              <strong className="text-deepIndigo">Accuracy:</strong> {results.accuracy * 100}%
            </p>
            <p className="text-lg">
              <strong className="text-deepIndigo">True Positives:</strong> {results.confusionMatrix[0][0]}
            </p>
            <p className="text-lg">
              <strong className="text-deepIndigo">True Negatives:</strong> {results.confusionMatrix[1][1]}
            </p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setRoute("home")}
          className="mt-10 bg-deepIndigo text-white px-8 py-3 rounded-xl shadow-calm hover:bg-indigo-700"
        >
          Back to Home
        </motion.button>
      </motion.div>
    </div>
  );
}

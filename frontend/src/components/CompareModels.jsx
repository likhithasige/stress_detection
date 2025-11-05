import React from "react";
import { motion } from "framer-motion";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

export default function CompareModels({ setRoute }) {
  // Dummy comparison data – replace with backend values later
  const data = {
    models: ["Random Forest", "SVM", "CNN", "LSTM"],
    accuracy: [0.88, 0.83, 0.92, 0.95],
    roc: [0.91, 0.87, 0.94, 0.97],
  };

  const barChartData = {
    labels: data.models,
    datasets: [
      {
        label: "Accuracy",
        data: data.accuracy,
        backgroundColor: ["#A7C7E7", "#BEE3DB", "#9BB7D4", "#A2E0C9"],
        borderRadius: 10,
      },
    ],
  };

  const rocCurveData = {
    labels: ["0.0", "0.25", "0.5", "0.75", "1.0"],
    datasets: [
      {
        label: "CNN ROC",
        data: [0, 0.5, 0.75, 0.9, 1],
        borderColor: "#4C6EF5",
        fill: false,
        tension: 0.3,
      },
      {
        label: "LSTM ROC",
        data: [0, 0.55, 0.8, 0.93, 1],
        borderColor: "#5CC6BA",
        fill: false,
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-soft-gradient p-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-8 w-full max-w-5xl text-center fade-in"
      >
        <h2 className="text-3xl font-semibold text-deepIndigo mb-4">
          Model Comparison Dashboard 🌿
        </h2>
        <p className="text-gray-600 mb-10">
          Visual comparison between Machine Learning and Deep Learning models for stress detection.
        </p>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Accuracy Bar Chart */}
          <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-calm border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-700 mb-4">Accuracy Comparison</h3>
            <Bar data={barChartData} />
          </div>

          {/* ROC Curve Chart */}
          <div className="p-6 rounded-3xl bg-white/60 backdrop-blur-xl shadow-calm border border-indigo-100">
            <h3 className="text-lg font-medium text-indigo-700 mb-4">ROC Curve Comparison</h3>
            <Line data={rocCurveData} />
          </div>
        </div>

        {/* Insights */}
        <div className="mt-10 text-gray-700 space-y-3 text-left max-w-2xl mx-auto">
          <p>
            ✅ <strong className="text-deepIndigo">CNN</strong> and <strong className="text-deepIndigo">LSTM</strong> models
            outperform traditional ML models, demonstrating superior ability to capture complex patterns in physiological data.
          </p>
          <p>
            🧠 Deep Learning approaches achieve smoother ROC curves and higher AUC values, aligning with the base paper findings.
          </p>
          <p>
            🌸 The results confirm that integrating multimodal data improves detection accuracy and robustness.
          </p>
        </div>

        {/* Back Button */}
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

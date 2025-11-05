
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Upload({ setRoute }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    if (!selectedFile) {
      alert("Please select a CSV file first.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      console.log("Prediction Results:", data);
      setRoute("results");
    } catch (err) {
      console.error("Error uploading file:", err);
      alert("Error uploading file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-indigo-100 via-white to-blue-50 text-center relative">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="p-10 rounded-3xl bg-white/70 shadow-xl backdrop-blur-xl border border-indigo-100 max-w-lg w-full relative z-10"
      >
        <h2 className="text-3xl font-bold text-indigo-700 mb-6">Upload CSV File</h2>

        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="block w-full text-gray-700 border border-indigo-200 rounded-lg cursor-pointer bg-gray-50 focus:outline-none mb-6"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleUpload}
          disabled={uploading}
          className={`px-8 py-3 rounded-xl font-semibold shadow-md transition-all ${
            uploading
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {uploading ? "Uploading..." : "Upload & Predict"}
        </motion.button>
      </motion.div>

      {/* Custom Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
            />

            {/* Centered dialog box */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-sm border border-indigo-200">
                <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
                  Please Login to Continue
                </h3>
                <p className="text-gray-600 mb-6">
                  You need to log in before uploading data for prediction.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      setRoute("login");
                    }}
                    className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-all"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="bg-gray-200 text-gray-800 px-5 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

export default function Home({ setRoute }) {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleGetStarted = () => {
    const user = localStorage.getItem("user");
    if (user) {
      setRoute("upload");
    } else {
      setShowLoginModal(true);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center text-center min-h-[85vh] overflow-hidden bg-soft-gradient">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 max-w-2xl w-full z-10 fade-in"
      >
        <h1 className="text-5xl font-semibold text-deepIndigo mb-6">
          Stress Detection for a Calmer You
        </h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Experience peace of mind with intelligent stress monitoring.  
          Upload your physiological data and discover how machine and deep learning  
          can help understand and manage stress effectively.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGetStarted}
          className="bg-deepIndigo text-white px-10 py-4 rounded-2xl shadow-calm hover:bg-indigo-700 transition-all"
        >
          Get Started
        </motion.button>
      </motion.div>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLoginModal(false)}
            />
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-50"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="glass-card p-8 text-center max-w-sm">
                <h3 className="text-2xl font-semibold text-deepIndigo mb-3">
                  Welcome Back
                </h3>
                <p className="text-gray-600 mb-6">
                  Please log in to continue your journey toward balance and awareness.
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      setRoute("login");
                    }}
                    className="bg-deepIndigo text-white px-6 py-2 rounded-xl hover:bg-indigo-700"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowLoginModal(false)}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-xl hover:bg-gray-300"
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

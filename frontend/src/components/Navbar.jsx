import React from "react";
import { motion } from "framer-motion";

export default function Navbar({ setRoute }) {
  return (
    <nav className="bg-indigo-600 text-white py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.h1
          className="text-2xl font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => setRoute("home")}
        >
          Stress Detection
        </motion.h1>
        <div className="flex gap-6 text-sm md:text-base font-medium">
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setRoute("home")}>
            Home
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setRoute("upload")}>
            Upload
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setRoute("results")}>
            Results
          </motion.button>
          <motion.button whileHover={{ scale: 1.1 }} onClick={() => setRoute("compare")}>
            Compare Models
          </motion.button>
        </div>
      </div>
    </nav>
  );
}

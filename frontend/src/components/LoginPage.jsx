import React, { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage({ setRoute }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      localStorage.setItem("user", email);
      setRoute("upload");
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-soft-gradient">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="glass-card p-10 w-full max-w-md text-center fade-in"
      >
        <h2 className="text-3xl font-semibold text-deepIndigo mb-6">Welcome Back 🌿</h2>
        <p className="text-gray-600 mb-8">Log in to continue your journey toward calm and clarity.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 rounded-xl border border-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-deepIndigo text-white py-3 rounded-xl mt-4 shadow-calm hover:bg-indigo-700 transition-all"
          >
            Log In
          </motion.button>
        </form>

        <p className="text-gray-500 mt-6">
          New here?{" "}
          <span
            onClick={() => setRoute("register")}
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </motion.div>
    </div>
  );
}

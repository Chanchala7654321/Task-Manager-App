import { useState } from "react";

export default function Login({ onLogin, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Basic Validation
    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      // Store the logged-in user's email (or other identifier) in session/local storage
      // so you know who the current user is to manage their tasks.
      localStorage.setItem("currentUserEmail", email);
      onLogin();
    } else {
      alert("Incorrect email or password");
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
        Welcome Back
      </h2>

      <input
        type="email"
        placeholder="Email"
        className="border border-gray-300 p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg transition duration-200"
      >
        Login
      </button>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <span
          className="text-indigo-600 cursor-pointer hover:underline"
          onClick={() => setPage("signup")}
        >
          Sign Up
        </span>
      </p>
    </div>
  );
}

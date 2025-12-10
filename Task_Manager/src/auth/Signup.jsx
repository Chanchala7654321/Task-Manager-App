import { useState } from "react";

export default function Signup({ onSignup, setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Basic Validation
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    // Simple email format check using a regular expression
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Check if user already exists in local storage (optional)
    const existingUser = localStorage.getItem("user");
    if (existingUser && JSON.parse(existingUser).email === email) {
      alert("An account with this email already exists. Please log in.");
      return;
    }

    // Store user data in localStorage
    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Signup successful! You can now log in.");
    onSignup({ name, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Create Your Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 p-3 w-full rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="border border-gray-300 p-3 w-full rounded-lg mb-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 p-3 w-full rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSignup}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
        >
          Sign Up
        </button>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-indigo-600 font-medium cursor-pointer hover:underline"
            onClick={() => setPage("login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

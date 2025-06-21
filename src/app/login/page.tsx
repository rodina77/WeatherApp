"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginSuccess } from "@/store/slices/AuthReducer";
import { useDispatch } from 'react-redux';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const dummyUser = {
      id: "1",
      name: "Demo User",
      email: email,
    };
    const dummyToken = "fake-jwt-token";

    localStorage.setItem("auth", JSON.stringify({ user: dummyUser, token: dummyToken }));
    const token = localStorage.getItem('token')
   dispatch(loginSuccess({ user: dummyUser, token: dummyToken }));

    router.push("/favorites"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded font-semibold transition"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

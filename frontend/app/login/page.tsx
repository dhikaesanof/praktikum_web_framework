"use client";

import { useState } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

        const response = await api.post(
            "/login",
            {
            email,
            password,
            }
        );

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        router.push("/");

    } catch (error) {

      console.error(error);

    }
  };

  return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">

    <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Login
      </h1>

      <form onSubmit={handleLogin}>

        <div className="mb-4">

          <label className="block mb-2 text-gray-700 font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Masukkan email"
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-3
              bg-white
              text-black
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 text-gray-700 font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            placeholder="Masukkan password"
            className="
              w-full
              border
              border-gray-300
              rounded-lg
              p-3
              bg-white
              text-black
              placeholder:text-gray-400
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-3
            rounded-lg
            font-medium
            transition
          "
        >
          Login
        </button>

        <p className="text-center mt-4 text-gray-600">
          Belum punya akun?
          <a
            href="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </a>
        </p>

      </form>

    </div>

  </div>
  );
}
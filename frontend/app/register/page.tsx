"use client";

import { useState } from "react";
import api from "../../services/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      await api.post("/register", {
        name,
        email,
        password,
      });

      alert("Register berhasil");

      router.push("/login");

    } catch (error) {

      console.error(error);
      alert("Register gagal");

    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <form onSubmit={handleRegister}>

          <div className="mb-4">

            <label className="block mb-2 text-gray-700 font-medium">
              Nama
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Masukkan nama"
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
                focus:ring-green-500
              "
            />

          </div>

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
                focus:ring-green-500
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
                focus:ring-green-500
              "
            />

          </div>

          <button
            type="submit"
            className="
              w-full
              bg-green-600
              hover:bg-green-700
              text-white
              py-3
              rounded-lg
              font-medium
              transition
            "
          >
            Register
          </button>

          <p className="text-center mt-4 text-gray-600">
            Sudah punya akun?
            <a
              href="/login"
              className="text-blue-500 ml-1"
            >
              Login
            </a>
          </p>

        </form>

      </div>

    </div>
  );
}
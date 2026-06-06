"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import Link from "next/link";

export default function Home() {

  const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editId, setEditId] = useState<number | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);

    const handleUpdate = async (
    e: React.FormEvent
    ) => {

    e.preventDefault();

    const token =
        localStorage.getItem("token");

    try {

        await api.put(
        `/articles/${editId}`,
        {
            title,
            content,
        },
        {
            headers: {
            Authorization:
                `Bearer ${token}`,
            },
        }
        );

        alert("Artikel berhasil diupdate");

        window.location.reload();

    } catch (error) {

        console.error(error);

    }
    };

    const handleEdit = (article: any) => {

    setEditId(article.id);

    setTitle(article.title);

    setContent(article.content);

    };

    const handleLogout = async () => {

    const token =
        localStorage.getItem("token");

    try {

        await api.post(
        "/logout",
        {},
        {
            headers: {
            Authorization:
                `Bearer ${token}`,
            },
        }
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

    } catch (error) {

        console.error(error);

    }
    };

    const handleDelete = async (
    id: number
    ) => {
    
    const confirmed = confirm(
    "Yakin ingin menghapus artikel ini?"
    );

    if (!confirmed) return;

    const token =
        localStorage.getItem("token");

    try {

        await api.delete(
        `/articles/${id}`,
        {
            headers: {
            Authorization:
                `Bearer ${token}`,
            },
        }
        );

        alert("Artikel dihapus");

        window.location.reload();

    } catch (error) {

        console.error(error);

    }
    };

    const handleCreate = async (
    e: React.FormEvent
    ) => {

    e.preventDefault();

    const token =
        localStorage.getItem("token");

    try {

        await api.post(
        "/articles",
        {
            title,
            content,
        },
        {
            headers: {
            Authorization:
                `Bearer ${token}`,
            },
        }
        );

        alert("Artikel berhasil dibuat");

        window.location.reload();

    } catch (error) {

        console.error(error);

    }
    };

    useEffect(() => {

        api.get("/articles")
        .then((response) => {
            setArticles(response.data);
        });

    }, []);

    useEffect(() => {

        const token =
            localStorage.getItem("token");
        const user =
            localStorage.getItem("user");

        setIsLoggedIn(!!token);

        if (user) {
          setCurrentUser(JSON.parse(user));
        }
    }, []);

  return (
  <div className="min-h-screen bg-gray-100">
    <div className="max-w-4xl mx-auto p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">
          Dashboard
        </h1>

        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => window.location.href = "/login"}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
            >
              Login
            </button>

            <button
              onClick={() => window.location.href = "/register"}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
            >
              Register
            </button>
          </div>
        )}
      </div>

      {/* Form */}
      {isLoggedIn && (
        <div className="bg-white shadow-md rounded-xl p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-4 text-black">
            {editId
              ? "Edit Artikel"
              : "Tambah Artikel"}
          </h2>

          <form
            onSubmit={
              editId
                ? handleUpdate
                : handleCreate
            }
          >
            <input
              type="text"
              placeholder="Masukkan Judul Artikel"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="
                text-black
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                mb-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <textarea
              placeholder="Masukkan Isi Artikel"
              value={content}
              onChange={(e) =>
                setContent(e.target.value)
              }
              rows={5}
              className="
                text-black
                w-full
                border
                border-gray-300
                rounded-lg
                p-3
                mb-4
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />

            <button
              type="submit"
              className="
                bg-green-600
                hover:bg-green-700
                text-white
                px-5
                py-2
                rounded-lg
                transition
              "
            >
              {editId
                ? "Update Artikel"
                : "Tambah Artikel"}
            </button>
            {editId && (
            <button
                type="button"
                onClick={() => {
                setEditId(null);
                setTitle("");
                setContent("");
                }}
                className="
                ml-2
                bg-gray-500
                hover:bg-gray-600
                text-white
                px-5
                py-2
                rounded-lg
                "
            >
                Batal
            </button>
            )}
          </form>
        </div>
      )}

      {/* List Artikel */}
      <div className="space-y-4">

        {articles.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-500">
            Belum ada artikel.
          </div>

        ) : (

          articles.map((article: any) => (

            <div
              key={article.id}
              className="
                bg-white
                shadow-md
                rounded-xl
                p-6
              "
            >

              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {article.title}
              </h2>

              <p className="text-gray-600 mb-4 text-justify">
                {article.content}
              </p>

              <p className="text-sm text-gray-500">
                Oleh: {article.user?.name || "Unknown"}
              </p>

              <p className="text-sm text-gray-400 mb-4">
                Dibuat:
                {" "}
                {new Date(article.created_at)
                  .toLocaleString()}
              </p>

              {isLoggedIn && currentUser?.id === article.user_id &&(
                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      handleEdit(article)
                    }
                    className="
                      bg-yellow-500
                      hover:bg-yellow-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(article.id)
                    }
                    className="
                      bg-red-500
                      hover:bg-red-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                      transition
                    "
                  >
                    Hapus
                  </button>

                </div>
              )}

            </div>

          ))

        )}

      </div>

    </div>
  </div>
  );
}
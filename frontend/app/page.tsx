"use client";

import { useEffect, useState } from "react";
import api from "../services/api";
import Link from "next/link";

export default function Home() {

  const [articles, setArticles] = useState([]);

  useEffect(() => {

    api.get("/articles")
      .then((response) => {
        setArticles(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

  }, []);

  return (
    <div>
      <h1>Praktikum Web Framework</h1>

      <Link href="/login">
        Login
      </Link>

      {articles.map((article: any) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
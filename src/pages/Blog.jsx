import React, { useEffect, useState } from "react";
import { Card, CTA } from "../components";

const Blog = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const corsProxy = "https://api.allorigins.win/get?url=";
        const feedUrl =
          "https://www.toptal.com/developers/feed2json/convert?url=https://medium.com/feed/@iammalikkhalil";

        const response = await fetch(
          `${corsProxy}${encodeURIComponent(feedUrl)}`
        );
        const data = await response.json();
        const jsonData = JSON.parse(data.contents);

        if (jsonData && jsonData.items && jsonData.items.length > 0) {
          setArticles(jsonData.items);
        } else {
          setError("No articles found.");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching RSS feed:", err);
        setError("Failed to fetch articles.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <section className="max-container py-12 px-4">
      <h1 className="head-text">
        Some Recent{" "}
        <span className="blue-gradient_text font-semibold drop-shadow">
          Articles
        </span>{" "}
        📝
      </h1>

      <div className="mt-5 flex flex-col gap-3 text-slate-500">
        <p>
          Here are my latest 10 blogs, carefully curated to offer valuable
          insights and stories across a variety of topics. If you're interested
          in exploring more, feel free to visit my Medium profile for a complete
          collection!
        </p>
      </div>

      <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
        {loading && (
          <p className="text-center text-xl">Loading your articles...</p>
        )}

        {error && (
          <div className="bg-red-200 p-4 border border-red-300 text-red-700 rounded-md mb-6 text-center">
            <strong>Error: </strong> {error}
          </div>
        )}

        {!loading &&
          !error &&
          articles.map((article, index) => (
            <Card key={index} article={article} />
          ))}

        {!loading && !error && articles.length === 0 && (
          <div className="bg-yellow-200 p-4 border border-yellow-300 text-yellow-700 rounded-md mb-6 text-center">
            <strong>No Articles Found!</strong>
          </div>
        )}
      </div>

      <hr className="border-slate-200" />

      <CTA />
    </section>
  );
};

export default Blog;

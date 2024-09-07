import React, { useState, useEffect } from "react";
import axios from "axios";

function Newss() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=climate change&apiKey=4d9bdbab5e26455386103939544efa22`
        );
        setArticles(response.data.articles.slice(0, 3));
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="News my-10 px-4 lg:px-0" id="News">
      <div className="container-main">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Weather Forecast News</h1>
          <p className="text-sm capitalize">
            Get the latest weather news from our team of meteorologists and
            learn how the weather changes lives all over the globe.
          </p>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  {article.urlToImage ? (
                    <img
                      src={article.urlToImage}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500">No Image Available</span>
                    </div>
                  )}
                  <div className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {article.source.name} /{" "}
                      {new Date(article.publishedAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2 text-sm text-gray-700">
                      {article.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newss;

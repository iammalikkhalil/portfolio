import { useState } from "react";
import { hero } from "../assets/images";

const Card = ({ article }) => {
  const { title, content_html, url } = article;

  // Extract the first paragraph and its children
  const parser = new DOMParser();
  const doc = parser.parseFromString(content_html, "text/html");
  const paragraphElement = doc.querySelector("p");

  // Extract text content and limit to 42 words
  let descriptionHtml = "";
  if (paragraphElement) {
    const words = paragraphElement.textContent.split(" ");
    descriptionHtml =
      words.slice(0, 42).join(" ") + (words.length > 42 ? "..." : "");
  }

  // Extract the first image for the thumbnail
  const imgElement = doc.querySelector("img");
  const originalThumbnail = imgElement ? imgElement.src : hero;

  const [thumbnail, setThumbnail] = useState(originalThumbnail);

  return (
    <div className="bg-white rounded-lg shadow-lg flex flex-col justify-between min-h-[400px] overflow-hidden">
      {/* Thumbnail */}
      <div className="w-full aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover"
          style={{
            objectFit: "cover",
            objectPosition: "center",
            aspectRatio: "16/9",
          }}
          onError={() => setThumbnail(hero)} // Use the imported hero image on error
        />
      </div>

      {/* Content */}
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 text-base">{descriptionHtml}</p>
      </div>

      {/* Read More */}
      <div className="p-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 underline underline-offset-4 hover:text-green-800 transition"
        >
          Read full article
        </a>
      </div>
    </div>
  );
};

export default Card;

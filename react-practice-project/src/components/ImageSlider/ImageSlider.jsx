import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./slider.css";

export default function ImageSlider({ url, limit = 1, page = 4 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchImages(getUrl) {
    try {
      setLoading(true);
      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (url) fetchImages(url);
  }, [url]);

  console.log(images);

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (errorMessage) {
    return <div>Error occurred!</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill className="arrow arrow-left" />
      {images &&
        images.map((imageItem) => (
          <img
            key={imageItem.id}
            src={imageItem.download_url}
            alt={imageItem.download_url}
            className="current-image"
          />
        ))}
      <BsArrowRightCircleFill className="arrow arrow-right" />
      <span className="circles">
        {images &&
          images.map((_, index) => {
            <button key={index} className="current-indicator"></button>;
          })}
      </span>
    </div>
  );
}

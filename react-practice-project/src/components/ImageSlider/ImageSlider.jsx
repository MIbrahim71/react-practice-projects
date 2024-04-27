import { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./slider.css";

export default function ImageSlider({ url, limit = 1, page = 4 }) {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handlePrevious() {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  }

  function handleNext() {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  }

  // Fetch images from API
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

  // useEffect
  // ensures fetchImages function is called whenever 'url' changes
  // fetchImages is an asynchronous function that produces side effects. Placing it inside a useEffect hook separates side effects from component logic
  // By specifying [url] as a dependency it prevents potential infinite loops that would've occurred if 'fetchImages' was called unconditionally in the component body
  // Component code becomes cleaner and easier to read - separates concerns & makes code more maintainable

  useEffect(() => {
    if (url) fetchImages(url);
  }, [url]);

  // Conditional rendering of 'loading' and 'errorMessage' ensures UI reflects loading and error states properly
  if (loading) {
    return <div>Loading data...</div>;
  }

  if (errorMessage) {
    return <div>Error occurred!</div>;
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {/* Images mapped - if current slide is equal to the mapping index, show image via class. If not, hide the image */}
      {images &&
        images.map((imageItem, index) => (
          <img
            key={imageItem.id}
            src={imageItem.download_url}
            alt={imageItem.download_url}
            className={
              currentSlide === index
                ? "current-image"
                : "current-image hide-current-image"
            }
          />
        ))}
      <BsArrowRightCircleFill
        onClick={handleNext}
        className="arrow arrow-right"
      />

      <span className="circles">
        {/* Circle indicator mapping - onClick set the currentSlide to the index of the circle */}
        {images &&
          images.map((_, index) => (
            <button
              key={index}
              className={
                currentSlide === index
                  ? "current-indicator"
                  : "current-indicator inactive"
              }
              onClick={() => setCurrentSlide(index)}
            ></button>
          ))}
      </span>
    </div>
  );
}

import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarReviews({ noOfStars }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  function handleClick(getCurrentIndex) {
    setRating(getCurrentIndex);
  }

  function handleMouseEnter(getCurrentIndex) {
    setHover(getCurrentIndex);
  }

  function handleMouseLeave() {
    setHover(rating);
  }

  return (
    <div className="star-rating">
      {[...Array(noOfStars)].map((_, index) => {
        index += 1;
        return (
          <FaStar
            key={index}
            // Go yellow if the index is less than or equal to the hover no. or rating no.
            className={index <= (hover || rating) ? "active" : "inactive"}
            onClick={() => handleClick(index)} // that index is set to rating
            onMouseEnter={() => handleMouseEnter(index)} // that index is set to hover
            onMouseLeave={() => handleMouseLeave()}
            size={100}
          />
        );
      })}
    </div>
  );
}

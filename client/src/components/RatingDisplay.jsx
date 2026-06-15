import React from 'react'

export default function RatingDisplay ({ rating }) {
  return (
    <div className="rating rating-half">
      {[1, 2, 3, 4, 5].flatMap((star) => {
        const halfValue = star - 0.5;
        return [
          <input
            key={halfValue}
            type="radio"
            name="rating"
            className="bg-yellow-400 mask mask-star-2 mask-half-1"
            checked={rating == halfValue}
            readOnly
          />,
          <input
            key={star}
            type="radio"
            name="rating"
            className="bg-yellow-400 mask mask-star-2 mask-half-2"
            checked={rating == star}
            readOnly
          />,
        ];
      })}
    </div>
  );
};

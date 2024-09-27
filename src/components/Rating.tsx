import React from 'react';

interface RatingProps {
  rating: number; 
}

const Rating = ({ rating }:RatingProps) => {

    if (!rating){
        return 5;
    }
  const fullStars = Math.max(Math.floor(rating));
  const halfStars = Math.max(rating % 1 >= 0.5 ? 1 : 0);
  const emptyStars = Math.max(5 - fullStars - halfStars);

  return (
    <div className="flex items-center ">
      {/* Full Stars */}
      {[...Array(fullStars)].map((_, index) => (
        <svg
          key={`full-${index}`}
          aria-hidden="true"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927a1 1 0 011.902 0l1.358 4.17a1 1 0 00.95.69h4.398a1 1 0 01.588 1.81l-3.587 2.607a1 1 0 00-.364 1.118l1.358 4.17a1 1 0 01-1.541 1.117l-3.587-2.607a1 1 0 00-1.175 0l-3.587 2.607a1 1 0 01-1.541-1.117l1.358-4.17a1 1 0 00-.364-1.118L2.004 9.598a1 1 0 01.588-1.81h4.398a1 1 0 00.95-.69l1.358-4.17z" />
        </svg>
      ))}
      {/* Half Star */}
      {halfStars === 1 && (
        <svg
          aria-hidden="true"
          className="w-5 h-5 text-yellow-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927a1 1 0 011.902 0l1.358 4.17a1 1 0 00.95.69h4.398a1 1 0 01.588 1.81l-3.587 2.607a1 1 0 00-.364 1.118l1.358 4.17a1 1 0 01-1.541 1.117l-3.587-2.607a1 1 0 00-1.175 0l-3.587 2.607a1 1 0 01-1.541-1.117l1.358-4.17z" />
        </svg>
      )}
      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, index) => (
        <svg
          key={`empty-${index}`}
          aria-hidden="true"
          className="w-5 h-5 text-gray-300 dark:text-gray-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927a1 1 0 011.902 0l1.358 4.17a1 1 0 00.95.69h4.398a1 1 0 01.588 1.81l-3.587 2.607a1 1 0 00-.364 1.118l1.358 4.17a1 1 0 01-1.541 1.117l-3.587-2.607a1 1 0 00-1.175 0l-3.587 2.607a1 1 0 01-1.541-1.117l1.358-4.17a1 1 0 00-.364-1.118L2.004 9.598a1 1 0 01.588-1.81h4.398a1 1 0 00.95-.69l1.358-4.17z" />
        </svg>
      ))}
      <span className="bg-green-100 text-green-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-green-200 dark:text-green-900 ml-3">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

export default Rating;

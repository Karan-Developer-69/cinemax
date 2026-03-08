const MovieCardSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Poster */}
      <div className="w-full aspect-[2/3] bg-gray-300 dark:bg-gray-700 rounded-xl"></div>

      {/* Title */}
      <div className="mt-3 h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>

      {/* Rating */}
      <div className="mt-2 h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
    </div>
  );
};

export default MovieCardSkeleton;
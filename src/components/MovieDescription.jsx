export const MovieDescription = ({ movie }) => {
  return (
    <div className="flex flex-col rounded-lg shadow-md overflow-hidden ml-30 mt-10 w-[1080px] h-[271px]">
      <div className="flex ">
        <span className="flex  items-center bg-gray-200 border rounded-4xl">
          {movie?.title}
        </span>
      </div>
      <div>{movie?.overview}</div>
      <div>
        <h1>Director</h1>
        <span></span>
      </div>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";

const Trailer = ({ id }) => {
  const [videoId, setVideoId] = useState(null);

  useEffect(() => {
    const getTrailer = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}movie/${id}/videos?language=en-US`
        );
        const data = await response.json();
        const trailer = data.results.find(
          (video) => video.name === "Official Trailer"
        );

        if (trailer) {
          setVideoId(trailer.key);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (id) {
      getTrailer();
    }
  }, [id]);

  const opts = {
    height: "561",
    width: "997 ",
    playerVars: {
      autoplay: 1,
    },
  };

  return <YouTube videoId={videoId} opts={opts} />;
};

export default Trailer;

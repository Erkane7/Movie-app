import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { getTrailer } from "@/services/getTrailer";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

const Trailer = ({ movieId }) => {
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    const getTrailerId = async () => {
      if (!movieId) return;
      try {
        const data = await getTrailer(movieId);
        setTrailers(data.results || []);
      } catch (error) {
        console.error("Failed to fetch trailer:", error);
      }
    };

    getTrailerId();
  }, [movieId]);

  const movieTrailer = trailers.find(
    (video) => video.name === "Official Trailer"
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Play />
            Watch trailer
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 overflow-hidden min-w-fit ">
          <YouTube
            videoId={movieTrailer?.key}
            opts={{
              width: "997",
              height: "567",
              playerVars: {
                autoplay: 1,
              },
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trailer;

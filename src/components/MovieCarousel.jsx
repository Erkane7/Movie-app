import MyCarouselItem from "./MovieCarouselItem";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export const MovieCarousel = ({ nowPlayingMovie }) => {
  console.log(nowPlayingMovie);
  return (
    <div>
      <Carousel
        className="relative mt-10"
        plugins={[
          Autoplay({
            delay: 3500,
          }),
        ]}
      >
        <CarouselContent>
          {nowPlayingMovie?.slice(0, 7).map((movie, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <MyCarouselItem
                  title={movie.title}
                  vote_average={movie.vote_average}
                  backdrop_path={movie.backdrop_path}
                  overview={movie.overview}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="invisible lg:visible absolute left-5 to-50%" />
        <CarouselNext className="invisible lg:visible absolute right-5 to-50%" />
      </Carousel>
    </div>
  );
};

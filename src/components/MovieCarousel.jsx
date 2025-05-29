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
  return (
    <div>
      <Carousel
        className="relative overflow-hidden max-w-screen rounded-lg mt-4 "
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {nowPlayingMovie?.slice(0, 3).map((movie) => (
            <CarouselItem className="basis-full" key={movie.id}>
              <div className="mx-auto max-w-[1600px]">
                <MyCarouselItem
                  id={movie.id}
                  title={movie.title}
                  vote_average={movie.vote_average}
                  backdrop_path={movie.backdrop_path}
                  overview={movie.overview}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="invisible lg:visible absolute left-5 " />
        <CarouselNext className="invisible lg:visible absolute right-5 " />
      </Carousel>
    </div>
  );
};

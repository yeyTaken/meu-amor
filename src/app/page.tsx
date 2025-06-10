import { FaHeart } from "react-icons/fa";

import SpotifyEmbed from "@/components/Spotify/Embed";
import PhotoCarousel from "@/components/PhotoCarousel";
import { TimeSince } from "@/components/TimeSince";

export default function Home() {
  const spotifyLink =
    "https://open.spotify.com/intl-pt/track/1yvKTtymV4JhHXeMrD5b9g?si=437923c2c58b4147";

  const images: string[] = [
    "/image_1.png",
    "/image_2.png",
    "/image_3.png",
    "/image_4.png",
    "/image_5.png",
    "/image_6.png",
    "/image_7.png",
    "/image_8.png",
  ];

  return (
    <div className="pt-3 px-4 w-full">
      <div className="max-w-2xl mx-auto">
        <SpotifyEmbed trackUrl={spotifyLink} />

        <br />

        <PhotoCarousel images={images} />

        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold">Nossas memórias!</h1>
          <p className="text-2xl font-bold text-[#666666] mt-4">
            <TimeSince startDate="2025-03-18T00:00:00" />
          </p>
        </div>

        <div className="my-8 h-0.5 w-[95%] bg-[#8f2e2e] rounded-full opacity-80 mx-auto" />

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold">
            Te amo, daqui até um bilhão de anos...
          </h2>
          <p className="mt-4 text-lg">
            O que sinto por você é tão imenso que palavras como{" "}
            <span className="text-[#666666] italic">
              “eu te amo pela eternidade”
            </span>{" "}
            parecem pequenas diante da grandeza desse sentimento. Meu amor por
            você vai além do tempo, do espaço, de qualquer explicação.{" "}
            <span className="text-[#bd1313] italic">
              Eu te amo, meu bebezão <FaHeart className="inline" />.
            </span>{" "}
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}

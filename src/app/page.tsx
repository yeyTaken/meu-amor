'use client';

import { useEffect, useState } from 'react';

import LoadingScreen from './loading';

import SpotifyEmbed from "@/components/Spotify/Embed";
import PhotoCarousel from "@/components/PhotoCarousel";
import TimeSince from "@/components/TimeSince";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Se a página já estiver carregada
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  if (isLoading) return <LoadingScreen />;

  const spotifyLink =
    "https://open.spotify.com/intl-pt/track/1yvKTtymV4JhHXeMrD5b9g?si=437923c2c58b4147";

  const images: string[] = [
    "/image_1.png",
    "/image_2.png",
    "/image_3.png",
    "/image_4.png",
    "/image_5.png",
    "/image_6.png",
    "/image_7.png"

  ];

  return (
    <div className="pt-3 px-4 w-full">
      <br />
      <div className="max-w-2xl mx-auto">
        <SpotifyEmbed trackUrl={spotifyLink} />
        <PhotoCarousel images={images} />
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold">Nossas memórias!</h1>
          <p className="text-2xl font-bold text-[#666666] mt-4">
            <TimeSince startDate="2025-03-18T00:00:00" />
          </p>
        </div>

        <div className="my-8 mx-auto h-1 w-1/2 bg-[#8f2e2e] rounded-full opacity-80" />

        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold">
            Te amo, daqui até um bilhão de anos...
          </h2>
          <p className="mt-4 text-lg">
            O que sinto por você é tão imenso que palavras como{" "}
            <span className="text-[#666666] italic">“eu te amo pela eternidade”</span>{" "}
            parecem pequenas diante da grandeza desse sentimento.
            Meu amor por você vai além do tempo, do espaço, de qualquer explicação.
            Eu te amo, meu amor. ❤️
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}

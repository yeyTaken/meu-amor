// components/SpotifyEmbed.tsx
interface SpotifyEmbedProps {
  trackUrl: string;
}

export default function SpotifyEmbed({ trackUrl }: SpotifyEmbedProps) {
  const trackId = trackUrl.split("/track/")[1]?.split("?")[0];

  if (!trackId) return null;

  return (
    <iframe
      style={{ borderRadius: "10px" }}
      src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=1`}
      width="100%"
      height="80"
      allowTransparency={true}
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    />
  );
}

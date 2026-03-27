import { useRef, useEffect, useState } from "react";
import videos from "../data/videos";
import VideoCard from "../components/VideoCard";
function Home() {
  const containerRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [currentVideo, setCurrentVideo] = useState(null);
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    if (
      container.scrollTop + container.clientHeight >=
      container.scrollHeight - 2
    ) {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          setCurrentVideo={setCurrentVideo}
        />
      ))}
    </div>
  );
}
export default Home;
import { useRef, useEffect, useState } from "react";
function VideoCard({ video, isMuted, setIsMuted, setCurrentVideo }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [likes, setLikes] = useState(video?.likes || 0);
  const [comments, setComments] = useState(video?.comments || 0);
  const [shares, setShares] = useState(video?.shares || 0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLikeAnim, setShowLikeAnim] = useState(false);
  const lastTap = useRef(0);
  const handleClick = (e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      // ❤️ DOUBLE TAP LIKE
      setLiked(true);
      setLikes((prev) => prev + (liked ? 0 : 1));

      setShowLikeAnim(true);
      setTimeout(() => setShowLikeAnim(false), 600);
    } else {
      // ▶️ SINGLE TAP PLAY/PAUSE
      const vid = videoRef.current;
      if (!vid) return;

      if (vid.paused) {
        vid.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        vid.pause();
        setIsPlaying(false);
      }
    }

    lastTap.current = now;
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const vid = videoRef.current;
        if (!vid) return;

        if (entry.isIntersecting) {
          vid.play().then(() => setIsPlaying(true)).catch(() => {});
          setCurrentVideo(video?.id);
        } else {
          vid.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [video?.id, setCurrentVideo]);
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);
  return (
    <div
      ref={containerRef}
      style={{
        height: "100dvh",
        position: "relative",
        scrollSnapAlign: "start",
      }}
    >
      <video
        ref={videoRef}
        src={video?.url}
        onClick={handleClick}
        loop
        autoPlay
        playsInline
        muted={isMuted}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      {showLikeAnim && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "90px",
            animation: "likePop 0.6s ease",
            pointerEvents: "none",
          }}
        >
          ❤️
        </div>
      )}
      <div
        style={{
          position: "absolute",
          right: "10px",
          bottom: "80px",
          color: "white",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div
          onClick={() => {
            setLiked((prev) => !prev);
            setLikes((prev) => prev + (liked ? -1 : 1));

            setShowLikeAnim(true);
            setTimeout(() => setShowLikeAnim(false), 600);
          }}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          {liked ? "❤️" : "🤍"}
          <div>{likes}</div>
        </div>
        <div
          onClick={() => setComments((prev) => prev + 1)}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          💬
          <div>{comments}</div>
        </div>
        <div
          onClick={() => setShares((prev) => prev + 1)}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          🔗
          <div>{shares}</div>
        </div>
        <div
          onClick={() => setSaved((prev) => !prev)}
          style={{ cursor: "pointer", fontSize: "20px" }}
        >
          {saved ? "📌" : "🔖"}
        </div>
        <div
          onClick={() => setIsMuted((prev) => !prev)}
          style={{
            fontSize: "26px",
            cursor: "pointer",
            animation: !isMuted ? "spin 2s linear infinite" : "none",
            opacity: isMuted ? 0.5 : 1,
          }}
        >
          🎵
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "10px",
          color: "white",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* 👤 AVATAR */}
          <img
            src={video?.user?.avatar || "/avatar.png"}
            alt="avatar"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1.5px solid white",
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h4 style={{ margin: 0 }}>
                @{video?.user?.name || "user"}
              </h4>
              <button
                onClick={() => setFollowed((prev) => !prev)}
                style={{
                  background: followed ? "gray" : "red",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              >
                {followed ? "Following" : "Follow"}
              </button>
            </div>
            <p style={{ margin: 0 }}>{video?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VideoCard;
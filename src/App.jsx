import { useEffect, useState } from "react";
import "./App.css";
import { videosData } from "./data/videos";
import VideoCard from "./VideoCard";

function App() {
  const [videos, setVideos] = useState(videosData);
  const [pinned, setPinned] = useState([]);

  const shuffleVideos = () => {
    setVideos((prevVideos) => {
      const unpinnedVideos = prevVideos.filter((v) => !pinned.includes(v.id));

      for (let i = unpinnedVideos.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [unpinnedVideos[i], unpinnedVideos[j]] = [
          unpinnedVideos[j],
          unpinnedVideos[i],
        ];
      }

      return prevVideos.map((v) =>
        pinned.includes(v.id) ? v : unpinnedVideos.shift()
      );
    });
  };

  const togglePin = (id) => {
    setPinned((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      shuffleVideos();
    }, 5000);

    return () => clearInterval(interval);
  }, [pinned]);

  return (
    <div className="flex items-center justify-center flex-col p-2">
      <div className="text-black-400 text-2xl py-2">Videos Area</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video) => (
          <VideoCard
            video={video}
            key={video.id}
            pinned={pinned.includes(video.id)}
            onTogglePin={() => togglePin(video.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

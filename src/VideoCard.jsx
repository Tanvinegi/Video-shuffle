import { Card } from "antd";
import { PushpinOutlined } from "@ant-design/icons";

const VideoCard = ({ video, key, pinned, onTogglePin }) => {
  return (
    <Card key={key} className="p-4 border m-2">
      <div className="flex justify-between items-center mb-1 gap-2">
        <h2 className="text-xl font-bold mb-2">{video.title}</h2>
        <PushpinOutlined
          style={{ color: pinned ? "blue" : "gray", fontSize: "20px" }}
          onClick={onTogglePin}
        />
      </div>
      <video
        width="320"
        height="240"
        controls
        poster={video.thumb}
        className="mb-2"
        autoPlay
        muted
      >
        <source src={video.sources[0]} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Card>
  );
};

export default VideoCard;

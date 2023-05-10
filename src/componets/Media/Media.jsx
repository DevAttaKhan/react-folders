import React from "react";
import "./styles.scss";

const Media = ({ mediaId, mediaName, mediaUrl, onDragStart }) => {
  return (
    <div
      className="media"
      draggable
      data-draggable-id={mediaId}
      onDragStart={(e) => onDragStart(e, mediaId)}
    >
      <img src={mediaUrl} alt={mediaName} />
    </div>
  );
};

export default Media;

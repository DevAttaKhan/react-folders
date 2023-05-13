import React from "react";
import "./styles.scss";

const Media = ({ mediaId, mediaName, thumbnail, onDragStart }) => {
  return (
    <div
      className="media"
      draggable
      data-draggable-id={mediaId}
      onDragStart={(e) => onDragStart(e, mediaId)}
    >
      <img src={thumbnail} alt={mediaName} />
    </div>
  );
};

export default Media;

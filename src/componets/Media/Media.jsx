import React from "react";
import './styles.scss'

const Media = ({ mediaId, mediaName, onDragStart }) => {
  return (
    <div
      className="media"
      draggable
      data-draggable-id={mediaId}
      onDragStart={(e) => onDragStart(e, mediaId)}
    >
      {mediaName}
    </div>
  );
};

export default Media;

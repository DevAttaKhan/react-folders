import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";  
import { fetchAllMedias } from "../../store/mediaSlice";
import Media from "../Media/Media";


import './styles.scss';
 

const MediaList = () => {
  const { mediaList } = useSelector((state) => state.medias);
  const { activeFolder } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllMedias());
  }, [dispatch]);

  const rendermedias = (medias, onDragStart) => {
    let content = [];
    if (activeFolder === "all") {
      content = medias.map(({ media_id, media_name, folder_id }, i) => (
        <Media
          key={media_id}
          mediaId={media_id}
          mediaName={media_name}
          onDragStart={onDragStart}
        />
      ));
    } else {
      content = medias
        .filter((media) => media.folder_id === activeFolder)
        .map(({ media_id, media_name, folder_id }) => (
          <Media
            key={media_id}
            mediaId={media_id}
            mediaName={media_name}
            onDragStart={onDragStart}
          />
        ));
    }
    return content;
  };
  const onDragStart = (e, d) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(d));
  };

  return (
    <div className="media-list">
      {rendermedias(mediaList).length ? (
        rendermedias(mediaList, onDragStart)
      ) : (
        <h2>No medias Yet</h2>
      )}
    </div>
  );
};

export default MediaList;

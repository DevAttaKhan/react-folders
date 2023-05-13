import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMedia, fetchAllMedias } from "../../store/mediaSlice";
import Media from "../Media/Media";

import "./styles.scss";

const MediaList = () => {
  const { mediaList } = useSelector((state) => state.medias);
  const { activeFolder } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllMedias());
  }, [dispatch]);

  async function readDirectory(directory) {
    var reader = directory.createReader();

    const entriesPromise = new Promise((resolve, reject) => {
      reader.readEntries((entries) => resolve(entries));
    });

    const entries = await entriesPromise;

    let entryPromises = [];

    entries.forEach((e) => {
      let p = new Promise((resolve, reject) => {
        resolve(e);
      });
      entryPromises.push(p);
    });

    const entryArr = await Promise.all([...entryPromises]);

    const filePromises = [];
    entryArr.forEach((entry) => {
      let p = new Promise((resolve, reject) => {
        entry.file((f) => resolve(f));
      });
      filePromises.push(p);
    });

    const files = await Promise.all([...filePromises]);

    return files;
  }

  const handleDragover = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e) => {
    e.nativeEvent.preventDefault();
    const items = e.dataTransfer.items[0];
  
    const directory = items.webkitGetAsEntry();
    const files = await readDirectory(directory);

    dispatch(createMedia(files));
  };

  const rendermedias = (medias, onDragStart) => {
    let content = [];
    if (activeFolder === "all") {
      content = medias.map(({ media_id, media_name, thumbnail }, i) => (
        <Media
          key={media_id}
          mediaId={media_id}
          mediaName={media_name}
          thumbnail={thumbnail}
          onDragStart={onDragStart}
        />
      ));
    } else {
      content = medias
        .filter((media) => media.folder_id === activeFolder)
        .map(({ media_id, media_name, thumbnail }) => (
          <Media
            key={media_id}
            mediaId={media_id}
            mediaName={media_name}
            thumbnail={thumbnail}
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
    <div className="media-list" onDragOver={handleDragover} onDrop={handleDrop}>
      <div className="media-list-wrapper">
      {rendermedias(mediaList).length ? (
        rendermedias(mediaList, onDragStart)
      ) : (
        <h2>No medias Yet</h2>
      )}
      </div>
    </div>
  );
};

export default MediaList;

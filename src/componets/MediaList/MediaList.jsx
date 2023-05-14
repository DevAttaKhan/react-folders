import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createMedia, fetchAllMedias } from "../../store/mediaSlice";
import Media from "../Media/Media";

import "./styles.scss";

const MediaList = () => {
  const { mediaList } = useSelector((state) => state.medias);
  const { activeFolder } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const [position, setPosition] = useState({
    top: 300,
    left: 200,
  });
  const contextMenuRef = useRef();
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

  const showCotextMenu = (e) => {
    const screenH = window.innerHeight;
    const screenW = window.innerWidth;
    const menuDimensions = contextMenuRef.current.getBoundingClientRect();

    if (
      e.clientY + menuDimensions.height > screenH &&
      menuDimensions.height < e.clientY
    ) {
      console.log(menuDimensions);
      let pos = { bottom: screenH - e.clientY };
      e.clientX + menuDimensions.width > screenW
        ? (pos.right = screenW - e.clientX)
        : (pos.left = e.clientX);
      setPosition(() => pos);
      setMenu(true);
    } else if (
      menuDimensions.height > e.clientY &&
      e.clientY + menuDimensions.height > screenH
    ) {
      let pos = { bottom: 0 };
      e.clientX + menuDimensions.width > screenW
        ? (pos.right = screenW - e.clientX)
        : (pos.left = e.clientX);

      setPosition(() => pos);
      setMenu(true);
    } else if (
      e.clientY < menuDimensions.height &&
      e.clientX + menuDimensions.width < screenW
    ) {
      //top left to top center
      let pos = { top: e.clientY };
      e.clientX + menuDimensions.width > screenW
        ? (pos.right = screenW - e.clientX)
        : (pos.left = e.clientX);
      setPosition(() => pos);
      setMenu(true);
    } else if (
      e.clientY < menuDimensions.height &&
      e.clientX + menuDimensions.width > screenW
    ) {
      setPosition(() => ({
        top: e.clientY,
        right: screenW - e.clientX,
      }));
      setMenu(true);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();
    showCotextMenu(e); 
  };

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (menu) {
        setMenu(false);
      }
    });
  }, [menu]);
  return (
    <div
      className="media-list"
      onDragOver={handleDragover}
      onDrop={handleDrop}
      onContextMenu={handleRightClick}
    >
      <div className="media-list-wrapper">
        {rendermedias(mediaList).length ? (
          rendermedias(mediaList, onDragStart)
        ) : (
          <h2>No medias Yet</h2>
        )}
      </div>
      <div
        className={menu ? "context-menu active" : "context-menu"}
        style={position}
        ref={contextMenuRef}
      ></div>
    </div>
  );
};

export default MediaList;

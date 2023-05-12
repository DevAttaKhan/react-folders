import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createMedia } from "../../store/mediaSlice";
import { ReactComponent as IconPlus } from "../../assets/plus-solid.svg";
import "./styles.scss";

const Header = () => {
  const dispatch = useDispatch();
  const fileRef = useRef();

  const handleSelectFile = () => {
    fileRef?.current.click();
  };

  const onSelectMedia = async (e) => {
    const files = e.target?.files;
    dispatch(createMedia(files));
  };

  return (
    <header>
      <h1>media library</h1>

      <label>
        <button onClick={handleSelectFile}>
          <IconPlus />
        </button>
        <input
          type="file"
          name="file"
          ref={fileRef}
          multiple
          onChange={onSelectMedia}
        />
      </label>
    </header>
  );
};

export default Header;

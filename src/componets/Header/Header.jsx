import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddMediaInput } from "../../store/uiSlice";
import { createMedia } from "../../store/mediaSlice";

import './styles.scss'

const Header = () => {
  const { addmediaInput } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [mediaName, setmediaName] = useState("");

  const handlemediaSubmit = async (e) => {
    e.preventDefault();
    if (!mediaName) return;
    dispatch(createMedia(mediaName));
    dispatch(setAddMediaInput(false))
  };

  return (
    <header>
      <h1>media library</h1>
      {addmediaInput && (
        <form onSubmit={handlemediaSubmit}>
          <input
            type="text"
            placeholder="Enter Your media Name"
            onChange={(e) => setmediaName(e.target.value)}
            value={mediaName}
          />
          <button type="submit">confirm</button>
        </form>
      )}
      {!addmediaInput && (
        <button onClick={() => dispatch(setAddMediaInput(true))}>
          add media
        </button>
      )}
    </header>
  );
};

export default Header;

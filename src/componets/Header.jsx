import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddBookInput } from "../store/uiSlice";
import { postBook } from "../store/bookSlice";

const Header = () => {
  const { addBookInput } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const [bookName, setBookName] = useState("");

  const handleBookSubmit = async (e) => {
    e.preventDefault();
    if (!bookName) return;
    dispatch(postBook(bookName));
  };

  return (
    <header>
      <h1>Book library</h1>
      {addBookInput && (
        <form onSubmit={handleBookSubmit}>
          <input
            type="text"
            placeholder="Enter Your Book Name"
            onChange={(e) => setBookName(e.target.value)}
            value={bookName}
          />
          <button type="submit">confirm</button>
        </form>
      )}
      {!addBookInput && (
        <button onClick={() => dispatch(setAddBookInput(true))}>
          add book
        </button>
      )}
    </header>
  );
};

export default Header;

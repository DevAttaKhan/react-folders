import React, { useState, useEffect } from "react";
import { fetchAllBooks } from "../store/bookSlice";
import { useDispatch, useSelector } from "react-redux";
import { setActiveFolder } from "../store/uiSlice";
import SideBar from "../componets/SideBar";

const Home = () => {
  const { bookList } = useSelector((state) => state.books);
  const { activeFolder } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  useEffect(() => {
  

    dispatch(fetchAllBooks());
  }, [dispatch]);

  const renderBooks = (books, onDragStart) => {
    let content = [];
    if (activeFolder === "all") {
      content = books.map(({ book_id, book_name, folder_id }, i) => (
        <div
          className="book"
          key={book_id}
          draggable
          data-draggable-id={book_id}
          onDragStart={(e) => onDragStart(e, book_id)}
        >
          {book_name}
        </div>
      ));
    } else {
      content = books
        .filter((book) => book.folder_id === activeFolder)
        .map(({ book_id, book_name, folder_id }) => (
          <div
            className="book"
            key={book_id}
            draggable
            data-draggable-id={book_id}
            onDragStart={(e) => onDragStart(e, book_id)}
          >
            {book_name}
          </div>
        ));
    }
    return content;
  };
  const onDragStart = (e, d) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(d));
  };
  return (
    <>
      <main>
        <SideBar />

        <div className="book-list">
          {renderBooks(bookList).length ? (
            renderBooks(bookList, onDragStart)
          ) : (
            <h2>No Books Yet</h2>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;

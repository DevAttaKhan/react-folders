import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllBooks } from "../store/bookSlice";
import Book from "./Book";

const BookList = () => {
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
        <Book
          key={book_id}
          bookId={book_id}
          bookName={book_name}
          onDragStart={onDragStart}
        />
      ));
    } else {
      content = books
        .filter((book) => book.folder_id === activeFolder)
        .map(({ book_id, book_name, folder_id }) => (
          <Book
            key={book_id}
            bookId={book_id}
            bookName={book_name}
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
    <div className="book-list">
      {renderBooks(bookList).length ? (
        renderBooks(bookList, onDragStart)
      ) : (
        <h2>No Books Yet</h2>
      )}
    </div>
  );
};

export default BookList;

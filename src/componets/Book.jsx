import React from "react";

const Book = ({ bookId, bookName, onDragStart }) => {
  return (
    <div
      className="book"
      draggable
      data-draggable-id={bookId}
      onDragStart={(e) => onDragStart(e, bookId)}
    >
      {bookName}
    </div>
  );
};

export default Book;

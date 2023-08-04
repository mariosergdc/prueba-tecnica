import { useState } from "react";
import db from "../db/db.json";
import Book from "./Book";

const initialState = db.library;

const BooksList = () => {
  const [books, setBooks] = useState(initialState);
  return (
    <div className="book-list">
      BooksList
      {books.map((el) => {
        return <Book book={el.book} />;
      })}
    </div>
  );
};

export default BooksList;

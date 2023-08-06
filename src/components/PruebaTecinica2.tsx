import { useState } from "react";
import db from "../db/db.json";
import BooksList from "./BooksList";
import ReadingList from "./ReadingList";

const initialState = db.library;

const PruebaTecinica2 = () => {
  const [books, setBooks] = useState(initialState);
  const [booksToRead, setBooksToRead] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  const addToReadingList = (id) => {
    const bookToAdd = books.find((el) => {
      return el.book.ISBN === id;
    });
    const newBooks = books.filter((el) => {
      return el.book.ISBN !== id;
    });
    const newReadingList = [...booksToRead];
    newReadingList.push(bookToAdd);
    setBooksToRead(newReadingList);
    setBooks(newBooks);
  };

  const removeFromReadingList = (id) => {
    const bookToAdd = booksToRead.find((el) => {
      return el.book.ISBN === id;
    });
    const newBooksList = [...books];
    newBooksList.push(bookToAdd);
    setBooks(newBooksList);
    const bookFiltred = booksToRead.filter((el) => {
      return el.book.ISBN !== id;
    });
    setBooksToRead(bookFiltred);
  };

  const handleGenreFilter = (e) => {
    setGenreFilter(e.target.value);
  };

  return (
    <>
      <div>Prueba Técinica 2</div>

      <BooksList
        books={books}
        addToReadingList={addToReadingList}
        genreFilter={genreFilter}
        handleGenreFilter={handleGenreFilter}
      />
      <ReadingList
        booksToRead={booksToRead}
        removeFromReadingList={removeFromReadingList}
      />
    </>
  );
};

export default PruebaTecinica2;

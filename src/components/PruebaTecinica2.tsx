import { useEffect, useState } from "react";
import db from "../db/db.json";
import BooksList from "./BooksList";
import ReadingList from "./ReadingList";

const initialState = db.library;

const PruebaTecinica2 = () => {
  const [books, setBooks] = useState(initialState);
  const [booksToRead, setBooksToRead] = useState([]);
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    const item = localStorage.getItem("booksToRead");
    if (item) {
      const readingList = JSON.parse(item);
      setBooksToRead(readingList);

      const readingListId = readingList.map((el) => el.book.ISBN);

      const booksActual = [...books].filter(
        (el) => !readingListId.includes(el.book.ISBN)
      );

      setBooks(booksActual);
    } else {
      setBooksToRead([]);
      setBooks(initialState);
    }
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const item = localStorage.getItem("booksToRead");
      if (item) {
        const readingList = JSON.parse(item);
        setBooksToRead(readingList);

        const readingListId = readingList.map((el) => el.book.ISBN);

        const booksActual = [...books].filter(
          (el) => !readingListId.includes(el.book.ISBN)
        );

        setBooks(booksActual);
      } else {
        setBooksToRead([]);
        setBooks(initialState);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
    localStorage.setItem("booksToRead", JSON.stringify(newReadingList));
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
    localStorage.setItem("booksToRead", JSON.stringify(bookFiltred));
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

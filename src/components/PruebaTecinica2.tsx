import { useEffect, useState } from "react";
import db from "../db/db.json";
import BooksList from "./BooksList";
import ReadingList from "./ReadingList";
import { Library } from "../types";

const initialState = db.library;

const PruebaTecinica2 = () => {
  const [books, setBooks] = useState(initialState);
  const [booksToRead, setBooksToRead] = useState<Library[]>([]);
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    const item = localStorage.getItem("booksToRead");
    if (item) {
      const readingList = JSON.parse(item);
      setBooksToRead(readingList);

      const readingListId = readingList.map((el: Library) => el.book.ISBN);

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

        const readingListId = readingList.map((el: Library) => el.book.ISBN);

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

  const addToReadingList = (id: string) => {
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

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId === destination.droppableId) {
      const list = source.droppableId === "books" ? books : booksToRead;
      const newList = Array.from(list);
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);
      if (source.droppableId === "books") {
        setBooks(newList);
      } else {
        setBooksToRead(newList);
      }
    } else {
      const sourceList = source.droppableId === "books" ? books : booksToRead;
      const destinationList =
        destination.droppableId === "books" ? books : booksToRead;
      const newSourceList = Array.from(sourceList);
      const newDestinationList = Array.from(destinationList);
      const [removed] = newSourceList.splice(source.index, 1);
      newDestinationList.splice(destination.index, 0, removed);
      setBooks(newSourceList);
      setBooksToRead(newDestinationList);
    }
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

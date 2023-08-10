import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
        localStorage.setItem("booksToRead", JSON.stringify(newList));
      }
    } else {
      const sourceList = source.droppableId === "books" ? books : booksToRead;
      const destinationList =
        destination.droppableId === "books" ? books : booksToRead;
      const newSourceList = Array.from(sourceList);
      const newDestinationList = Array.from(destinationList);
      const [removed] = newSourceList.splice(source.index, 1);
      newDestinationList.splice(destination.index, 0, removed);
      if (source.droppableId === "books") {
        setBooks(newSourceList);
        setBooksToRead(newDestinationList);
        localStorage.setItem("booksToRead", JSON.stringify(newDestinationList));
      } else {
        setBooks(newDestinationList);
        setBooksToRead(newSourceList);
        localStorage.setItem("booksToRead", JSON.stringify(newSourceList));
      }
    }
  };

  return (
    <>
      <div>Prueba Técinica 2</div>
      <div className="app-container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
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
        </DragDropContext>
      </div>
    </>
  );
};

export default PruebaTecinica2;

/*react beautiful dnd
 import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
<DragDropContext onDragEnd={handleOnDragEnd}>
  <Droppable droppableId="books">
    {(provided) => (
      <ul {...provided.droppableProps} ref={provided.innerRef}>
        {books.map((book, index) => (
          <Draggable key={book.id} draggableId={book.id} index={index}>
            {(provided) => (
              <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                {book.title}
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>
  <Droppable droppableId="read-books">
    {(provided) => (
      <ul {...provided.droppableProps} ref={provided.innerRef}>
        {readBooks.map((book, index) => (
          <Draggable key={book.id} draggableId={book.id} index={index}>
            {(provided) => (
              <li
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                {book.title}
              </li>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </ul>
    )}
  </Droppable>
</DragDropContext> */

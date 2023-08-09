import Book from "./Book";
import { Draggable } from "react-beautiful-dnd";

const BooksList = ({
  books,
  addToReadingList,
  genreFilter,
  handleGenreFilter,
}) => {
  const booksToShow =
    genreFilter === ""
      ? books
      : books.filter((el) => {
          return el.book.genre
            .toLocaleLowerCase()
            .includes(genreFilter.toLocaleLowerCase());
        });

  return (
    <div>
      <h1>Lista de Libros</h1>
      <div>Cantidad de Libros disponibles: {books.length}</div>
      <div>Cantidad de Libros filtrados: {booksToShow.length}</div>
      <input
        type="text"
        onChange={handleGenreFilter}
        value={genreFilter}
        placeholder="Filter by Genre"
      />
      <div className="book-list">
        {booksToShow.map((el, index) => {
          return (
            <Draggable
              key={el.book.ISBN}
              draggableId={el.book.ISBN}
              index={index}
            >
              {(provided) => (
                <div
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <button onClick={() => addToReadingList(el.book.ISBN)}>
                    Add to Reading List
                  </button>
                  <Book book={el.book} />
                </div>
              )}
            </Draggable>
          );
        })}
      </div>
    </div>
  );
};

export default BooksList;

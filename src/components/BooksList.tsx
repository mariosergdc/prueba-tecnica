import Book from "./Book";
import { Draggable, Droppable } from "react-beautiful-dnd";

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

      <Droppable droppableId="books">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="left-side"
          >
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
                        <Book book={el.book} />
                        <button onClick={() => addToReadingList(el.book.ISBN)}>
                          Add to Reading List
                        </button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default BooksList;

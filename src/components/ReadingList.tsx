import Book from "./Book";
import { Draggable, Droppable } from "react-beautiful-dnd";

const ReadingList = ({ booksToRead, removeFromReadingList }) => {
  return (
    <div className="right-side">
      <h1>Lista de Lectura</h1>
      <div>Cantidad de Libros en Lista de lectura: {booksToRead.length}</div>
      <Droppable droppableId="read-books">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="read-books"
          >
            {booksToRead?.map((el, index) => {
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
                      className="book-container"
                    >
                      <button
                        onClick={() => removeFromReadingList(el.book.ISBN)}
                      >
                        x
                      </button>
                      <Book book={el.book} />
                    </div>
                  )}
                </Draggable>
              );
            })}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default ReadingList;

import Book from "./Book";
import { Draggable } from "react-beautiful-dnd";

const ReadingList = ({ booksToRead, removeFromReadingList }) => {
  return (
    <div>
      <h1>Lista de Lectura</h1>
      <div>Cantidad de Libros en Lista de lectura: {booksToRead.length}</div>
      <div className="book-list">
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
                >
                  <button onClick={() => removeFromReadingList(el.book.ISBN)}>
                    x
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

export default ReadingList;

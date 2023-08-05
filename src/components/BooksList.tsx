import Book from "./Book";

const BooksList = ({ books, addToReadingList }) => {
  return (
    <div>
      <h1>Lista de Libros</h1>
      <div className="book-list">
        {books.map((el) => {
          return (
            <div key={el.book.ISBN}>
              <button onClick={() => addToReadingList(el.book.ISBN)}>
                Add to Reading List
              </button>
              <Book book={el.book} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BooksList;

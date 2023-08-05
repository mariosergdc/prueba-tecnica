import Book from "./Book";

const ReadingList = ({ booksToRead, removeFromReadingList }) => {
  return (
    <div>
      <h1>Lista de Libros</h1>
      <div className="book-list">
        {booksToRead?.map((el) => {
          return (
            <div key={el.book.ISBN}>
              <button onClick={() => removeFromReadingList(el.book.ISBN)}>
                x
              </button>
              <Book book={el.book} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ReadingList;

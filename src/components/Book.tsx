const Book = ({ book }) => {
  return (
    <div className="book">
      <div className="book-img-container">
        <img src={book.cover} alt={book.title} />
      </div>
      <div>{book.title}</div>
      <div>{book.genre}</div>
    </div>
  );
};

export default Book;

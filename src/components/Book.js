import React from 'react';
import PropTypes from 'prop-types';

function Book(props) {
  const calculateShelf = (book, books) => {
    let currentShelf = 'none';

    for (let item of books ) {
      if (item.id === book.id)  {
        currentShelf = item.shelf;
        break;
      }
    }
    return currentShelf;
  }
  
  const { books, book, updateShelf } = props;
  const thumbnail = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : null;
  return (
    <li key={book.id}>
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url("${thumbnail}")` }}></div>
          <div className="book-shelf-changer">
            <select  onChange={(event) => updateShelf(book, event.target.value)} defaultValue={calculateShelf(book, books)}>
            <option value="none" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.map((author,index) => <span key={index}> {author}{' '} </span>)}</div>
      </div>
    </li>
  )
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  updateShelf: PropTypes.func.isRequired,
  books: PropTypes.array.isRequired
}

export default Book;
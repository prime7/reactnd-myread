import React from 'react';
import Book from './Book';

export default function Shelf(props) {
    const { books, updateShelf } = props

    return (
      <ol className="books-grid">
        {books.map((book) => (
          <Book
            books={books}
            book={book}
            key={book.id}
            updateShelf={updateShelf}
          />
        ))}
      </ol>
    )
}

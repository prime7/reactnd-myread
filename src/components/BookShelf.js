import React from 'react';
import Shelf from './Shelf';
import { Link } from 'react-router-dom';

export default function BookShelf(props) {
    const shelfTypes = [
        { type: 'currentlyReading', title: 'Currently Reading' },
        { type: 'wantToRead',  title: 'Want to Read' },
        { type: 'read', title: 'Read'}
    ];
    const { books, updateShelf } = props;
    return (
        <div className="list-books-content">
            {shelfTypes.map((shelf,index) => {
                const shelfBooks = books.filter( book => book.shelf === shelf.type)
                if(shelfBooks.length === 0 ){
                    return(
                        <div className="bookshelf" key={index}>
                            <h2 className="bookshelf-title">{ shelf.title }</h2>
                            <div className="bookshelf-books">
                            {    shelfBooks.length === 0 &&
                                shelf.type === 'currentlyReading' ? <p>Sadly you are not reading any books now</p> : 
                                shelf.type === 'wantToRead' ? <p>You should add more books to your reading list</p> : 
                                shelf.type === 'read' ? <p>You haven't read any books</p> :  <p></p> 
                            }
                            </div>
                        </div>
                    )
                }
                return (
                    <div className="bookshelf" key={index}>
                        <h2 className="bookshelf-title">{ shelf.title }</h2>
                        <div className="bookshelf-books">
                            <Shelf
                                key={index}
                                books={shelfBooks}
                                updateShelf={updateShelf}
                            />

                        </div>
                    </div>
                )
            })}
            <div className="open-search">
                <Link to='/search' />
            </div>
        </div>
    )
}

import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as BooksAPI from '../BooksAPI';
import Book from './Book'

export default class BookSearch extends Component {
    state = {
        query: '',
        newBooks: [],
    }
    getBooks = (event) => {
        this.searchBooks(event.target.value.trim());
    }
    
    searchBooks = (query) => {
        this.setState({query})
        if(query){
            BooksAPI.search(query)
                .then((books) => {
                    books.length > 0 ? this.setState({ newBooks: books}) : this.setState({newBooks : []})
                }).catch((err)=>{
                    console.log(err)
                })
        }
    } 

    render() {
        const { query, newBooks } = this.state;
        const { updateShelf, books } = this.props;
        console.log(this.state)
        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search"  to="/">Close</Link>
                        <div className="search-books-input-wrapper">
                        <input type="text"
                            placeholder="Search by title or author"
                            value={ query }
                            onChange={ this.getBooks } />
                        </div>
                    </div>
                    <div className="search-books-results">
                    { newBooks.length > 0 && (
                        <div>
                            <div className=''>
                            <h3>Search returned { newBooks.length } books </h3>
                            </div>
                            <ol className="books-grid">
                            {newBooks.map((book) => (
                                <Book
                                    book={ book }
                                    books={ books }
                                    key={ book.id }
                                    updateShelf={updateShelf}
                                />
                            ))}
                            </ol>
                        </div>
                    )}
                    { newBooks.length ===0  && (
                        <div>
                            <div className=''>
                            <h3>0 Results Found</h3>
                            </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
        )
    }
}

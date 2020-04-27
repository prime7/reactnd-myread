import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import BookSearch from './components/BookSearch';
import BookShelf from './components/BookShelf';
import { Route,BrowserRouter } from "react-router-dom";
import './App.css';

export default class BooksApp extends Component {
    state = {
        books: []
    }
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState({ books })
        })
    }
    updateShelf = (newBook, newShelf) => {
        BooksAPI.update(newBook, newShelf).then((update) => {
          newBook.shelf = newShelf;
          const updatedBooks = this.state.books.filter( book => book.id !== newBook.id );
          updatedBooks.push(newBook);
          this.setState({ books: updatedBooks })
        })
      }
    
    render() {
        return (
            <BrowserRouter>
                <Route
                    exact path = "/"
                    render = {() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            <BookShelf
                                books={this.state.books}
                                updateShelf={this.updateShelf}
                            />
                        </div>
                    )}
                />
                <Route
                    exact path = "/search"
                    render = {() => (
                        <BookSearch
                            books={this.state.books}
                            updateShelf={this.updateShelf}
                        />
                    )}                
                />
            </BrowserRouter>
        )
    }
}

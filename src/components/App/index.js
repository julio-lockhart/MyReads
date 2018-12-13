import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import UserShelf from "../UserShelf";
import SearchBooks from "../SearchBooks";

// API
import * as BooksAPI from "../../API/BooksAPI";

// Stylesheet
import "./App.css";

class BooksApp extends Component {
  state = {
    books: [],
    showSearchPage: false
  };

  componentDidMount() {
    this.loadBooks();
  }

  // Query API to get all the books
  loadBooks = () => {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          books
        }));
      })
      .catch(error => {
        console.log("Error: " + error);
      });
  };

  changeShelf = (book, shelf) => {
    console.log("Updating Shelf:", shelf, book);
    BooksAPI.update(book, shelf).then(() => {
      this.loadBooks();
    });
  };

  render() {
    const { books } = this.state;

    return (
      <Router>
        <div className="app">
          <Route
            path="/search"
            render={({ history }) => (
              <SearchBooks changeShelf={this.changeShelf} />
            )}
          />
          <Route
            exact
            path="/"
            render={() => (
              <div>
                <UserShelf books={books} onShelfChange={this.changeShelf} />
                <div className="open-search">
                  <Link to="/search">Search</Link>
                </div>
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

export default BooksApp;

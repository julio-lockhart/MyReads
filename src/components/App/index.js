import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

// Components
import UserShelf from "../UserShelf";
import SearchBooks from "../SearchBooks";
import ErrorPage from "../ErrorPage";

// API
import * as BooksAPI from "../../API/BooksAPI";

// Stylesheet
import "./App.css";

class BooksApp extends Component {
  state = {
    books: [],
    showError: false,
    errorMessage: ""
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
        this.setState({ showError: true, errorMessage: error });
      });
  };

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.loadBooks();
    });
  };

  render() {
    const { books, showError, errorMessage } = this.state;

    if (showError) {
      return <ErrorPage errorMessage={errorMessage} />;
    }

    return (
      <Router>
        <div className="app">
          <Route
            path="/search"
            render={({ history }) => (
              <SearchBooks allBooks={books} changeShelf={this.changeShelf} />
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

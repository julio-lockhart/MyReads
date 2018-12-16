import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Components
import Book from "../Book";
import ErrorPage from "../ErrorPage";

// API
import * as BooksAPI from "../../API/BooksAPI";

class SearchBooks extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired
  };

  state = {
    searchedBooks: [],
    query: "",
    showError: false,
    errorMessage: ""
  };

  searchBooks = e => {
    const query = e.target.value;
    this.setState({ query });

    if (query) {
      BooksAPI.search(query)
        .then(books => {
          if (books.length > 0) {
            const filteredBooks = books
              .filter(book => book.authors)
              .filter(book => book.imageLinks);

            this.setState({ searchedBooks: filteredBooks });
          }
        })
        .catch(error => {
          this.setState({ showError: true, errorMessage: error });
        });
    } else {
      this.setState({ searchedBooks: [], query: "" }); // Empty query
    }
  };

  updateBookShelf = (book, shelf) => {
    this.props.changeShelf(book, shelf);

    switch (shelf) {
      case "wantToRead":
        alert(`"${book.title}" was moved to the shelf: "Want to Read"`);
        break;
      case "currentlyReading":
        alert(`"${book.title}" was moved to the shelf: "Currently Reading"`);
        break;
      default:
        alert(`"${book.title}" was moved to the shelf: "Read"`);
    }
  };

  render() {
    const { query, searchedBooks, showError, errorMessage } = this.state;

    if (showError) {
      return <ErrorPage errorMessage={errorMessage} />;
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.searchBooks}
            />
          </div>
        </div>

        <div className="search-books-results">
          {searchedBooks && searchedBooks.length > 0 && (
            <div>
              <h3>Search returned {searchedBooks.length} books </h3>
              <ol className="books-grid">
                {query.length !== 0 &&
                  searchedBooks.map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onShelfChange={shelf => {
                        this.updateBookShelf(book, shelf);
                      }}
                    />
                  ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchBooks;

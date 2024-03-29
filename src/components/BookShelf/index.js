import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import Book from "../Book";

// Utilities
import * as Titles from "../../Utilities/constants";

/*
  BookShelf is a wrapper for a single book shelf for either 'Currently Reading', 'Want To Read' and 'Read'
*/
class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  // Callback to the UserShelf component to update the shelf
  updateBookShelf = (book, shelf) => {
    this.props.onShelfChange(book, shelf);
  };

  render() {
    const { title, books } = this.props;

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.length === 0 ? (
                  <EmptyDisplay title={title} />
                ) : (
                  books.map(book => (
                    <Book
                      key={book.id}
                      book={book}
                      onShelfChange={shelf => this.updateBookShelf(book, shelf)}
                    />
                  ))
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/*
Based on the title of the book shelf, a different message will be displayed if
the shelf is empty
*/
const EmptyDisplay = ({ title }) => {
  if (title === Titles.TITLE_CURRENTLY_READING) {
    return <h3>Start reading a book</h3>;
  } else if (title === Titles.TITLE_WANT_TO_READ) {
    return <h3>How about searching for a book to read?</h3>;
  } else if (title === Titles.TITLE_READ) {
    return <h3>You haven't read any books!</h3>;
  } else {
    return <div>Empty</div>;
  }
};

export default BookShelf;

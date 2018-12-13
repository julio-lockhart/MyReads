import React, { Component } from "react";
import PropTypes from "prop-types";

// Components
import BookShelf from "../BookShelf";

// Utilities
import * as Titles from "../../Utilities/constants";

/*
    Component for a User's book shelf 
*/
class UserShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  render() {
    const { books } = this.props;

    const currentlyReadingBooks = books.filter(
      book => book.shelf === "currentlyReading"
    );

    const wantToReadBooks = books.filter(book => book.shelf === "wantToRead");
    const readBooks = books.filter(book => book.shelf === "read");

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <BookShelf
          title={Titles.TITLE_CURRENTLY_READING}
          books={currentlyReadingBooks}
          onShelfChange={this.props.onShelfChange}
        />
        <BookShelf
          title={Titles.TITLE_WANT_TO_READ}
          books={wantToReadBooks}
          onShelfChange={this.props.onShelfChange}
        />
        <BookShelf
          title={Titles.TITLE_READ}
          books={readBooks}
          onShelfChange={this.props.onShelfChange}
        />
      </div>
    );
  }
}

export default UserShelf;

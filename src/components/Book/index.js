import React, { Component } from "react";
import PropTypes from "prop-types";

/*
  Details of a single book. A Book object is passed in via props
*/
class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onShelfChange: PropTypes.func.isRequired
  };

  // Callback to parent to tell it that the book is going to be changed to another shelf
  changeShelf = e => {
    this.props.onShelfChange(e.target.value);
  };

  render() {
    const { book } = this.props;
    const shelf = book.shelf;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks.smallThumbnail})`
            }}
          />
          <div className="book-shelf-changer">
            <select onChange={this.changeShelf} value={shelf}>
              <option value="move" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    );
  }
}

export default Book;

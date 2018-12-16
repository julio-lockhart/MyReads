import React from "react";

// Stylesheet
import "./errorPage_style.css";

// Template pulled from "https://colorlib.com/wp/free-404-error-page-templates/"
const ErrorPage = ({ errorMessage }) => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <p>{errorMessage}</p>
        <a href="/">home page</a>
      </div>
    </div>
  );
};

export default ErrorPage;

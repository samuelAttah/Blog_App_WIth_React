import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <main className="Missing">
      <h2>404 Error Page Not Found</h2>
      <p>
        <Link to="/">Back To HomePage</Link>
      </p>
    </main>
  );
};

export default PageNotFound;

import React from "react";
import Feed from "./Feed";

const HomePage = ({ posts }) => {
  return (
    <main className="Home">
      {posts.length ? (
        <Feed posts={posts} />
      ) : (
        <p style={{ marginTop: "2rem" }}>No posts to Display</p>
      )}
    </main>
  );
};

export default HomePage;

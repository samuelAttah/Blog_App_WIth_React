import { useParams, Link } from "react-router-dom";

const PostPage = ({ posts, handleDelete, handleEdit }) => {
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id); //To string method was called to convert the numeric post.id to string so as to compare strictly with the Id passed via react-router params

  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete Post
            </button>

            <Link to={"/edit/" + id}>
              <button className="editButton">Edit Post</button>
            </Link>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, that's Disappointing.</p>
            <p>
              <Link to="/"> Visit Our HomePage for More</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;

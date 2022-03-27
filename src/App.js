import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import PageNotFound from "./PageNotFound";
import Header from "./Header";
import DashBoard from "./DashBoard";
import Footer from "./Footer";
import About from "./About";
import Nav from "./Nav";
// import PostArray from "./PostArray";
import PostPage from "./PostPage";
import NewPost from "./NewPost";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "./api/posts";
import EditPost from "./EditPost";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [postBody, setPostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts", {
          headers: { Accept: "application/json" },
        });
        console.log(response);
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.datetime.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse()); // We reverse the filtered array to be able to see the newer posts first before the older ones
  }, [posts, search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), "MMMM dd, yyy pp");
    const newpost = {
      id,
      title: postTitle,
      datetime,
      body: postBody,
    };
    const addPost = async () => {
      try {
        const response = await api.post("/posts", JSON.stringify(newpost), {
          headers: { "Content-Type": "application/json" },
        });
        const allPosts = [...posts, response.data];
        setPosts(allPosts);
        setPostBody("");
        setPostTitle("");
        navigate("/", { replace: true });
      } catch (err) {
        console.error(`Error: ${err.message}`);
      }
    };
    addPost();
  };

  const handleEdit = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyy pp");
    const updatedPost = {
      id,
      title: editTitle,
      datetime,
      body: editBody,
    };
    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      const allPosts = posts.map((post) =>
        post.id === id ? { ...response.data } : post
      );
      setPosts(allPosts);
      setEditBody("");
      setEditTitle("");
      navigate("/", { replace: false });
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postList = posts.filter((post) => post.id !== id);
      setPosts(postList);
      navigate("/", { replace: false });
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  };

  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<HomePage posts={searchResults} />} />
        {/* note that searchResults was passed in above so that we can be able to display searched posts */}
        <Route
          path="/post"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              postBody={postBody}
              setPostTitle={setPostTitle}
              setPostBody={setPostBody}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              editBody={editBody}
              setEditTitle={setEditTitle}
              setEditBody={setEditBody}
            />
          }
        />
        <Route
          path="/post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

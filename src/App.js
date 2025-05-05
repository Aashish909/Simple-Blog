import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";
import { Route, Routes, useNavigate,  } from "react-router-dom";
import { useState, useEffect } from "react";
import './index.css'

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "My First Post",
      datetime: "July 01, 2021 5:00 PM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur, quae, quibusdam, quod quos quia quidem quas quos quod quibusdam.",
    },
    {
      id: 2,
      title: "My Second Post",
      datetime: "July 01, 2021 5:00 PM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur, quae, quibusdam, quod quos quia quidem quas quos quod quibusdam.",
    },
    {
      id: 3,
      title: "My Third Post",
      datetime: "July 01, 2021 5:00 PM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur, quae, quibusdam, quod quos quia quidem quas quos quod quibusdam.",
    },
    {
      id: 4,
      title: "My Fourth Post",
      datetime: "July 01, 2021 5:00 PM",
      body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis consequatur, quae, quibusdam, quod quos quia quidem quas quos quod quibusdam.",
    },
  ]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    const filteredResult = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filteredResult.reverse())
  },[posts, search])

  const handleDelete = (id) => {
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate('/');
  };
  const handleSubmit =(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = new Date().toLocaleString();
    const newPost = {id, title: postTitle, datetime, body: postBody};
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
  }
  return (
    <div className="App">
      <Header  title='Simple Blog' style={{textAlign: 'center'}}/>
      <Navbar search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<Home posts={searchResult} />} />
        <Route path="/post" element={<NewPost 
          postTitle={postTitle}
          setPostTitle={setPostTitle}
          postBody={postBody}
          setPostBody={setPostBody}
          handleSubmit={handleSubmit}
          
        />} />
        <Route path="/post/:id" element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      <Footer posts={searchResult}/>
    </div>
  );
}

export default App;

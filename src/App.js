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
import  api from './api/posts'
import EditPost from "./pages/EditPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const navigate = useNavigate();

  //fetch data
  useEffect(() =>{
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          // Not in the 200 response range
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.message}`);
        }
      }
    }
    fetchPosts();
  },[])

  useEffect(()=>{
    const filteredResult = posts.filter((post) => ((post.body).toLowerCase()).includes(search.toLowerCase()) || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResult(filteredResult.reverse())
  },[posts, search])

  const handleDelete =async (id) => {

    try{
    await api.delete(`/posts/${id}`);
    
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate('/');
    }catch(err){
      console.log(`Error: ${err.message}`);
    }
  };
  const handleSubmit =async(e)=>{
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = new Date().toLocaleString();
    const newPost = {id, title: postTitle, datetime, body: postBody};
   try{
    const response =await api.post('/posts', newPost);
    const allPosts = [...posts, response.data];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    navigate('/');
   }catch(err){
    console.log(`Error: ${err.message}`);
   }
  }
  const handleEdit =async(id) => {
    // const datetime = (new Date().toLocaleString())
      const date = new Date();
      const options = {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      const formattedDate = date.toLocaleString("en-US", options);
      const datetime = `Edited ${formattedDate}`;
    const updatedPost = {id, title: editTitle, datetime, body: editBody};
    try {
      const response =await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map((post) => post.id === id ? {...response.data} : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (error) {
      
    }
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
        <Route path="/edit/:id" element={<EditPost 
          posts={posts}
          editTitle={editTitle}
          setEditTitle={setEditTitle}
          editBody={editBody}
          setEditBody={setEditBody}
          handleEdit={handleEdit}
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

import React, { useContext, useEffect,useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router';
import { DataContext } from '../Context/DataContext';
import api from "../api/posts";

const EditPost = () => {

  
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate =useNavigate()

  const { posts, setPosts, } =
    useContext(DataContext);

   const handleEdit = async (id) => {
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
     const updatedPost = { id, title: editTitle, datetime, body: editBody };
     try {
       const response = await api.put(`/posts/${id}`, updatedPost);
       setPosts(
         posts.map((post) => (post.id === id ? { ...response.data } : post))
       );
       setEditTitle("");
       setEditBody("");
       navigate("/");
     } catch (error) {}
   };
    

    const {id}= useParams();
    const post =posts.find((post)=> (post.id).toString() === id)

    useEffect(()=>{
        if(post){
            setEditTitle(post.title);
            setEditBody(post.body);
        }
    },[post, setEditBody, setEditTitle ])
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form
            action=""
            className="newPostForm"
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              id="postTitle"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="postBody">Post:</label>
            <textarea
              id="postBody"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
            ></textarea>
            <button onClick={() => handleEdit(post.id)} type="submit">
              Edit post
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disappointing</p>
          <p>
            <Link to="/">Visit Our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
}

export default EditPost
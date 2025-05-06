import Header from "./components/Header";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NewPost from "./pages/NewPost";
import PostPage from "./pages/PostPage";
import About from "./pages/About";
import Missing from "./pages/Missing";
import { Route, Routes } from "react-router-dom";

import "./index.css";

import EditPost from "./pages/EditPost";
import { DataProvider } from "./Context/DataContext";

function App() {
 

 
  return (
    <div className="App">
      <DataProvider>
        <Header title="Simple Blog" style={{ textAlign: "center" }} />
        <Navbar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Missing />} />
        </Routes>
        <Footer/>
      </DataProvider>
    </div>
  );
}

export default App;

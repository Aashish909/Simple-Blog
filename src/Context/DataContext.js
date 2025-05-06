import api from "../api/posts";

const { createContext, useState, useEffect } = require("react");

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //fetch data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
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
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const filteredResult = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResult(filteredResult.reverse());
  }, [posts, search]);

  return (
    <DataContext.Provider
      value={{
        search,
        setSearch,
        searchResult,
        setPosts,
        posts,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext };

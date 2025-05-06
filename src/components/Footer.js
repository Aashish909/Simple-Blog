import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";

const Footer = () => {
  const { searchResult } = useContext(DataContext);
  return (
    <footer
      className="Footer"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <p>
        {searchResult.length} {searchResult.length <= 1 ? "Post" : "Posts"}
      </p>

      <p>Copyright &copy; {new Date().getFullYear()} Simple Blog</p>
    </footer>
  );
};

export default Footer;

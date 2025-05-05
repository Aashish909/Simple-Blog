import React from "react";

const Footer = ({ posts }) => {
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
        {posts.length} {posts.length <= 1 ? "Post" : "Posts"}
      </p>

      <p>Copyright &copy; {new Date().getFullYear()} Simple Blog</p>
    </footer>
  );
};

export default Footer;

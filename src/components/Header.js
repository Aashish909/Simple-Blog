import React from "react";

const Header = ({ title }) => {
  return (
    <header
      className="Header"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100px", // adjust as needed
        backgroundColor: "#00cfff", // optional background
      }}
    >
      <h1 style={{ margin: 0 }}>{title}</h1>
    </header>
  );
};

export default Header;

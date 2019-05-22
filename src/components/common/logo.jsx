import React from "react";
import logo from "./logo.jpg";

const Logo = props => {
  console.log(props);
  return <img src={logo} alt="Logo" height="45" />;
};

export default Logo;

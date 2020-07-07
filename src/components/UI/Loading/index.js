import React from "react";
import classes from "./Loading.module.css";

const Loader = () => {
  return <div style={{height: '100vh'}}><div  className={classes.loader}>Loading...</div></div>;
};

export default Loader;

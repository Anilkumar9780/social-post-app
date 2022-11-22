import React from "react";

//component
import Feed from '../../components/feed/Feed'
import Navbar from "../../components/navbar/Navbar";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { PopMessage } from "../../Popupmessage/PopMessage";

//style
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
        <PopMessage />
      </div>
    </div>
  );
};

export default Home;

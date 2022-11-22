import React, { useContext } from "react";

//component
import Storycard from "../storycard/Storycard";
import { Users } from "../../data";
import { AuthContext } from "../../context/AuthContext";

//style
import "./stories.scss";

const Stories = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="stories">
      <div className="storyCard">
        <div className="overlay"></div>
        <img src={currentUser.photoURL} alt="" className="storyProfile" />
        <img src={currentUser.photoURL} alt="" className="storybackground" />
        <img src="/assets/person/upload.png" alt="" className="storyadd" />
        <span className="text">{currentUser.displayName}</span>
      </div>

      {Users.map((u) => (
        <Storycard key={u.id} user={u} />
      ))}
    </div>
  );
};

export default Stories;

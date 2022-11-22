import React from "react";

//style
import "./rightbar.scss";

//component
import ProfileRightBar from "../profileRightBar/ProfileRightBar";
import Rightbarhome from "../rightbarhome/Rightbarhome";

const Rightbar = ({ profile }) => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightBar /> : <Rightbarhome />}
      </div>
    </div>
  );
};

export default Rightbar;

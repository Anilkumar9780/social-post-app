import React, { useContext } from "react";

//style
import "./menuLink.scss";

//component
import { AuthContext } from "../../context/AuthContext";

const MenuLink = ({ Icon, text }) => {
  //get uers detail
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="menuLink">
      {Icon}
      <span className="menuLinkText">{text}</span>
      <span className="menuLinkTextName">
        {text === "Logout" && `(${currentUser.displayName})`}
      </span>
    </div>
  );
};

export default MenuLink;

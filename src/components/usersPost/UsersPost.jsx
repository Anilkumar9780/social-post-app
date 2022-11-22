import React, { useEffect, useState, useContext } from "react";

//component
import Stories from "../stories/Stories";
import Share from "../share/Share";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

//style
import "./usersPost.scss";

//packages
import { doc, onSnapshot } from "firebase/firestore";
import TimeAgo from "react-timeago";
import { Link } from "react-router-dom";
import { MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const UsersPost = () => {
  // states
  const [usersPosts, setUsersPosts] = useState([]);
  const { currentUser } = useContext(AuthContext);

  //get users posts
  useEffect(() => {
    const getUsersPost = () => {
      const unSub = onSnapshot(
        doc(db, "usersPosts", currentUser.uid),
        (doc) => {
          doc.exists() && setUsersPosts(doc.data().messages);
        }
      );
      return () => {
        unSub();
      };
    };
    currentUser.uid && getUsersPost();
  }, [currentUser.uid]);
  console.log(usersPosts)

  return (
    <div className="feedUsersPost">
      <div className="feedUsersPostWrapper">
        <Stories />
        <Share />
        {usersPosts
          .sort((a, b) => b.timestamp - a.timestamp)
          .map((m) => (
            <div className="usersPost" key={m.id}>
              <div className="usersPostWrapper">
                <div className="postTop">
                  <div className="postTopLeft">
                    <Link to="/profile/userId">
                      <img src={m.photoURL} alt="" className="postProfileImg" />
                    </Link>
                    <span className="postUsername">
                      @{m.displayName.replace(/\s+/g, "").toLowerCase()}
                    </span>
                    <span className="postDate">
                      <TimeAgo
                        date={new Date(m.timestamp?.toDate()).toLocaleString()}
                      />
                    </span>
                  </div>
                  <div className="postTopRight">
                    <IconButton>
                      <MoreVert className="postVertButton" />
                    </IconButton>
                  </div>
                </div>
                <div className="postCenter">
                  <span className="postText">{m.input}</span>
                  <img src={m.img} alt="" className="postImg" />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default UsersPost;

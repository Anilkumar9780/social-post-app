import React, { useState, useEffect } from "react";

//firebase component
import { collection, onSnapshot } from "firebase/firestore";

//component
import { db } from "../../firebase";
import Post from "../post/Post";
import Share from "../share/Share";
import Stories from "../stories/Stories";

//styles
import "./feed.scss";

const Feed = () => {
  //states
  const [posts, setPosts] = useState([]);

  //get the post
  useEffect(() => {
    const unSub = onSnapshot(collection(db, "posts"), (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
    return () => {
      unSub();
    };
  }, []);
  // console.log(posts);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Stories />
        <Share />
        {posts
          .sort((a, b) => b.data.timestamp - a.data.timestamp)
          .map((p) => (
            <Post key={p.id} post={p} />
          ))}
      </div>
    </div>
  );
};

export default Feed;

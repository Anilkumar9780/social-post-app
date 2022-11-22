import React, { useState } from "react";

//firebase components
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";

//styel scss
import "./register.scss";

//mui packages
import { DriveFolderUploadOutlined } from "@mui/icons-material";

//package
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

//component
import { Loaders } from '../../Loader/Loader'

const Register = () => {
  //states
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * handle Register User
   * @param {object} e 
   */
  const handleRegister = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, "usersImages/" + displayName);
      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error) => {
          toast.error(error, "Something went wrong", {
            position: toast.POSITION.TOP_RIGHT
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "usersPosts", res.user.uid), { messages: [] });
          });
        }
      );
    } catch (error) {
      toast.error(error, "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
    }
    navigate("/login")
    toast.success("Register Successfully", {
      position: toast.POSITION.TOP_RIGHT
    });
    setLoading(false);
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">ConnectBook</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on ConnectBook.
          </span>
        </div>
        <div className="registerRight">
          <div className="registerBox">
            <div className="top">
              <img
                src={
                  img
                    ? URL.createObjectURL(img)
                    : "/assets/profileCover/DefaultProfile.jpg"
                }
                alt=""
                className="profileImg"
              />
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept=".png,.jpeg,.jpg"
                    style={{ display: "none" }}
                    onChange={(e) => setImg(e.target.files[0])}
                  />
                </label>
              </div>
            </div>
            <div className="bottom">
              <form onSubmit={handleRegister} className="bottomBox">
                <input
                  type="text"
                  placeholder="Name"
                  id="displayName"
                  className="registerInput"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="registerInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="registerInput"
                  minLength={6}
                  required
                />
                <button type="submit" className="registerButton">
                  Sign Up
                </button>
                <Link to="/login">
                  <button className="loginRegisterButton">
                    Log into Account
                  </button>
                </Link>
              </form>
              {/* loaders */}
              <Loaders loader={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

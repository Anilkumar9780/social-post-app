import React, { useContext, useState } from "react";

//component
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { db, storage } from "../../firebase";
import { Loaders } from '../../Loader/Loader';

//packages
import { v4 as uuid } from "uuid";
import { useNavigate } from "react-router-dom";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { toast } from 'react-toastify';

//styles
import "./editProfile.scss";

//firebase component
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  updateProfile,
} from "firebase/auth";


const EditProfile = () => {
  //states
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    newEmail: "",
    phone: "",
    age: "",
    country: "",
    relationship: "",
    oldPassword: "",
  });
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * onchange in text
   * @param {object} e 
   */
  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * handle update user Deatils
   * @param {object} e 
   */
  const handleUpdate = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (img) {
      const storageRef = ref(storage, "usersImages/" + uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          toast.error(error, "Something went wrong", {
            position: toast.POSITION.TOP_RIGHT
          })
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(currentUser, {
              displayName: data.name,
              email: data.newEmail,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "users", currentUser.uid), {
              uid: currentUser.uid,
              photoURL: downloadURL,
              displayName: data.name,
              email: data.newEmail,
              phone: data.phone,
              age: data.age,
              country: data.country,
              relationship: data.relationship,
              createdAt: serverTimestamp(),
            });

            const credential = EmailAuthProvider.credential(
              currentUser.email,
              data.oldPassword
            );

            await reauthenticateWithCredential(currentUser, credential).then(
              async () => {
                //User reauthenticate
                await updateEmail(currentUser, data.newEmail);
              }
            );
          });
        }
      );
    } else {
      await updateProfile(currentUser, {
        displayName: data.name,
        email: data.newEmail,
      });

      await setDoc(doc(db, "users", currentUser.uid), {
        uid: currentUser.uid,

        displayName: data.name,
        email: data.newEmail,
        phone: data.phone,
        age: data.age,
        country: data.country,
        relationship: data.relationship,
        createdAt: serverTimestamp(),
      });

      const credential = EmailAuthProvider.credential(
        currentUser.email,
        data.oldPassword
      );

      await reauthenticateWithCredential(currentUser, credential).then(
        async () => {
          //User reauthenticate
          await updateEmail(currentUser, data.newEmail);
        }
      );
    }
    navigate("/login");
    setLoading(false);
    toast.success("Saved Successfully", {
      position: toast.POSITION.TOP_RIGHT
    })
  };
  // console.log(data);
  return (
    <div className="editProfile">
      <Navbar />
      <div className="editProfileWrapper">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="/assets/profileCover/profilecover.jpg"
                alt=""
                className="profileCoverImg"
              />
              <img
                src={currentUser.photoURL}
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{currentUser.displayName}</h4>
              <span className="profileInfoDesc">Hi Friends!</span>
            </div>
          </div>
          <div className="editprofileRightBottom">
            <div className="top">
              <h1>Edit User Profile</h1>
            </div>
            <div className="bottom">
              <div className="left">
                <img
                  src={
                    img
                      ? URL.createObjectURL(img)
                      : "/assets/profileCover/DefaultProfile.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="right">
                <form onSubmit={handleUpdate}>
                  <div className="formInput">
                    <label htmlFor="file">
                      Image: <DriveFolderUploadOutlined className="icon" />
                    </label>
                    <input
                      type="file"
                      id="file"
                      style={{ display: "none" }}
                      onChange={(e) => setImg(e.target.files[0])}
                    />
                  </div>
                  <div className="formInput">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Jane Doe"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="formInput">
                    <label>Email</label>
                    <input
                      type="email"
                      name="newEmail"
                      placeholder="jane_doe@gmail.com"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Phone</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+4 123 456 789"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Age</label>
                    <input
                      type="text"
                      placeholder="Enter Your Age"
                      name="age"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      placeholder="United Kingdom"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Relationship</label>
                    <input
                      type="text"
                      name="relationship"
                      placeholder="Enter Your Status"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="formInput">
                    <label>Password</label>
                    <input
                      type="password"
                      name="oldPassword"
                      placeholder="Enter Your Old Password"
                      onChange={handleChange}
                    />
                  </div>
                  <button type="submit" className="updateButton">
                    Update Profile
                  </button>
                </form>
                <Loaders loader={loading} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

import React, { useState } from "react";

//firebase component
import { signInWithEmailAndPassword } from "firebase/auth";

//package
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

//style scss
import "./login.scss";

//component
import { auth } from "../../firebase";
import { Loaders } from '../../Loader/Loader';

const Login = () => {
  //states
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * handle login User
   * @param {object} e 
   */
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
      toast.success("Login Successfully", {
        position: toast.POSITION.TOP_RIGHT
      })
    } catch (error) {
      toast.error(error, "Something went wrong", {
        position: toast.POSITION.TOP_RIGHT
      })
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ConnectBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on ConnectBook.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <div className="bottom">
              <form onSubmit={handleLogin} className="bottomBox">
                <input
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="loginInput"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="loginInput"
                  minLength={6}
                  required
                />

                <button type="submit" className="loginButton">
                  Sign In
                </button>
                <Link to="/register">
                  <button className="loginRegisterButton">
                    Create a New Account
                  </button>
                </Link>
                {/* loaders */}
                <Loaders loader={loading} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

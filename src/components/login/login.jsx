import React, { useEffect, useState } from "react";
import "./style.scss";
import fb from "./images/fb.png";
import gp from "./images/gp.png";
import tw from "./images/tw.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Footer from "../footer/Footer";

const Login = () => {
  const [changeTab, setChangeTab] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const userAlreadyExist = JSON.parse(localStorage.getItem("LoginToken"));

    if (userAlreadyExist) {
      console.log("HIII");
      //navigate("/dashboard");
      return;
    }
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();

    console.log("hiii");

    if (name.length == 0 || email.length == 0 || pass.length == 0) {
      setError("All Fields are Required!");

      setTimeout(() => {
        setError("");
      }, 1000);
    }

    // const res = await axios.get("http://localhost:8001/dummy");
    // const data = await res;
    // console.log(data.data);

    //call register api and save the user
    const res = await axios.post(`http://localhost:8001/register`, {
      name: name,
      password: pass,
      email: email,
    });

    const data = await res;

    //console.log(data);

    setChangeTab(!changeTab);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    console.log("hiii");

    if (email.length == 0 || pass.length == 0) {
      setError("All Fields are Required!");

      setTimeout(() => {
        setError("");
      }, 1000);
    }

    const res = await axios.post(`http://localhost:8001/login`, {
      email,
      password: pass,
    });

    const data = await res;

    if (data.data.message == "Please enter Correct Email") {
      setError("Please Enter Correct Email");

      setTimeout(() => {
        setError("");
      }, 1000);
    } else if (data.data.message == "please enter Correct password") {
      setError("Please Enter Correct Password");

      setTimeout(() => {
        setError("");
      }, 1000);
    } else {
      localStorage.setItem("LoginToken", JSON.stringify(data.data.token));

      setError("User Logged In Successfully!");

      navigate("/");

      setTimeout(() => {
        setName("");
        setPass("");
        setError("");
      }, 1000);
    }
  };

  return (
    <div>
      <ContentWrapper>
        <div className="login-container">
          <div className="form-box">
            <div className="login-button-box">
              <div
                id="login-btn"
                style={{ left: !changeTab ? "110px" : "0px" }}
              ></div>
              <button
                className="login-toggle-btn"
                onClick={() => setChangeTab(!changeTab)}
              >
                Login
              </button>
              <button
                className="login-toggle-btn"
                onClick={() => setChangeTab(!changeTab)}
              >
                Register
              </button>
            </div>
            <div className="login-social-icons">
              <a href="https://www.facebook.com" target="_blank">
                <img src={fb} alt="Facebook Image" />
              </a>
              <a href="https://www.google.com" target="_blank">
                <img src={gp} alt="Google Image" />
              </a>
              <a href="https://www.twitter.com" target="_blank">
                <img src={tw} alt="Twitter Image" />
              </a>
            </div>
            {changeTab ? (
              <form id="login" className="login-input-group">
                <input
                  type="email"
                  className="login-input-field"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="login-input-field"
                  placeholder="Enter Password"
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <p className="login-error">{error}</p>

                <input type="checkbox" className="login-check-box" id="" />
                <span>Remember Password</span>
                <button
                  type="submit"
                  onClick={loginUser}
                  className="login-submit-btn"
                >
                  Log in
                </button>
              </form>
            ) : (
              <form id="register" className="login-input-group">
                <input
                  type="text"
                  className="login-input-field"
                  placeholder="User Id"
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  className="login-input-field"
                  placeholder="Email Id"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  className="login-input-field"
                  placeholder="Enter Password"
                  onChange={(e) => setPass(e.target.value)}
                  required
                />
                <p className="login-error">{error}</p>

                <input type="checkbox" className="login-check-box" id="" />
                <span>I agree to the terms & conditions</span>
                <button
                  type="submit"
                  onClick={registerUser}
                  className="login-submit-btn"
                >
                  Register
                </button>
              </form>
            )}
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Login;

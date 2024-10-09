import { useInputValidation } from "6pp";
import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { server } from "../constants/config.js";
import { userExists } from "../redux/reducers/auth.js";
import {
  EmailValidator,
  PasswordValidator,
  UsernameValidator,
} from "../utils/validation.jsx";
const Login = () => {
  const dispatch = useDispatch();
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const username = useInputValidation("", UsernameValidator);
  const password = useInputValidation("", PasswordValidator);
  const email = useInputValidation("", EmailValidator);
  const bio = useInputValidation("", UsernameValidator);

  const toggleLogin = () => {
    setLoggedIn(!isLoggedIn);
  };
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    const config = {
      credentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      //must create an input tag for inputting the profile picture of the user!!!
      const formData = new FormData();
      formData.append("name", username.value);
      formData.append("email", email.value);
      formData.append("password", password.value);
      formData.append("bio", bio.value);
      ////////////////////////////////////////
      if (avatar) formData.append("avatar", avatar);

      ///////////////////////////////////////
      //must send file too!
      const { data } = await axios.post(
        `${server}/api/v1/user/register`,
        formData,
        config
      );

      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        `${server}/api/v1/user/login`,
        {
          email: email.value,
          password: password.value,
        },
        config
      );
      dispatch(userExists(true));
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Oops! Something went wrong"
      );
    }
  };

  return (
    <>
      <section className="flex justify-center items-center h-screen bg-blue-500">
        {isLoggedIn ? (
          <>
            <div className="flex flex-col items-center w-[30%] h-[30rem] shadow-2xl bg-white rounded-xl">
              <h1 className="mt-16">LogIn</h1>
              <form className="mt-8">
                <TextField
                  required
                  id="email"
                  type="text"
                  variant="outlined"
                  label="Email"
                  value={email.value}
                  onChange={email.changeHandler}
                ></TextField>
                <br />
                <br />
                {email.error && (
                  <h5 className="text-red-600">Email is invalid</h5>
                )}
                <TextField
                  required
                  id="password"
                  type="password"
                  variant="outlined"
                  label="Password"
                  value={password.value}
                  onChange={password.changeHandler}
                ></TextField>
                <br />
                <br />
                {password.error && (
                  <h5 className="text-green-700">Passowrd is weak</h5>
                )}

                <Button
                  onClick={handleLogin}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Log In
                </Button>
                <br />
                <br />
                <Button
                  onClick={toggleLogin}
                  variant="outlined"
                  color="primary"
                >
                  Sign Up Instead
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center w-[30%] h-[40rem] shadow-2xl bg-white rounded-xl">
              <h1 className="mt-16">Sign Up</h1>
              <form className="mt-8">
                <TextField
                  required
                  id="username"
                  type="text"
                  variant="outlined"
                  label="Name"
                  value={username.value}
                  onChange={username.changeHandler}
                ></TextField>
                <br />
                <br />
                {username.error && (
                  <h5 className="text-red-600">username is invalid</h5>
                )}

                <TextField
                  required
                  id="email"
                  type="text"
                  variant="outlined"
                  label="Email"
                  value={email.value}
                  onChange={email.changeHandler}
                ></TextField>
                <br />
                <br />
                {email.error && (
                  <h5 className="text-red-600">Email is invalid</h5>
                )}

                <TextField
                  required
                  id="password"
                  type="password"
                  variant="outlined"
                  label="Password"
                  value={password.value}
                  onChange={password.changeHandler}
                ></TextField>
                <br />
                <br />
                {password.error && (
                  <h5 className="text-red-600">password is weak</h5>
                )}
                <input type="file" id="avatar" onChange={handleFileChange} />
                <br />
                <br />
                <TextField
                  required
                  id="bio"
                  type="text"
                  variant="outlined"
                  label="Bio"
                  value={bio.value}
                  onChange={bio.changeHandler}
                ></TextField>
                <br />
                <br />
                <Button
                  onClick={handleSignUp}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Sign In
                </Button>
                <br />
                <br />
                <Button
                  onClick={toggleLogin}
                  variant="outlined"
                  color="primary"
                >
                  Login Instead
                </Button>
              </form>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Login;

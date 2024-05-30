import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { darkTheme, registered, userData } from "../../atoms";
import Button from "../button";
import TextInput from "../input";

const SignIn = ({ signState, onAnimation, handleLogin, handleRegister }) => {
  const [savedRegistered, setSavedRegistered] = useAtom(registered);
  const [loginError, setLoginError] = useState("");
  const [userInfo, setUserData] = useAtom(userData);
  const isDark = useAtomValue(darkTheme);
  const [userCredentials, setUserCredentials] = useState({
    email: savedRegistered?.email || "",
    password: savedRegistered?.password || "",
  });

  useEffect(() => {
    setUserCredentials({
      email: savedRegistered?.email || "",
      password: savedRegistered?.password || "",
    });
  }, [savedRegistered]);

  const navigate = useNavigate();

  function handleChangeInput(e) {
    // if (e.target.value == "") {
    setSavedRegistered(null);
    // }
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    setLoginError("");
  }

  function handleLogIn(e) {
    e.preventDefault();
    // userInstance
    //   .post("/login", userCredentials)
    //   .then((response) => {
    localStorage.setItem("auth-token", userCredentials);
    setUserData(userCredentials);
    toast.success("Successfully Logged In!");
    setSavedRegistered(null);
    // })
    // .catch((err) => {
    //   console.log("Unable to log : ", err.response.data);
    //   setLoginError(err.response.data.msg);
    //   addToast(err.response.data.msg, {
    //     appearance: "warning",
    //     autoDismiss: true,
    //   });
    // });
  }

  return (
    <div
      className={`${
        signState == "log_in"
          ? " z-0 duration-1000 scale-[1.03]"
          : onAnimation
          ? " -translate-y-[550px] absolute opacity-50   duration-700"
          : "translate-y-96 absolute opacity-0 -z-10 duration-[1200ms]"
      } w-full sm:w-[480px] min-h-[500px] max-w-full flex flex-col items-center justify-center rounded-lg px-7 pt-7 pb-10 shadow-xl  ${
        isDark ? "bg-slate-600" : "bg-white"
      }`}
    >
      <div className="text-center mb-8">
        <h1
          className={`text-2xl font-bold uppercase text-darkBlue  ${
            isDark ? "text-white" : "text-darkBlue"
          }`}
        >
          Sign In
        </h1>
        <h1
          className={` text-darkBlue opacity-90  ${
            isDark ? "text-slate-300 " : "text-darkBlue"
          }`}
        >
          Login to your account
        </h1>
      </div>

      <form className=" w-full">
        <div className="grid gap-5">
          <TextInput
            type={"email"}
            name={"email"}
            value={userCredentials.email}
            placeholder={"Email"}
            onChange={handleChangeInput}
          />
          <TextInput
            type={"password"}
            name={"password"}
            value={userCredentials.password}
            placeholder={"Password"}
            password
            onChange={handleChangeInput}
          />
        </div>
        <p className=" text-right p-1 text-sm text-secondaryHover cursor-pointer">
          forgot password?
        </p>
        <p className=" text-red-500 text-sm ">{loginError}</p>
        <div className=" w-full mt-4">
          <Button
            label={"LOG IN"}
            secondary
            bold
            shadow
            onClick={handleLogIn}
          />
          <div className="  text-center my-2 flex justify-center items-center px-2">
            <div className=" w-full h-[2px] bg-gray-300" />
            <p
              className={`mx-3 mb-1  ${
                isDark ? "text-white" : "text-darkBlue"
              }`}
            >
              or
            </p>
            <div className=" w-full h-[2px] bg-gray-300" />
          </div>
        </div>
      </form>
      <Button
        label={"REGISTER"}
        color={"bg-[#96a1d8]"}
        onClick={handleRegister}
      />
    </div>
  );
};

export default SignIn;

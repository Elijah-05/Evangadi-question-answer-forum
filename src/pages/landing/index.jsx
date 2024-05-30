import React, { useEffect, useState } from "react";
import Aos from "aos";
import Description from "../../components/card/Description";
import SignIn from "../../components/card/SignIn";
import SignUp from "../../components/card/SignUp";
import { useAtom } from "jotai";
import { logAnimation, logState } from "../../atoms";

const LandingPage = () => {
  const [signState, setSignState] = useAtom(logState);
  const [onAnimation, setOnAnimation] = useAtom(logAnimation);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [signState]);

  function handleToggleSign(sign) {
    setSignState(sign);
    setOnAnimation(true); //Animation Started
    setTimeout(() => {
      setOnAnimation(false); //Animation end after 700ms
    }, 700);
  }

  return (
    <div className=" landing-screen-height flex flex-col lg:flex-row justify-center items-center py-10 gap-8 ">
      <div
        data-aos="fade-up"
        className={` ${
          onAnimation ? "" : ""
        } w-full sm:w-auto flex flex-col items-center`}
      >
        <SignIn
          handleRegister={() => handleToggleSign("sign_up")}
          signState={signState}
          onAnimation={onAnimation}
        />

        <SignUp
          handleLogIn={() => handleToggleSign("log_in")}
          handleRegister={handleToggleSign}
          signState={signState}
          onAnimation={onAnimation}
        />
      </div>
      <Description />
    </div>
  );
};

export default LandingPage;

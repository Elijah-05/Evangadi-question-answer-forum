import React, { useEffect, useState } from "react";
import LandingPage from "../landing";
import {
  answerInstance,
  questionInstance,
  userInstance,
} from "../../axios/instance";
import { useAtom, useAtomValue } from "jotai";
import { darkTheme, questions, userData } from "../../atoms";
import Button from "../../components/button";
import { Link, useNavigate } from "react-router-dom";
import QuestionCard from "../../components/card/QuestionCard";

const HomePage = () => {
  const [userInfo, setUserInfo] = useAtom(userData);
  const isDark = useAtomValue(darkTheme);
  const [getQuestions, setQuestions] = useAtom(questions);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("auth-token");
  const [prevScrollYPos, setPrevScrollYPos] = useState(window.scrollY);
  const [showNav, setShowNav] = useState(true);
  const [onAnimation, setOnAnimation] = useState(false);

  function handleScroll() {
    let currentScrollY = window.scrollY;
    setOnAnimation(true);

    const isScrollTopTrue = currentScrollY < prevScrollYPos + showNav && 20;

    setPrevScrollYPos(currentScrollY);
    setTimeout(() => {
      setOnAnimation(false);
    }, 700);

    setShowNav(isScrollTopTrue);
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollYPos]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // useEffect(() => {
  //   if (userInfo?.user?.display_name) {
  //     fetchAllQuestions();
  //     fetchAllAnswers();
  //   }
  // }, [userInfo]);

  const fetchAllQuestions = async () => {
    setIsLoading(true);
    !!token &&
      (await questionInstance
        .get("/", {
          headers: {
            "x-auth-token": token,
          },
        })
        .then((response) => {
          setQuestions(response.data.reverse());
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Unable to fetch questions: ", err);
          setIsLoading(false);
        }));
  };

  const fetchAllAnswers = async () => {
    await answerInstance
      .get("/all", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((response) => {
        setAnswers(response.data);
      })
      .catch((err) => {
        console.log("Error while fetching all ansers: ", err);
      });
  };

  function handleQuestionDetail(question) {
    navigate(`/answers/${question.question_id}`, { state: { question } });
  }

  return (
    <div className="min-h-screen ">
      {!localStorage.getItem("auth-token") ? (
        <LandingPage />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div
            className={`z-40 py-4 xs:py-4 mx-1 lg:mx-0 gap-2 px-4 rounded-md sticky top-[88px] left-0 right-0 flex flex-col xs:flex-row justify-between xs:items-center shadow-[6px_4px_12px_0px_rgba(0,0,0,0.14)] ${
              showNav
                ? ""
                : `-translate-y-[85px] ${!onAnimation && "opacity-0 "}`
            } ${isDark ? "bg-slate-600" : "bg-slate-100"} duration-700`}
          >
            <h1
              className={`text-xl sm:text-2xl text-center md:text-left text-darkBlue font-medium ${
                isDark ? "text-slate-100" : "text-darkBlue"
              }`}
            >
              Welcome: <span className=" ">{userInfo?.user?.display_name}</span>
            </h1>
            <Link to={"/ask"} className="">
              <Button label={"Ask Question"} primary />
            </Link>
          </div>

          <div className=" mt-10 px-2 md:px-2 md:mx-4 xl:mx-0 ">
            <h1
              className={`ml-1 text-xl xs:text-xl mb-3 text-center md:text-left font-medium ${
                isDark ? "text-slate-300" : "text-darkBlue"
              }`}
            >
              Questions{" "}
              <span className="text-lg xs:text-lg text-secondary">
                {getQuestions?.length}
              </span>
            </h1>
            {!isLoading ? (
              <div className="mt-2 flex flex-col gap-4 mb-20">
                {getQuestions?.reverse().map((question) => {
                  return (
                    <QuestionCard
                      questionData={question}
                      noOfAnswers={
                        answers?.filter(
                          (ans) => ans.question_id === question.question_id
                        ).length
                      }
                      onClick={handleQuestionDetail}
                      key={question.question_id}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="">No qest</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;

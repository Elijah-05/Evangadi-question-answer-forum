import React from "react";
import { FaChevronDown } from "react-icons/fa6";
import CircleAvatar from "../circle_avatar";
import { user_profile } from "../../assets";
import { useAtomValue } from "jotai";
import { darkTheme } from "../../atoms";

const QuestionCard = ({ questionData, noOfAnswers, onClick, forAnswer }) => {
  const isDark = useAtomValue(darkTheme);
  const { question_id, question, first_name, last_name, question_description } =
    questionData || {
      question_id: "",
      question: "Place holder question title here",
      first_name: "first name",
      last_name: "last name",
      question_description:
        "Question description here... this is a place holder befor you pass a real question desctiption this shows how it looks Question description here...",
    };

  return (
    <div
      className={`group flex flex-col md:flex-row items-start gap-2 md:gap-4 ${
        !forAnswer &&
        "  scale-[0.995] hover:scale-[1.005] hover:shadow-[6px_5px_12px_0px_rgba(0,0,0,0.15)]"
      } ${forAnswer && "shadow-[0px_5px_10px_0px_rgba(0,0,0,0.05)]"} ${
        isDark
          ? "bg-slate-600 hover:bg-slate-500"
          : "bg-slate-100 hover:bg-slate-200"
      } p-2 sm:p-3 rounded-md cursor-pointer duration-500`}
      key={question_id}
      onClick={() => onClick && onClick(questionData)}
    >
      <div className="flex flex-row md:flex-col mt-1 shrink-0 max-w-min  items-center gap-2">
        <CircleAvatar imagePath={user_profile} size={35} />
        <p className=" opacity-75">{questionData.answers.length || 0}</p>
      </div>
      <div className=" w-full  flex items-center justify-between">
        <div className="">
          <p className="mb-[2px] text-sm md:text-base text-secondary opacity-60 font-mono">
            {`${first_name} ${last_name}`}
          </p>
          <p
            className={`text-base sm:text-lg font-medium -mt-2 text-primaryHover ${
              isDark ? "text-slate-100" : "text-darkBlue"
            }`}
          >
            {question}
          </p>
          <p
            className={`text-sm sm:text-base text-gray-500 mr-4 ${
              isDark ? "text-slate-300" : "text-darkBlue"
            }`}
          >
            {question_description}
          </p>
        </div>
        {!forAnswer && (
          <div
            className={` text-xs sm:text-base mr-3 sm:-translate-x-4 sm:group-hover:translate-x-0 text-slate-600 -rotate-90 duration-500 ${
              isDark ? "text-slate-100" : "text-darkBlue"
            }`}
          >
            <FaChevronDown />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;

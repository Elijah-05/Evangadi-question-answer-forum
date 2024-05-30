import React from "react";
import { darkTheme } from "../../atoms";
import { useAtomValue } from "jotai";

const AnswerCard = ({ answerData }) => {
  const isDark = useAtomValue(darkTheme);
  const { answer, user_name } = answerData;
  return (
    <div className="">
      <p className=" text-secondary opacity-70">{user_name}</p>
      <p className={`${isDark ? " text-slate-300" : " text-darkBlue"}`}>
        {answer}
      </p>
    </div>
  );
};

export default AnswerCard;

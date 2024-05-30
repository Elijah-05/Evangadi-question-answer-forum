import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { darkTheme } from "../../atoms";
import { useAtomValue } from "jotai";

const TextInput = ({ type, value, name, placeholder, onChange, password }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isDark = useAtomValue(darkTheme);

  return (
    <div className="relative">
      <input
        className={`border-2 outline-[rgba(241,151,72,0.5)] block p-2 w-full rounded-md  ${
          isDark ? "bg-darkBlue text-white" : ""
        }`}
        type={password && showPassword ? "text" : type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      {password && (
        <div
          className={`absolute text-lg right-2 bottom-0 -translate-y-2 p-1 cursor-pointer ${
            isDark ? "text-white" : "text-darkBlue"
          }`}
          onClick={() => setShowPassword(!showPassword)}
        >
          {!showPassword ? (
            <FaRegEye className=" text-lg " />
          ) : (
            <FaRegEyeSlash className=" text-lg " />
          )}
        </div>
      )}
    </div>
  );
};

export default TextInput;

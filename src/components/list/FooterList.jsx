import React from "react";

const FooterList = ({ lists, head }) => {
  return (
    <div className="">
      <h1 className=" tet-white text-[1.05rem] font-semibold cursor-default mb-2 text-secondaryHover">
        {head}
      </h1>
      <ul className="grid gap-2">
        {lists?.map((list, index) => {
          return (
            <li
              className=" text-sm text-slate-300 hover:text-secondaryHover duration-300 cursor-pointer"
              key={list + index}
            >
              {list}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FooterList;

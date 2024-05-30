import React, { useEffect, useState } from "react";

const CircleAvatar = ({ imagePath, alt, size = 11 }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function handleResize() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (screenWidth <= 768) {
    size = 25;
  }

  return (
    <div
      className={` opacity-50 overflow-hidden rounded-full ring-[3px] ring-darkBlue`}
      style={{ height: size, width: size }}
    >
      <img className=" object-cover w-full h-full" src={imagePath} alt={alt} />
    </div>
  );
};

export default CircleAvatar;

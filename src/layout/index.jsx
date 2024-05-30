import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer";
import ScrollUpButton from "../components/button/ScrollUpButton";
import { useAtom, useAtomValue } from "jotai";
import { darkTheme } from "../atoms";

const Layout = () => {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [isDark, setTheme] = useAtom(darkTheme);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth",
    });
  }, [location]);

  useEffect(() => {
    const handleScrollEvent = () => {
      if (window.scrollY > 200) {
        setShowScrollBtn(true);
      } else setShowScrollBtn(false);
    };
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  return (
    <main
      className={` min-h-screen flex flex-col ${
        isDark ? "bg-darkBlue" : "bg-slate-50"
      } duration-500`}
    >
      {/* Header Naviagtion Bar */}
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>

      {/* Main Content Body Section */}
      <section className="">
        <Outlet />
        <ScrollUpButton showScrollBtn={showScrollBtn} />
      </section>

      {/* Footer Section */}
      <footer className=" z-40 mt-10 ">
        <Footer />
      </footer>
    </main>
  );
};

export default Layout;

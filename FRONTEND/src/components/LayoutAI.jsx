import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "./SideBar";
import { X, Menu } from "lucide-react";
import { useUser , SignIn} from "@clerk/clerk-react";

const LayoutAI = () => {
  const navigate = useNavigate();
  const [showSideBar, setShowSideBar] = useState(window.innerWidth >= 768);

  const {user} = useUser();


  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setShowSideBar(!mobile);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (user) ? (
    <div className="position-relative">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg px-4 py-1"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <p
            className="navbar-brand fw-bold fs-3 text-primary m-0"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            AImpress
          </p>
          {showSideBar ? (
            <X
              onClick={() => setShowSideBar(false)}
              className="text-secondary border border-secondary fs-7 w-5 h-5"
              style={{ cursor: "pointer" }}
            />
          ) : (
            <Menu
              onClick={() => setShowSideBar(true)}
              className="text-secondary border border-secondary fs-7 w-5 h-5"
              style={{ cursor: "pointer" }}
            />
          )}
        </div>
      </nav>

      {/* Main layout */}
      <div className="d-flex flex-row position-absolute w-100" style={{ top: "62px" }}>
        <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />

        <div
          className="transition-all"
          style={{
            marginLeft: showSideBar ? "240px" : "0px",
            width: showSideBar ? "calc(100% - 240px)" : "100%",
            transition: "all 0.3s ease",
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="vw-100 vh-100 d-flex justify-content-center align-items-center">

      <SignIn/>
    </div>
  );
};

export default LayoutAI;

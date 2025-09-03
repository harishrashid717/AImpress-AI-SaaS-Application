import React from "react";
import { Rocket } from "lucide-react";
import { useClerk, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, openSignIn } = useClerk();
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg px-4 py-2 "
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.3)", // more transparent
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

        {user ? (
          <UserButton />
        ) : (
          <button
            className="btn btn-outline-primary d-flex align-items-center gap-2 px-3 py-2 rounded-pill fw-semibold shadow-sm"
            onClick={() => openSignIn()}
            aria-label="Get Started"
          >
            <Rocket size={18} />
            Get Started
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

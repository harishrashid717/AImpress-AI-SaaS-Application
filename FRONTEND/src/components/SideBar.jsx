import React from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  House,
  SquarePen,
  Hash,
  Image,
  Eraser,
  Scissors,
  FileText,
  Users,
  LogOut,
  X
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ showSideBar, setShowSideBar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!user) {
    return <p>Loading...</p>;
  }

  const navItems = [
    { to: "/ai", label: "Dashboard", Icon: House },
    { to: "/ai/write-article", label: "Write Article", Icon: SquarePen },
    { to: "/ai/blog-titles", label: "Blog Titles", Icon: Hash },
    { to: "/ai/generate-images", label: "Generate Images", Icon: Image },
    { to: "/ai/remove-background", label: "Remove Background", Icon: Eraser },
    { to: "/ai/remove-object", label: "Remove Object", Icon: Scissors },
    { to: "/ai/review-resume", label: "Review Resume", Icon: FileText },
    { to: "/ai/community", label: "Community", Icon: Users },
  ];

  return (
    <div
      className="bg-white border-end d-flex flex-column justify-between align-items-center position-fixed bottom-0 p-3 v-100"
      style={{
        top: "62px",
        width: "240px",
        transform: showSideBar ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 1040,
      }}
    >
      {/* Close button on small screens */}
      <div className="w-100 text-end d-md-none">
        <X
          role="button"
          onClick={() => setShowSideBar(false)}
          className="text-secondary"
          style={{ cursor: "pointer", fontSize: "1.5rem" }}
        />
      </div>

      {/* User info */}
      <div className="mt-3 w-100 text-center">
        <img
          src={user.imageUrl}
          alt="User avatar"
          className="rounded-circle mx-auto d-block"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />
        <h6 className="mt-3">{user.fullName}</h6>
      </div>

      {/* Navigation Links */}
      <div className="mx-1 my-2 v-100">
        {navItems.map(({ to, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/ai"}
            className={({ isActive }) =>
              `w-100 d-flex align-items-center gap-2 px-3 py-2 rounded text-decoration-none fw-small  ${
                isActive ? "bg-primary text-white" : "text-secondary"
              }`
            }
            style={{
              fontSize : "14px"
            }}
          >
            <Icon
              className="me-2 flex-shrink-0"
              style={{ width: "20px", height: "20px" }}
            />
            <span>{label}</span>
          </NavLink>
        ))}
      </div>

      {/* Footer with Profile and Logout */}
      <div className="w-100 border-top border-secondary-subtle p-3 px-4 d-flex align-items-center justify-content-between cursor-pointer">
        <div onClick={openUserProfile} className="d-flex gap-2 align-items-center cursor-pointer">
          <img src={user.imageUrl} className="rounded-circle" style={{ width: '32px', height: '32px' }} alt="" />
          <div>
            <h1 className="fs-6 fw-medium mb-0">{user.fullName}</h1>
            <p className="mb-0 small text-muted">{/* optional text */}</p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="text-secondary-emphasis"
          style={{ width: '18px', cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseOver={(e) => (e.currentTarget.style.color = '#343a40')}
          onMouseOut={(e) => (e.currentTarget.style.color = '')}
        />
      </div>
    </div>
  );
};

export default Sidebar;

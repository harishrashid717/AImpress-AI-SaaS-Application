import React from "react";
import { AiToolsData } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-3 px-sm-5 px-xl-5 my-5">
      <div className="text-center">
        <h2 className="text-dark fw-semibold" style={{ fontSize: "42px" }}>
          Powerful AI Tools
        </h2>
        <p className="text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Everything you need to create, enhance, and optimize your content with
          cutting-edge AI technology.
        </p>
      </div>

      <div className="d-flex flex-wrap mt-4 justify-content-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-4 m-3 rounded border bg-white shadow-sm"
            style={{
              maxWidth: "300px",
              cursor: "pointer",
              transition: "transform 0.3s",
            }}
            onClick={() => user && navigate(tool.path)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-4px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            <tool.Icon
              className="mb-3 p-2 text-white rounded"
              style={{
                width: "48px",
                height: "48px",
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            />
            <h3 className="mt-3 mb-2 h5 fw-semibold">{tool.title}</h3>
            <p className="text-muted small" style={{ maxWidth: "95%" }}>
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;

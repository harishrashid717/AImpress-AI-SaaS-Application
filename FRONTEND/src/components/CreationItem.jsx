import { useState } from "react";
import MarkDown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="p-3 border rounded bg-white text-body small mb-3">
      <div
        className="d-flex justify-content-between align-items-center gap-3"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: "pointer" }}
      >
        {/* Prompt */}
        <div>
          <h6 className="mb-1">{item.prompt}</h6>
          <p className="text-secondary mb-0">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Type Button */}
        <button
          className="px-3 py-1 border rounded-pill text-primary bg-light border-primary"
          style={{ fontSize: "0.875rem", whiteSpace: "nowrap" }}
        >
          {item.type}
        </button>
      </div>

      {/* Expandable Content */}
      {expanded && (
        <div className="mt-3">
          {item.type === "image" ? (
            <img
              src={item.content}
              alt="creation"
              className="img-fluid"
              style={{ maxWidth: "28rem" }}
            />
          ) : (
            <div
              className="overflow-auto small text-secondary"
              style={{ maxHeight: "300px" }}
            >
              <MarkDown>{item.content}</MarkDown>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;

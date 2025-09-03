import React, { useState } from "react";
import { Sparkles, Edit } from "lucide-react";
import axiosInstance from "../config/axiosInstance";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const WriteArticles = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      const prompt = `Write an article about ${topic} in ${selectedLength.text}`;
      const { data } = await axiosInstance.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
          type: "article",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.article ); 
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false); 
  };

  return (
    <div className="h-100 overflow-auto p-4 d-flex flex-column flex-md-row flex-sm-wrap flex-md-nowrap gap-3 text-secondary">
      {/* Left column */}
      <form
        className="w-90 p-4 bg-white rounded border border-secondary-subtle"
        style={{ maxWidth: "30rem" }}
        onSubmit={handleSubmit}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Sparkles className="text-primary" style={{ width: "1.5rem" }} />
          <h1 className="h5 fw-semibold mb-0">Article Configuration</h1>
        </div>

        <p className="mb-1 small fw-medium">Article Topic</p>
        <input
          type="text"
          className="form-control form-control-sm mb-3"
          placeholder="The future of artificial intelligence is..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <p className="mb-1 small fw-medium">Article Length</p>
        <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
          {articleLength.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedLength(item)}
              className={`badge rounded-pill px-3 py-2 text-wrap ${
                selectedLength.text === item.text
                  ? "bg-primary-subtle text-primary"
                  : "bg-light text-secondary border border-secondary"
              }`}
              style={{ fontSize: "0.75rem", cursor: "pointer" }}
            >
              {item.text}
            </span>
          ))}
        </div>

        <button
          type="submit"
          className="btn btn-primary d-flex justify-content-center align-items-center gap-2 w-100 mt-4"
          disabled={loading}
        >
          {loading ? (
            <>
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              ></div>
              Generating Article...
            </>
          ) : (
            <>
              <Edit style={{ width: "1.25rem" }} />
              Generate article
            </>
          )}
        </button>
      </form>

      {/* Right column */}
      <div
        className="w-100 p-4 bg-white rounded border border-secondary-subtle d-flex flex-column"
        style={{ maxWidth: "40rem", minHeight: "24rem", maxHeight: "600px" }}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Edit
            className="text-primary"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <h1 className="h5 fw-semibold mb-0">Generated article</h1>
        </div>

        {!content ? (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center text-secondary text-center">
            <div className="small d-flex flex-column align-items-center gap-3 text-muted">
              <Edit style={{ width: "2.25rem", height: "2.25rem" }} />
              <p className="mb-0">
                Enter a topic and click "Generate article" to get started
              </p>
            </div>
          </div>
        ) : (
          <div
            className="mt-3 h-100 small text-secondary"
            style={{ overflowY: "scroll" }}
          >
            <Markdown>{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticles;

import { useAuth } from "@clerk/clerk-react";
import { Sparkles, Edit, Hash } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const BlogTitles = () => {
  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];
  const [selectedCategory, setSelectedCategory] = useState(blogCategories[0]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate blog titles for the keyword "${topic}" in the category "${selectedCategory}"`;

      const { data } = await axiosInstance.post(
        "api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.titles);
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
        className="w-60 p-4 bg-white rounded border border-secondary-subtle"
        style={{ maxWidth: "23rem" }}
        onSubmit={handleSubmit}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Sparkles className="text-secondary" style={{ width: "1.5rem" }} />
          <h1 className="h5 fw-semibold mb-0">AI Title Generator</h1>
        </div>

        <p className="mb-1 small fw-medium">Keyword</p>
        <input
          type="text"
          className="form-control form-control-sm mb-3"
          placeholder="The future of artificial intelligence is..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />

        <p className="mb-1 small fw-medium">Category</p>
        <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
          {blogCategories.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedCategory(item)}
              className={`badge rounded-pill px-3 py-2 text-wrap ${
                selectedCategory === item
                  ? "bg-primary-subtle text-primary"
                  : "bg-light text-secondary border border-secondary"
              }`}
              style={{ fontSize: "0.75rem", cursor: "pointer" }}
            >
              {item}
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
              Generating Title...
            </>
          ) : (
            <>
              <Edit style={{ width: "1.25rem" }} />
              Generate Title
            </>
          )}
        </button>
      </form>

      {/* right column */}
      <div
        className="w-100 p-4 bg-white rounded border border-secondary-subtle d-flex flex-column"
        style={{ maxWidth: "40rem", minHeight: "24rem", maxHeight: "600px" }}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Hash
            className="text-primary"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <h1 className="h5 fw-semibold mb-0">Generated Titles</h1>
        </div>

        {!content ? (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center text-secondary text-center">
            <div className="small d-flex flex-column align-items-center gap-3 text-muted">
              <Edit style={{ width: "2.25rem", height: "2.25rem" }} />
              <p className="mb-0">
                Enter a topic and click "Generate Title" to get started
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

export default BlogTitles;

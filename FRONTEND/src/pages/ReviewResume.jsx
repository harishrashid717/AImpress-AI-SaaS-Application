import { useAuth } from "@clerk/clerk-react";
import { FileText, Sparkle } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

const ReviewResume = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  
  
  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) {
      toast.error("Please upload a resume (PDF).");
      return;
    }

    setLoading(true);
    setContent("");

    try {
      const token = await getToken();

      const formData = new FormData();
      formData.append("resume", input);

      const res = await axiosInstance.post("api/ai/review-resume", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setContent(res.data?.content || "No analysis found.");
      toast.success("Resume reviewed successfully!");
    } catch (err) {
      toast.error("Failed to analyze resume.");
      setContent("Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
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
          <Sparkle className="text-secondary" style={{ width: "1.5rem" }} />
          <h1 className="h5 fw-semibold mb-0">Resume Review</h1>
        </div>

        <p className="mb-1 small fw-medium">Upload Resume</p>
        <input
          type="file"
          accept="application/pdf"
          className="form-control form-control-sm mb-3"
          onChange={(e) => setInput(e.target.files[0])}
          required
        />
        <p className="small text-secondary fw-light mt-1">
          Supports PDF resume only.
        </p>
        <button
          type="submit"
          className="btn btn-primary d-flex justify-content-center align-items-center gap-2 w-100 mt-4"
          disabled={loading}
        >
          <FileText style={{ width: "1.25rem" }} />
          {loading ? "Analyzing..." : "Review Resume"}
        </button>
      </form>

      {/* Right column */}
      <div
        className="w-100 p-4 bg-white rounded border border-secondary-subtle d-flex flex-column"
        style={{ maxWidth: "40rem", minHeight: "24rem", maxHeight: "490px" }}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <FileText
            className="text-primary"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <h1 className="h5 fw-semibold mb-0">Analysis Resume</h1>
        </div>

        {/* Content container */}
    {!content ? (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center text-secondary text-center">
            <div className="small d-flex flex-column align-items-center gap-3 text-muted">
              <FileText style={{ width: "2.25rem", height: "2.25rem" }} />
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

export default ReviewResume;

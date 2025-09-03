import React, { useState } from "react";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import axiosInstance from "../config/axiosInstance";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

const GenerateImages = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an image of ${input} in the style ${selectedStyle}`;

      const { data } = await axiosInstance.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.content) {
        setContent(data.content);
        toast.success("Image generated successfully!");
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
          <h1 className="h5 fw-semibold mb-0">AI Image Generator</h1>
        </div>

        <p className="mb-1 small fw-medium">Describe Your Image</p>
        <textarea
          className="form-control form-control-sm mb-3"
          placeholder="Describe what you want to see in the image..."
          value={input}
          rows={5}
          onChange={(e) => setInput(e.target.value)}
          required
        />

        <p className="mb-1 small fw-medium">Style</p>
        <div className="d-flex flex-wrap gap-2 mt-2 mb-3">
          {imageStyle.map((item, index) => (
            <span
              key={index}
              onClick={() => setSelectedStyle(item)}
              className={`badge rounded-pill px-3 py-2 text-wrap ${
                selectedStyle === item
                  ? "bg-primary-subtle text-primary"
                  : "bg-light text-secondary border border-secondary"
              }`}
              style={{ fontSize: "0.75rem", cursor: "pointer" }}
            >
              {item}
            </span>
          ))}
        </div>

        {/* Toggle for Public/Private */}
        <div className="my-4 d-flex align-items-center gap-2">
          <label
            className="position-relative d-inline-block"
            style={{ cursor: "pointer", width: "36px", height: "20px" }}
          >
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="position-absolute top-0 start-0 w-100 h-100 opacity-0 m-0"
            />
            <div
              className={`w-100 h-100 rounded-pill position-relative`}
              style={{
                backgroundColor: publish ? "#22c55e" : "#cbd5e1",
                transition: "background-color 0.3s",
              }}
            >
              <span
                className="bg-white rounded-circle position-absolute top-50"
                style={{
                  width: "12px",
                  height: "12px",
                  left: publish ? "20px" : "4px",
                  transform: "translateY(-50%)",
                  transition: "left 0.3s",
                }}
              ></span>
            </div>
          </label>
          <p className="mb-0 small">Make this image Public</p>
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
              Generating...
            </>
          ) : (
            <>
              <ImageIcon style={{ width: "1.25rem" }} />
              Generate Image
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
          <ImageIcon
            className="text-primary"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <h1 className="h5 fw-semibold mb-0">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center text-secondary text-center">
            <div className="small d-flex flex-column align-items-center gap-3 text-muted">
              <ImageIcon style={{ width: "2.25rem", height: "2.25rem" }} />
              <p className="mb-0">
                Enter a description and click "Generate Image" to get started
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-grow-1 d-flex justify-content-center align-items-center">
            <img
              src={content}
              alt="Generated AI"
              className="img-fluid rounded shadow"
              style={{
                maxWidth: "95%",
                maxHeight: "90%",
                objectFit: "contain",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImages;

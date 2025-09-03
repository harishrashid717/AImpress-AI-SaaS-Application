import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axiosInstance from "../config/axiosInstance"; 
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast"; 

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (object.split(" ").length > 1) {
        toast.error("Please enter only one object name ");
        return;
      }

      setLoading(true);

      const formData = new FormData();
      formData.append("image", input); 
      formData.append("prompt", object); 
      const token = await getToken();

      const { data } = await axiosInstance.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setContent(data.url);
      toast.success("Object removed successfully ");
    } catch (error) {
      toast.error("Failed to remove object ");
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
          <Sparkles className="text-secondary" style={{ width: "1.5rem" }} />
          <h1 className="h5 fw-semibold mb-0">Object Removal</h1>
        </div>

        <p className="mb-1 small fw-medium">Upload Image</p>
        <input
          type="file"
          accept="image/*"
          className="form-control form-control-sm mb-3"
          onChange={(e) => setInput(e.target.files[0])}
          required
        />

        <p className="mb-1 small fw-medium">Describe Object name to remove</p>
        <textarea
          className="form-control form-control-sm mb-3"
          placeholder="e.g., watch or spoon (only single object name)"
          value={object}
          rows={3}
          onChange={(e) => setObject(e.target.value)}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary d-flex justify-content-center align-items-center gap-2 w-100 mt-4"
        >
          <Scissors style={{ width: "1.25rem" }} />
          {loading ? "Processing..." : "Remove Object"}
        </button>
      </form>

      {/* Right column */}
      <div
        className="w-100 p-4 bg-white rounded border border-secondary-subtle d-flex flex-column"
        style={{ maxWidth: "40rem", minHeight: "24rem", maxHeight: "600px" }}
      >
        <div className="d-flex align-items-center gap-2 mb-3">
          <Scissors
            className="text-primary"
            style={{ width: "1.25rem", height: "1.25rem" }}
          />
          <h1 className="h5 fw-semibold mb-0">Processed Image</h1>
        </div>

        <div className="flex-grow-1 d-flex justify-content-center align-items-center text-secondary text-center">
          {content ? (
            <img
              src={content}
              alt="Processed result"
              className="img-fluid rounded"
              style={{ maxHeight: "500px", objectFit: "contain" }}
            />
          ) : (
            <div className="small d-flex flex-column align-items-center gap-3 text-muted">
              <Scissors style={{ width: "2.25rem", height: "2.25rem" }} />
              <p className="mb-0">
                Upload an Image and click "Remove Object" to get started
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RemoveObject;

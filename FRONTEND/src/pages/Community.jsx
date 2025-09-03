import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Heart } from "lucide-react";
import axiosInstance from "../config/axiosInstance.js";
import toast from "react-hot-toast";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getToken, isLoaded } = useAuth();
  const { user } = useUser();

  if (!isLoaded) return <p>Loading...</p>;

  // Fetch Creations
  const fetchData = async () => {
    try {
      setLoading(true);
      const t = await getToken(); // fetch fresh token here

      const res = await axiosInstance.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${t}` },
      });

      if (res.data.success) {
        setCreations(res.data.content);
      } else {
        toast.error(res.data.message || "Failed to fetch creations");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Like / Unlike a creation
  const handleLike = async (creationId) => {
    try {
      const t = await getToken(); // always get fresh token here too

      const res = await axiosInstance.post(
        `/api/user/toggle-like-creation/${creationId}`,
        {},
        { headers: { Authorization: `Bearer ${t}` } }
      );

      if (res.data.success) {
        // Optimistic update
        setCreations((prev) =>
          prev.map((c) =>
            c.id === creationId ? { ...c, likes: res.data.likes } : c
          )
        );
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Failed to like creation");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  return (
    <div className="d-flex flex-column gap-4 p-4 h-100 flex-grow-1">
      <h4>Creations</h4>

      {loading && <p className="text-muted">Loading creations...</p>}

      <div className="bg-white w-100 rounded overflow-auto">
        {creations.length > 0 ? (
          creations.map((creation) => (
            <div
              key={creation.id}
              className="position-relative d-inline-block p-3 w-40 col-sm-6 col-lg-4"
            >
              <img
                src={creation.content}
                alt="user creation"
                className="w-100 h-100 object-fit-cover rounded"
              />
              <div className="position-absolute top-0 end-0 bottom-0 start-0 d-flex justify-content-end align-items-end gap-2 p-3 text-white rounded bg-transparent hover-gradient">
                <p className="d-none group-hover d-sm-block small">
                  {creation.prompt}
                </p>
                <div
                  className="d-flex align-items-center gap-1 cursor-pointer"
                  onClick={() => handleLike(creation.id)}
                >
                  <p className="mb-0">{creation.likes?.length || 0}</p>
                  <Heart
                    className={`min-vw-5 h-100 ${
                      creation.likes?.includes(user.id)
                        ? "text-red-600"
                        : "text-white hover:text-red-400"
                    }`}
                    stroke="currentColor"
                    fill={creation.likes?.includes(user.id) ? "red" : "none"}
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && (
            <p className="text-muted text-center py-4">
              No creations found yet
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Community;

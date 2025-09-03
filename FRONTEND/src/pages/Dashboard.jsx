import React, { useEffect, useState } from "react";
import { Sparkles, Gem } from "lucide-react";
import { Protect, useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axiosInstance from "../config/axiosInstance";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const token = await getToken();
      
      const { data } = await axiosInstance.get("api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.responseData) {
        setCreations(data.responseData);
      } else {
        toast.error("No creations found");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div
      className="h-100 overflow-auto p-4"
      style={{ backgroundColor: "#F2F7F7" }}
    >
      <div className="d-flex justify-content-start gap-3 flex-wrap">
        {/* Total Creations Card */}
        <div
          className="d-flex justify-content-between align-items-center border border-secondary-subtle rounded px-4 py-3 bg-white"
          style={{ width: "18rem" }}
        >
          <div className="text-secondary">
            <p className="mb-1 small">Total Creations</p>
            <h2 className="h5 fw-semibold mb-0">{creations.length}</h2>
          </div>
          <div
            className="rounded d-flex align-items-center justify-content-center"
            style={{
              background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
              width: "40px",
              height: "40px",
            }}
          >
            <Sparkles
              className="text-white"
              style={{ width: "24px", height: "24px" }}
            />
          </div>
        </div>

        {/* Active Plan */}
        <div
          className="d-flex justify-content-between align-items-center bg-white border border-secondary-subtle rounded-3 px-4 py-3"
          style={{ width: "18rem" }}
        >
          <div className="text-secondary">
            <p className="mb-1 small">Active Plan</p>
            <h2 className="h5 fw-semibold mb-0">
              <Protect plan="premium" fallback="Free">
                Premium
              </Protect>
            </h2>
          </div>
          <div
            className="d-flex justify-content-center align-items-center rounded"
            style={{
              width: "40px",
              height: "40px",
              background: "linear-gradient(to bottom right, #FF61C5, #9E53EE)",
              color: "white",
            }}
          >
            <Gem style={{ width: "20px", height: "20px" }} />
          </div>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="mt-4">
        <p className="mt-4 mb-3 fw-semibold">Recent Creations</p>
        <div className="d-flex flex-column">
          {creations.length > 0 ? (
            creations.map((item) => <CreationItem key={item.id} item={item} />)
          ) : (
            <p className="text-muted">No creations yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getMe } from "@/api/profile/index.js";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("loading"); // "loading" | "auth" | "unauth"

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getMe();
        setStatus(res?.data ? "auth" : "unauth");
      } catch {
        setStatus("unauth");
      }
    };
    checkAuth();
  }, []);

  if (status === "loading")
    return (
      <div className="min-h-screen bg-[#07070d] flex items-center justify-center">
        <span className="text-white/30 text-sm font-mono tracking-widest animate-pulse">
          verifying session...
        </span>
      </div>
    );

  if (status === "unauth") return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;

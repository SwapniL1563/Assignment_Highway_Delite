import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ProtectedRoute = ({ children }: { children: ReactNode}) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      setLoading(false);
      return;
    }

    axios
      .get(`${API_BASE_URL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setIsAuth(true))
      .catch(() => {
        localStorage.removeItem("token");
        setIsAuth(false);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!isAuth) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;

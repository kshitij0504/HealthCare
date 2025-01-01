import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user || {});

  useEffect(() => {
    if (
      !currentUser?.data?.role ||
      currentUser?.data?.role !== "ADMIN"
    ) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return currentUser?.data?.role === "ADMIN" ? children : null;
};

export default AdminRoute;

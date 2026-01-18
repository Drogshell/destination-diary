import { useAuth } from "../context/FakeAuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) return navigate("/");
    },
    [isAuthenticated, navigate],
  );

  return isAuthenticated ? children : null;
}

export default ProtectedRoute;

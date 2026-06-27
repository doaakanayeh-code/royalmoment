import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

export default function AdminProtectedRoute({ children }) {
  const cookie = new Cookies();

  const token = cookie.get("Bearer");

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

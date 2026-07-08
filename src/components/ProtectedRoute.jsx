import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  // Check for your auth token or admin flag in localStorage
  const isAuthenticated = localStorage.getItem("isAdmin") === "true";

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child component (AdminDashboard)
  return children;
}
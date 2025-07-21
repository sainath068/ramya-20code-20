import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "./Dashboard";

export default function TestDashboard() {
  const { login } = useAuth();

  useEffect(() => {
    // Auto-login for testing
    login({
      id: 1,
      email: "admin@example.com", 
      username: "Admin",
      role: "admin"
    });
  }, [login]);

  return <Dashboard />;
}

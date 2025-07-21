import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import SimpleDashboard from "./SimpleDashboard";

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

  return <SimpleDashboard />;
}

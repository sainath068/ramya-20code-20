import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import WorkingDashboard from "./WorkingDashboard";

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

  return <WorkingDashboard />;
}

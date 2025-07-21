import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import WorkingDashboard from "./WorkingDashboard";

export default function ProfileDemo() {
  const { login } = useAuth();

  useEffect(() => {
    // Auto-login as admin for testing profile functionality
    login({
      id: 1,
      email: "admin@example.com",
      username: "Admin",
      role: "admin"
    });
  }, [login]);

  return <WorkingDashboard />;
}

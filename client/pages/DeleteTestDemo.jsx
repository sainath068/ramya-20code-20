import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import WorkingDashboard from "./WorkingDashboard";

export default function DeleteTestDemo() {
  const { login } = useAuth();

  useEffect(() => {
    // Auto-login as admin for testing delete functionality
    login({
      id: 1,
      email: "admin@example.com",
      username: "Admin",
      role: "admin",
      fullName: "Admin User"
    });
  }, [login]);

  return <WorkingDashboard />;
}

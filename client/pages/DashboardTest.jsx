import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import WorkingDashboard from "./WorkingDashboard";

export default function DashboardTest() {
  const { login } = useAuth();

  useEffect(() => {
    // Auto-login as admin for testing
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

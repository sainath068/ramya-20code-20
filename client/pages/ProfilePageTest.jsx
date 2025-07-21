import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Profile from "./Profile";

export default function ProfilePageTest() {
  const { login } = useAuth();

  useEffect(() => {
    // Auto-login as admin for testing profile page
    login({
      id: 1,
      email: "admin@example.com",
      username: "Admin",
      role: "admin",
      fullName: "Admin User",
      phone: "+1 (555) 123-4567",
      location: "New York, USA",
      bio: "I'm a passionate admin focused on creating amazing user experiences and building great products.",
      joinedDate: "January 2024"
    });
  }, [login]);

  return <Profile />;
}

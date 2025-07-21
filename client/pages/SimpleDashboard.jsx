import { useAuth } from "../contexts/AuthContext";

export default function SimpleDashboard() {
  const { user, logout } = useAuth();

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {user.username}!</p>
      <p>Role: {user.role}</p>
      <p>Email: {user.email}</p>
      <button onClick={logout} className="mt-4 px-4 py-2 bg-red-500 text-white rounded">
        Logout
      </button>
    </div>
  );
}

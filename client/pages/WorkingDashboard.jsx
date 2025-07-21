import { useAuth } from "../contexts/AuthContext";
import { LogOut, User } from "lucide-react";

export default function WorkingDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">UserManager Pro</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-300">
              <span>Welcome, </span>
              <span className="font-medium text-white">{user.username}</span>
              <span className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                {user.role.toUpperCase()}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {user.role === "admin" ? "User Management" : "Task Management"}
          </h2>
          <p className="text-gray-400">
            {user.role === "admin" 
              ? "Manage users, roles, and permissions" 
              : "Organize and track your tasks"}
          </p>
        </div>

        {/* Content Area */}
        <div className="bg-gray-800 rounded-lg p-6">
          {user.role === "admin" ? (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Admin Dashboard</h3>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Total Users</h4>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Admins</h4>
                  <p className="text-2xl font-bold text-white">1</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Regular Users</h4>
                  <p className="text-2xl font-bold text-white">2</p>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">Users</h4>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add User
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="pb-2 text-gray-300">Username</th>
                        <th className="pb-2 text-gray-300">Email</th>
                        <th className="pb-2 text-gray-300">Role</th>
                        <th className="pb-2 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-600">
                        <td className="py-2 text-white">admin</td>
                        <td className="py-2 text-gray-300">admin@example.com</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">ADMIN</span>
                        </td>
                        <td className="py-2">
                          <button className="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-600">
                        <td className="py-2 text-white">john_doe</td>
                        <td className="py-2 text-gray-300">john@example.com</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">USER</span>
                        </td>
                        <td className="py-2">
                          <button className="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-white">jane_smith</td>
                        <td className="py-2 text-gray-300">jane@example.com</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">USER</span>
                        </td>
                        <td className="py-2">
                          <button className="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Task Management</h3>
              
              {/* Task Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Total Tasks</h4>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Pending</h4>
                  <p className="text-2xl font-bold text-white">1</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">In Progress</h4>
                  <p className="text-2xl font-bold text-white">1</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Completed</h4>
                  <p className="text-2xl font-bold text-white">1</p>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">Tasks</h4>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Add Task
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="pb-2 text-gray-300">Title</th>
                        <th className="pb-2 text-gray-300">Description</th>
                        <th className="pb-2 text-gray-300">Status</th>
                        <th className="pb-2 text-gray-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-600">
                        <td className="py-2 text-white">Complete user authentication</td>
                        <td className="py-2 text-gray-300">Implement login and registration</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-yellow-600 text-white rounded text-xs">IN PROGRESS</span>
                        </td>
                        <td className="py-2">
                          <button className="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                      <tr className="border-b border-gray-600">
                        <td className="py-2 text-white">Design dashboard layout</td>
                        <td className="py-2 text-gray-300">Create wireframes and design</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-green-600 text-white rounded text-xs">COMPLETED</span>
                        </td>
                        <td className="py-2">
                          <button className="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2 text-white">Set up database schema</td>
                        <td className="py-2 text-gray-300">Define tables and relationships</td>
                        <td className="py-2">
                          <span className="px-2 py-1 bg-gray-600 text-white rounded text-xs">PENDING</span>
                        </td>
                        <td className="py-2">
                          <button className="mr-2 text-blue-400 hover:text-blue-300">Edit</button>
                          <button className="text-red-400 hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

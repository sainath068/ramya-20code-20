import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Plus, Edit, Trash2, X, Settings } from "lucide-react";

export default function WorkingDashboard() {
  const { user, logout } = useAuth();
  
  // State for users data
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@example.com", role: "admin" },
    { id: 2, username: "john_doe", email: "john@example.com", role: "user" },
    { id: 3, username: "jane_smith", email: "jane@example.com", role: "user" },
  ]);

  // State for tasks data
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete user authentication", description: "Implement login and registration", status: "in-progress" },
    { id: 2, title: "Design dashboard layout", description: "Create wireframes and design", status: "completed" },
    { id: 3, title: "Set up database schema", description: "Define tables and relationships", status: "pending" },
  ]);

    // Modal state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Form state
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user"
  });

    const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleLogout = () => {
    logout();
  };

  // User management functions
  const openAddUserModal = () => {
    setUserForm({ username: "", email: "", password: "", role: "user" });
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const openEditUserModal = (userToEdit) => {
    setUserForm({
      username: userToEdit.username,
      email: userToEdit.email,
      password: "",
      role: userToEdit.role
    });
    setEditingUser(userToEdit);
    setIsUserModalOpen(true);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      setUsers(users.map(u => 
        u.id === editingUser.id 
          ? { ...u, ...userForm, password: undefined }
          : u
      ));
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        ...userForm
      };
      setUsers([...users, newUser]);
    }
    setIsUserModalOpen(false);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  // Task management functions
  const openAddTaskModal = () => {
    setTaskForm({ title: "", description: "", status: "pending" });
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const openEditTaskModal = (taskToEdit) => {
    setTaskForm({
      title: taskToEdit.title,
      description: taskToEdit.description,
      status: taskToEdit.status
    });
    setEditingTask(taskToEdit);
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      // Update existing task
      setTasks(tasks.map(t => 
        t.id === editingTask.id 
          ? { ...t, ...taskForm }
          : t
      ));
    } else {
      // Add new task
      const newTask = {
        id: Math.max(...tasks.map(t => t.id)) + 1,
        ...taskForm
      };
      setTasks([...tasks, newTask]);
    }
    setIsTaskModalOpen(false);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(t => t.id !== taskId));
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
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Admins</h4>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.role === "admin").length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Regular Users</h4>
                  <p className="text-2xl font-bold text-white">{users.filter(u => u.role === "user").length}</p>
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">Users</h4>
                  <button 
                    onClick={openAddUserModal}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add User</span>
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
                      {users.map((userItem) => (
                        <tr key={userItem.id} className="border-b border-gray-600">
                          <td className="py-2 text-white">{userItem.username}</td>
                          <td className="py-2 text-gray-300">{userItem.email}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              userItem.role === "admin" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"
                            }`}>
                              {userItem.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 space-x-2">
                            <button 
                              onClick={() => openEditUserModal(userItem)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteUser(userItem.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
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
                  <p className="text-2xl font-bold text-white">{tasks.length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Pending</h4>
                  <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === "pending").length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">In Progress</h4>
                  <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === "in-progress").length}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Completed</h4>
                  <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === "completed").length}</p>
                </div>
              </div>

              {/* Tasks Table */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium text-white">Tasks</h4>
                  <button 
                    onClick={openAddTaskModal}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Task</span>
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
                      {tasks.map((task) => (
                        <tr key={task.id} className="border-b border-gray-600">
                          <td className="py-2 text-white">{task.title}</td>
                          <td className="py-2 text-gray-300">{task.description}</td>
                          <td className="py-2">
                            <span className={`px-2 py-1 rounded text-xs ${
                              task.status === "completed" ? "bg-green-600 text-white" :
                              task.status === "in-progress" ? "bg-yellow-600 text-white" :
                              "bg-gray-600 text-white"
                            }`}>
                              {task.status.replace("-", " ").toUpperCase()}
                            </span>
                          </td>
                          <td className="py-2 space-x-2">
                            <button 
                              onClick={() => openEditTaskModal(task)}
                              className="text-blue-400 hover:text-blue-300"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => deleteTask(task.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingUser ? "Edit User" : "Add New User"}
              </h3>
              <button 
                onClick={() => setIsUserModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleUserSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Password {editingUser && "(leave blank to keep current)"}
                </label>
                <input
                  type="password"
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required={!editingUser}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Role
                </label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsUserModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingUser ? "Update User" : "Add User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Edit Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">
                {editingTask ? "Edit Task" : "Add New Task"}
              </h3>
              <button 
                onClick={() => setIsTaskModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({...taskForm, title: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({...taskForm, description: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Status
                </label>
                <select
                  value={taskForm.status}
                  onChange={(e) => setTaskForm({...taskForm, status: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {editingTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  LogOut,
  User,
  Plus,
  Edit,
  Trash2,
  X,
  Settings,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function WorkingDashboard() {
  const { user, logout } = useAuth();
  const dropdownRef = useRef(null);

  // State for users data
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "admin@example.com", role: "admin" },
    { id: 2, username: "john_doe", email: "john@example.com", role: "user" },
    { id: 3, username: "jane_smith", email: "jane@example.com", role: "user" },
  ]);

  // State for tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Complete user authentication",
      description: "Implement login and registration",
      status: "in-progress",
    },
    {
      id: 2,
      title: "Design dashboard layout",
      description: "Create wireframes and design",
      status: "completed",
    },
    {
      id: 3,
      title: "Set up database schema",
      description: "Define tables and relationships",
      status: "pending",
    },
  ]);

  // Modal state
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingTask, setEditingTask] = useState(null);

  // Form state
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [taskForm, setTaskForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  const [profileForm, setProfileForm] = useState({
    username: "",
    email: "",
  });

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
      role: userToEdit.role,
    });
    setEditingUser(userToEdit);
    setIsUserModalOpen(true);
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    if (editingUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, ...userForm, password: undefined }
            : u,
        ),
      );
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...userForm,
      };
      setUsers([...users, newUser]);
    }
    setIsUserModalOpen(false);
  };

  const confirmDeleteUser = (userId, username) => {
    setDeleteTarget({ type: "user", id: userId, name: username });
    setIsDeleteConfirmOpen(true);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
    setIsDeleteConfirmOpen(false);
    setDeleteTarget(null);
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
      status: taskToEdit.status,
    });
    setEditingTask(taskToEdit);
    setIsTaskModalOpen(true);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (editingTask) {
      // Update existing task
      setTasks(
        tasks.map((t) => (t.id === editingTask.id ? { ...t, ...taskForm } : t)),
      );
    } else {
      // Add new task
      const newTask = {
        id: Math.max(...tasks.map((t) => t.id)) + 1,
        ...taskForm,
      };
      setTasks([...tasks, newTask]);
    }
    setIsTaskModalOpen(false);
  };

  const confirmDeleteTask = (taskId, taskTitle) => {
    setDeleteTarget({ type: "task", id: taskId, name: taskTitle });
    setIsDeleteConfirmOpen(true);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((t) => t.id !== taskId));
    setIsDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  // Profile management functions
  const openProfileModal = () => {
    setProfileForm({
      username: user.username,
      email: user.email,
    });
    setIsProfileModalOpen(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    // Update the user in auth context
    const updatedUser = {
      ...user,
      username: profileForm.username,
      email: profileForm.email,
    };

    login(updatedUser); // Update the user in auth context
    setIsProfileModalOpen(false);
    alert("Profile updated successfully!");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                  {getInitials(user.username)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">
                    {user.username}
                  </p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Dropdown Menu */}
              {isProfileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-sm font-medium text-white">
                        {getInitials(user.username)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {user.username}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    <span>My Profile</span>
                  </Link>

                  <button
                    onClick={() => {
                      setIsProfileDropdownOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Log out</span>
                  </button>
                </div>
              )}
            </div>
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
              <h3 className="text-xl font-bold text-white mb-4">
                Admin Dashboard
              </h3>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">
                    Total Users
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    {users.length}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Admins</h4>
                  <p className="text-2xl font-bold text-white">
                    {users.filter((u) => u.role === "admin").length}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">
                    Regular Users
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    {users.filter((u) => u.role === "user").length}
                  </p>
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
                        <tr
                          key={userItem.id}
                          className="border-b border-gray-600"
                        >
                          <td className="py-2 text-white">
                            {userItem.username}
                          </td>
                          <td className="py-2 text-gray-300">
                            {userItem.email}
                          </td>
                          <td className="py-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                userItem.role === "admin"
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-600 text-white"
                              }`}
                            >
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
                              onClick={() =>
                                confirmDeleteUser(
                                  userItem.id,
                                  userItem.username,
                                )
                              }
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
              <h3 className="text-xl font-bold text-white mb-4">
                Task Management
              </h3>

              {/* Task Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">
                    Total Tasks
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    {tasks.length}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">Pending</h4>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter((t) => t.status === "pending").length}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">
                    In Progress
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter((t) => t.status === "in-progress").length}
                  </p>
                </div>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-300">
                    Completed
                  </h4>
                  <p className="text-2xl font-bold text-white">
                    {tasks.filter((t) => t.status === "completed").length}
                  </p>
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
                          <td className="py-2 text-gray-300">
                            {task.description}
                          </td>
                          <td className="py-2">
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                task.status === "completed"
                                  ? "bg-green-600 text-white"
                                  : task.status === "in-progress"
                                    ? "bg-yellow-600 text-white"
                                    : "bg-gray-600 text-white"
                              }`}
                            >
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
                              onClick={() =>
                                confirmDeleteTask(task.id, task.title)
                              }
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
                  onChange={(e) =>
                    setUserForm({ ...userForm, username: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserForm({ ...userForm, email: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserForm({ ...userForm, password: e.target.value })
                  }
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
                  onChange={(e) =>
                    setUserForm({ ...userForm, role: e.target.value })
                  }
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
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
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
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
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
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, status: e.target.value })
                  }
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

      {/* Edit Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Edit Profile</h3>
              <button
                onClick={() => setIsProfileModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={profileForm.username}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, username: e.target.value })
                  }
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
                  value={profileForm.email}
                  onChange={(e) =>
                    setProfileForm({ ...profileForm, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4 border border-red-600">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Confirm Delete</h3>
                <p className="text-sm text-gray-300">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-white mb-2">
                Are you sure you want to delete this {deleteTarget.type}?
              </p>
              <div className="bg-gray-700 p-3 rounded border-l-4 border-red-500">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-white">
                    {deleteTarget.type === "user" ? "User" : "Task"}:
                  </span>{" "}
                  {deleteTarget.name}
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setDeleteTarget(null);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteTarget.type === "user") {
                    deleteUser(deleteTarget.id);
                  } else {
                    deleteTask(deleteTarget.id);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center space-x-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>
                  Delete {deleteTarget.type === "user" ? "User" : "Task"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

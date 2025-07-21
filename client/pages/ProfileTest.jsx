import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Settings, X } from "lucide-react";

export default function ProfileTest() {
  const { user, logout, login } = useAuth();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: user?.username || "Admin",
    email: user?.email || "admin@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Auto-login if no user
  if (!user) {
    login({
      id: 1,
      email: "admin@example.com",
      username: "Admin",
      role: "admin"
    });
  }

  const handleLogout = () => {
    logout();
  };

  const openProfileModal = () => {
    setProfileForm({
      username: user.username,
      email: user.email,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsProfileModalOpen(true);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      alert("New passwords don't match!");
      return;
    }

    const updatedUser = {
      ...user,
      username: profileForm.username,
      email: profileForm.email
    };
    
    login(updatedUser);
    setIsProfileModalOpen(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
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
              <span className="font-medium text-white">{user?.username}</span>
              <span className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                {user?.role?.toUpperCase()}
              </span>
            </div>
            
            {/* Profile Button */}
            <button
              onClick={openProfileModal}
              className="flex items-center space-x-1 px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
              title="Edit Profile"
            >
              <Settings className="w-4 h-4" />
              <span>Profile</span>
            </button>
            
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
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Profile Button Demo</h2>
          <p className="text-gray-300 mb-4">
            Click the "Profile" button in the header to edit your profile details.
          </p>
          <div className="bg-gray-700 p-4 rounded">
            <h3 className="text-lg font-medium text-white mb-2">Current User Details:</h3>
            <p className="text-gray-300">Username: {user?.username}</p>
            <p className="text-gray-300">Email: {user?.email}</p>
            <p className="text-gray-300">Role: {user?.role}</p>
          </div>
        </div>
      </main>

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
                  onChange={(e) => setProfileForm({...profileForm, username: e.target.value})}
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
                  onChange={(e) => setProfileForm({...profileForm, email: e.target.value})}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                  required
                />
              </div>
              
              <div className="border-t border-gray-600 pt-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3">Change Password (Optional)</h4>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={profileForm.currentPassword}
                    onChange={(e) => setProfileForm({...profileForm, currentPassword: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter current password"
                  />
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={profileForm.newPassword}
                    onChange={(e) => setProfileForm({...profileForm, newPassword: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={profileForm.confirmPassword}
                    onChange={(e) => setProfileForm({...profileForm, confirmPassword: e.target.value})}
                    className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-blue-500 focus:outline-none"
                    placeholder="Confirm new password"
                  />
                </div>
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
    </div>
  );
}

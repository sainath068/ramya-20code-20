import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { LogOut, User, Settings, ChevronDown } from "lucide-react";

// Import components conditionally to avoid issues
let Button, Avatar, AvatarFallback, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator;
let UserManagement, TaskManagement;

try {
  ({ Button } = require("@/components/ui/button"));
  ({ Avatar, AvatarFallback } = require("@/components/ui/avatar"));
  ({ 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator
  } = require("@/components/ui/dropdown-menu"));
  
  UserManagement = require("../components/UserManagement").default;
  TaskManagement = require("../components/TaskManagement").default;
} catch (error) {
  console.warn("Some UI components failed to load:", error);
}

export default function FixedDashboard() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getInitials = (name) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase();
  };

  // Fallback header if components fail to load
  const HeaderFallback = () => (
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
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );

  // Content fallback
  const ContentFallback = () => (
    <div className="bg-gray-800 rounded-lg p-6 text-white">
      <h3 className="text-xl font-bold mb-4">
        {user.role === "admin" ? "User Management" : "Task Management"}
      </h3>
      <p className="text-gray-300 mb-4">
        {user.role === "admin" 
          ? "Admin dashboard for managing users, roles, and permissions" 
          : "User dashboard for organizing and tracking tasks"}
      </p>
      <div className="bg-gray-700 p-4 rounded">
        <p className="text-sm">
          Dashboard components are loading... If this persists, there may be an issue with the UI component library.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      {Button && Avatar && DropdownMenu ? (
        <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold text-foreground">UserManager Pro</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-sm text-muted-foreground">
                <span>Welcome,</span>
                <span className="font-medium text-foreground">{user.username}</span>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {user.role.toUpperCase()}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 h-10">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">
                        {getInitials(user.username)}
                      </AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      ) : (
        <HeaderFallback />
      )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            {user.role === "admin" ? "User Management" : "Task Management"}
          </h2>
          <p className="text-muted-foreground">
            {user.role === "admin" 
              ? "Manage users, roles, and permissions" 
              : "Organize and track your tasks"}
          </p>
        </div>

        {/* Role-based content */}
        {UserManagement && TaskManagement ? (
          user.role === "admin" ? <UserManagement /> : <TaskManagement />
        ) : (
          <ContentFallback />
        )}
      </main>
    </div>
  );
}

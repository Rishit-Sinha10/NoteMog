"use client";
import { useUser } from "@clerk/react";
import { UserButton } from "@clerk/react";
import { Link } from "react-router-dom";
export function Navabar() {
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-full px-4 py-3 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo & Branding */}
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-purple-600">📚</div>
            <span className="text-xl font-bold text-gray-900">NoteMog</span>
          </div>
          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/notes"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Notes
            </Link>
            <Link
              to="/subjects"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Subjects
            </Link>
            <Link
              to="/tasks"
              className="text-gray-700 hover:text-purple-600 transition font-medium"
            >
              Tasks
            </Link>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              {user?.fullName || user?.firstName || "User"}
            </div>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

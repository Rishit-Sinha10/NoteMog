"use client";
import { UserAvatar } from "@clerk/react";
import { useState, useEffect, useCallback } from "react";
import { useUser } from "@clerk/react";
import { useNavigate } from "react-router-dom";
// ─── Icons (replace with your icon library if preferred) ───────────────────
const icons = {
  chevronLeft: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  ),
  home: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  ),
  chart: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  ),
  users: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  file: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  ),
  settings: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  ),
  bell: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  help: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  bolt: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  plan: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
};
// ─── Nav item configuration ─────────────────────────────────────────────────
const NAV_MAIN = [
  { id: "dashboard", label: "Dashboard", icon: "home", path: "/dashboard" },
  { id: "analytics", label: "Analytics", icon: "chart", path: "/analytics" },
  { id: "customers", label: "Customers", icon: "users" },
  { id: "reports", label: "Reports", icon: "file" },
  { id: "planner", label: "Planner", icon: "plan", path: "/planner" },
];
const NAV_SETTINGS = [
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "notifications", label: "Notifications", icon: "bell", badge: "12" },
  { id: "help", label: "Help", icon: "help" },
];
// ─── NavItem ────────────────────────────────────────────────────────────────
function NavItem({ item, isActive, isCollapsed, onClick, onNavigate }) {
  return (
    <button
      onClick={() => {
        onClick(item.id);
        if (item.path && onNavigate) {
          onNavigate(item.path);
        }
      }}
      title={isCollapsed ? item.label : undefined}
      className={`
        group relative flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm
        transition-colors duration-100 outline-none
        ${
          isActive
            ? "bg-violet-100 text-violet-700 font-medium"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        }
      `}
    >
      <span className="flex-shrink-0 text-current">{icons[item.icon]}</span>

      <span
        className={`
          overflow-hidden whitespace-nowrap transition-all duration-200
          ${isCollapsed ? "w-0 opacity-0" : "flex-1 opacity-100"}
        `}
      >
        {item.label}
      </span>

      {item.badge && !isCollapsed && (
        <span className="ml-auto rounded-full bg-violet-100 px-1.5 py-0.5 text-[11px] font-medium text-violet-700">
          {item.badge}
        </span>
      )}

      {/* Tooltip shown when collapsed */}
      {isCollapsed && (
        <span
          className="
          pointer-events-none absolute left-full ml-3 z-50
          rounded-md bg-white border border-gray-200 px-2.5 py-1
          text-xs font-medium text-gray-700 shadow-sm whitespace-nowrap
          opacity-0 group-hover:opacity-100 transition-opacity duration-100
        "
        >
          {item.label}
          {item.badge && (
            <span className="ml-1.5 rounded-full bg-violet-100 px-1.5 text-violet-700">
              {item.badge}
            </span>
          )}
        </span>
      )}
    </button>
  );
}
// ─── Sidebar ────────────────────────────────────────────────────────────────
export function Sidebar({ defaultOpen = true }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeId, setActiveId] = useState("dashboard");
  const { isLoaded, isSignedIn, user } = useUser();
  const navigate = useNavigate();

  // Keyboard shortcut: Ctrl/Cmd + B
  // MOVED TO TOP - before early return
  const toggle = useCallback(() => setIsOpen((o) => !o), []);
  useEffect(() => {
    // Guard the logic inside the hook - only set up listener if user is loaded and signed in
    if (!isLoaded || !isSignedIn) {
      return;
    }

    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggle, isLoaded, isSignedIn]);

  const handleNavigate = useCallback((path) => {
    navigate(path);
  }, [navigate]);

  // Now the early return is AFTER all hooks
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  return (
    <aside
      className={`
        flex flex-col bg-gradient-to-b from-white to-gray-50 border-r border-gray-200 overflow-hidden
        transition-[width] duration-200 ease-linear flex-shrink-0 h-screen
        ${isOpen ? "w-56" : "w-16"}
      `}
    >
      {/* Nav content with footer scrollable */}
      <div className="flex flex-col gap-1 flex-1 overflow-y-auto p-2.5 min-h-0">
        {/* Main section */}
        <p
          className={`
            px-3 pt-3 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400
            transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}
          `}
        >
          Menu
        </p>
        {NAV_MAIN.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            isCollapsed={!isOpen}
            onClick={setActiveId}
            onNavigate={handleNavigate}
          />
        ))}
        <hr className="my-2 border-gray-200" />
        {/* Settings section */}
        <p
          className={`
            px-3 pt-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400
            transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0"}
          `}
        >
          Settings
        </p>
        {NAV_SETTINGS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={activeId === item.id}
            isCollapsed={!isOpen}
            onClick={setActiveId}
            onNavigate={handleNavigate}
          />
        ))}
        {/* Footer / user card - now scrolls with content */}
        <div className="border-t border-gray-200 p-3 mt-auto">
          <button
            className={`
              flex w-full items-center transition-all duration-200
              ${
                isOpen
                  ? "justify-start gap-3 px-2 py-2"
                  : "justify-center px-1 py-2"
              }
              rounded-lg hover:bg-gray-100 transition-colors duration-100
            `}
          >
            <div
              className="
              flex h-9 w-9 flex-shrink-0 items-center justify-center
              rounded-full bg-gradient-to-br from-violet-400 to-violet-600 overflow-hidden
            "
            >
              <UserAvatar />
            </div>
            {isOpen && (
              <div className="min-w-0 flex-1 text-left">
                <p className="truncate text-sm font-medium text-gray-900">
                  {user?.fullName || user?.firstName || "User"}
                </p>
                <p className="truncate text-xs text-gray-500">
                  {user?.primaryEmailAddress?.emailAddress || "No email"}
                </p>
              </div>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
}

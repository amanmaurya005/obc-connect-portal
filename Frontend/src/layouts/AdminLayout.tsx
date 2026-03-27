import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";  // ✅ IMPORT - TOP PAR

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();  // ✅ HOOK - COMPONENT KE ANDAR, TOP PAR
  const [collapsed, setCollapsed] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navItems = [
    {
      to: "/admin/members",
      label: "Members",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
          <circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      to: "/admin/donations",
      label: "Donations",
      icon: (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 6v6l4 2"/>
        </svg>
      ),
    },
  ];

  const getPageTitle = () => {
    if (location.pathname === "/admin/members") return "Members Data";
    if (location.pathname === "/admin/donations") return "Donation Data";
    return "Overview";
  };

  const getBreadcrumb = () => {
    return location.pathname.split("/admin/")[1] || "Home";
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout();
      setShowLogoutMessage(true);
      
      // Hide message after 3 seconds and redirect
      setTimeout(() => {
        setShowLogoutMessage(false);
        navigate("/admin/login");
      }, 2000);
    } catch (error) {
      console.error("Logout error:", error);
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">

      {/* Logout Success Toast Message */}
      {showLogoutMessage && (
        <div className="fixed top-5 right-5 z-50 animate-in slide-in-from-top-2 fade-in duration-300">
          <div className="flex items-center gap-3 rounded-xl bg-green-50 border border-green-200 shadow-lg px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
              <svg width="16" height="16" fill="none" stroke="green" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-green-800 text-sm">Logged Out Successfully!</p>
              <p className="text-xs text-green-600">Redirecting to login...</p>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`
          relative flex flex-col flex-shrink-0 overflow-hidden h-screen
          bg-gradient-to-b from-slate-900 to-slate-800
          shadow-2xl transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-60"}
        `}
      >
        {/* Glow effect */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-indigo-600/10 blur-3xl" />

        {/* Logo / Header */}
        <div className="flex min-h-[72px] items-center gap-3 border-b border-white/5 px-4 py-5">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30">
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <div className={`overflow-hidden transition-opacity duration-200 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
            <p className="whitespace-nowrap text-sm font-bold text-white">AdminPanel</p>
            <p className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-widest text-white/30">Dashboard</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-5">
          <p className={`mb-3 px-2 text-[9.5px] font-semibold uppercase tracking-widest text-white/25 transition-opacity duration-150 ${collapsed ? "opacity-0" : "opacity-100"}`}>
            Navigation
          </p>

          {navItems.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`
                  group mb-1 flex items-center gap-3 rounded-xl px-3 py-[10px]
                  text-sm font-medium whitespace-nowrap overflow-hidden
                  transition-all duration-150
                  ${isActive
                    ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30"
                    : "text-white/50 hover:bg-white/7 hover:text-white/90"
                  }
                `}
              >
                <span className={`flex-shrink-0 ${isActive ? "text-indigo-400" : "text-white/40 group-hover:text-white/70"}`}>
                  {item.icon}
                </span>
                <span className={`transition-opacity duration-200 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
                  {item.label}
                </span>
                {isActive && !collapsed && (
                  <span className="ml-auto h-1.5 w-1.5 flex-shrink-0 rounded-full bg-indigo-400 shadow-[0_0_8px_#818cf8]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ✅ LOGOUT BUTTON */}
        <div className="px-3 pb-3">
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`
              group flex w-full items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl
              px-3 py-[10px] text-sm font-medium transition-all duration-150
              ${collapsed ? "justify-center" : ""}
              ${isLoggingOut 
                ? "bg-red-500/20 text-red-300 cursor-not-allowed" 
                : "bg-red-500/10 text-red-300 hover:bg-red-500/20 hover:text-red-200"
              }
            `}
          >
            <svg
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="flex-shrink-0"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className={`transition-opacity duration-200 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
              {isLoggingOut ? "Logging out..." : "Logout"}
            </span>
          </button>
        </div>

        {/* Collapse Button */}
        <div className="px-3 pb-5">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex w-full items-center gap-3 overflow-hidden whitespace-nowrap rounded-xl border border-white/8 bg-white/4 px-3 py-[10px] text-sm font-medium text-white/40 transition-all duration-150 hover:bg-white/8 hover:text-white/70"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className={`flex-shrink-0 transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`}
            >
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            <span className={`transition-opacity duration-200 ${collapsed ? "opacity-0 w-0" : "opacity-100"}`}>
              Collapse
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Top Bar */}
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 bg-white px-7 shadow-sm">
          <div>
            <h1 className="text-[17px] font-semibold tracking-tight text-slate-800">{getPageTitle()}</h1>
            <p className="text-xs text-slate-400">Admin / {getBreadcrumb()}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification */}
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-400" />
            </button>

            {/* Search */}
            <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition-all hover:bg-slate-200 hover:text-slate-700">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* ✅ Avatar with Admin Name */}
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-[13px] font-bold text-white shadow-md shadow-indigo-400/30">
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-semibold text-slate-700">{user?.name || "Admin"}</p>
                <p className="text-xs text-slate-400">{user?.email || "admin@obcmahasabha.co.in"}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-7">
          <Outlet />

          {/* Empty state on /admin root */}
          {location.pathname === "/admin" && (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-10 py-16 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-100 text-indigo-400">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
              </div>
              <h2 className="mb-1.5 text-base font-semibold text-slate-700">Select a section</h2>
              <p className="text-sm text-slate-400">Choose Members or Donations from the sidebar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
import React, { useState, useRef, useCallback } from "react";
import {
  Menu,
  Search,
  Bell,
  Home,
  User,
  LogOut,
  TextAlignEnd,
} from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function TopBar({ setSideBarOn }: any) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="w-full border-b border-foreground/10 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-background">
      {/* Mobile menu button */}
      <button
        onClick={() => setSideBarOn(true)}
        className="block md:hidden p-2 rounded hover:bg-foreground/10 mr-2"
      >
        <TextAlignEnd className="w-5 h-5 text-foreground" />
      </button>

      {/* Left: Welcome text */}
      <div className="flex-1">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
          Welcome back {user?.name || "User"} 👋
        </h1>
        <p className="text-xs sm:text-xs text-foreground/50 mt-0.5">
          It is the best time to manage your finances
        </p>
      </div>

      {/* Right: Icons + Avatar */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Search icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-xl   border border-dotted border-primary/50 transition-colors">
          <Search className="w-4 h-4 text-foreground/70" />
        </button>

        {/* Bell icon with badge */}
        <div className="relative">
          <button className="w-9 h-9 flex items-center justify-center rounded-xl  border border-dotted border-primary/50 transition-colors">
            <Bell className="w-4 h-4 text-foreground/70" />
          </button>
          {/* notification badge */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-background text-[10px] font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </div>

        {/* Avatar + Name & Email */}
        <AccountPopover
          data={[
            { label: "Home", href: "/", icon: Home },
            { label: "Profile", href: "/dashboard/profile", icon: User },
          ]}
          logoutFunction={handleLogout}
          user={user}
        />
      </div>
    </div>
  );
}

function AccountPopover({ data, logoutFunction, user }: any) {
  const [open, setOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleToggle = useCallback(() => {
    setOpen((p) => !p);
  }, []);

  const handleClickOutside = useCallback((e: any) => {
    if (popoverRef.current && !popoverRef.current.contains(e.target)) {
      setOpen(false);
    }
  }, []);

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleClickItem = (path: any) => {
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Avatar + Name & Email trigger button */}
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 sm:gap-3 border border-dashed border-primary/30 rounded-xl px-2 py-1 transition-colors"
      >
        {/* Avatar */}
        <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
          <img
            src="data:image/jpeg;base64,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"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name + Email — hidden on mobile */}
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold text-foreground leading-tight">
            {user?.name || "User"}
          </span>
          <span className="text-xs text-foreground/50 leading-tight">
            {user?.email || "user@gmail.com"}
          </span>
        </div>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-52 bg-background rounded-xl shadow-lg z-50 border border-primary/10">
          {/* User info header */}
          <div className="p-3 border-b border-dashed border-primary/30">
            <p className="text-sm font-medium text-foreground">
              {user?.name || "User"}
            </p>
            <p className="text-xs text-foreground/50">
              {user?.email || "user@gmail.com"}
            </p>
          </div>

          {/* Nav items */}
          <div className="flex flex-col p-2">
            {data.map((option: any) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.label}
                  onClick={() => handleClickItem(option.href)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Logout */}
          <div className="border-t border-dashed border-primary/30 p-2">
            <button
              onClick={logoutFunction}
              className="flex items-center gap-2 w-full justify-center py-2 text-sm text-error hover:bg-error/5 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

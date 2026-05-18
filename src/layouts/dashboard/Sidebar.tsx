import { ChevronLeft, Heart, LogOut, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useThemeContext } from "../../theme/ThemeProvider";


function Sidebar({
  navItems,
  sideBarOn,
  setSideBarOn,
  isCollapsed,
  setIsCollapsed,
}: any) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useThemeContext();

  const handleNavClick = (path: any) => {
    navigate(path);
    setSideBarOn(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setSideBarOn(false);
  };

  const handleThemeToggle = (selected: string) => {
    toggleTheme(selected);
  };

  return (
    <div
      className={`
        bg-background 
        border-r border-foreground/10
        h-screen 
        top-0 left-0 z-50
        fixed md:sticky
        transition-all duration-300 ease-in-out
        ${sideBarOn ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
        ${isCollapsed ? "md:w-22" : "md:w-68 w-62"}
        flex flex-col
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-linear-to-br from-primary to-primary/50">
              <Heart className="h-6 w-6 text-white fill-white" />
            </div>
            <h1 className="text-foreground text-lg font-bold">FinSet</h1>
          </div>
        )}
        {isCollapsed && (
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-linear-to-br from-primary to-primary/50 mx-auto">
            <Heart className="h-6 w-6 text-white fill-white" />
          </div>
        )}
          <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-primary/10 rounded-md transition-colors hidden md:block"
        >
          <ChevronLeft
            className={`w-5 h-5 text-foreground transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <nav className="space-y-2">
          {navItems.map((item: any, index: any) => {
            const isActive = pathname === item.path;
            return (
              <button
                key={index}
                onClick={() => handleNavClick(item.path)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-lg
                  transition-all duration-200
                  ${isActive ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-primary/10"}
                  ${isCollapsed ? "justify-center" : "justify-start"}
                `}
                title={isCollapsed ? item.text : ""}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span className="text-sm">{item.text}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Navigation */}
      <div className=" px-3 space-y-2">
        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`
            w-full flex items-center gap-3 px-4 py-3 rounded-lg
            transition-all duration-200
            text-foreground hover:bg-red-500/10 hover:text-red-500
            ${isCollapsed ? "justify-center" : "justify-start"}
          `}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm">Log out</span>}
        </button>
      </div>

      {/*  Theme Toggle */}
      <div className="p-3 flex items-center">
        <div className="flex items-center bg-primary/10 rounded-full p-1 gap-1">
          {/* Sun Button */}
          <button
            onClick={() => handleThemeToggle("light")}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "light" ? "bg-primary text-white" : "text-foreground/50"
            }`}
            title="Light Mode"
          >
            <Sun className="w-4 h-4" />
          </button>

          {/* Moon Button */}
          <button
            onClick={() => handleThemeToggle("dark")}
            className={`p-2 rounded-full transition-all duration-200 ${
              theme === "dark" ? "bg-primary text-white" : "text-foreground/50"
            }`}
            title="Dark Mode"
          >
            <Moon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

import { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { getNavItemsByRole } from "./config-navData";
import { selectUser } from "../../redux/slices/authSlice";
import { useThemeContext } from "../../theme/ThemeProvider";

function Page({ children }: any) {
  const [sideBarOn, setSideBarOn] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const user = useSelector(selectUser);
  const navItems = getNavItemsByRole(user?.role);
  const {theme} = useThemeContext()

  return (
    <div className={`flex ${theme === 'light' ? "bg-gray-100": "bg-background/95"} bg-background/99 relative min-h-screen`}>

      
      {sideBarOn && (
        <div
          onClick={() => setSideBarOn(false)}
          className="fixed inset-0 bg-black/50 z-40 block md:hidden"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        navItems={navItems}
        sideBarOn={sideBarOn}
        setSideBarOn={setSideBarOn}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

    
      <div
        className={`
          py-0 transition-all duration-300 w-full
          md:w-[calc(100%-${isCollapsed ? "6rem" : "16rem"})]
        `}
      >
        <TopBar setSideBarOn={setSideBarOn} />
        <div className="p-2 sm:p-8">{children}</div>
      </div>

    </div>
  );
}

export default Page;
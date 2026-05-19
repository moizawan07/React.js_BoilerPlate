import {
  LayoutDashboard,
  Settings,
  Users,
  ClipboardPlus,
  AirVent,
  CreditCard,
  Wallet,
  Target,
  PieChart,
  BarChart3,
  HelpCircle,
  MessageSquare,
  MessagesSquare,
} from "lucide-react";

// Define navigation structure for each role
const roleBasedNavData: Record<string, any[]> = {
  admin: [
    {
      text: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
    },
    {
      text: "Conversation History",
      icon: MessagesSquare,
      path: "/conversation",
    },
    {
      text: "Prompt",
      icon: AirVent,
      path: "/prompts",
    },
    {
      text: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ],
  // if new roles comes so we can easily add them here
//   user: [
//     {
//       text: "Dashboard",
//       icon: LayoutDashboard,
//       path: "/",
//     },
//     {
//       text: "Transactions",
//       icon: CreditCard,
//       path: "/transactions",
//     },
//     {
//       text: "Wallet",
//       icon: Wallet,
//       path: "/wallet",
//     },
//   ],
};

// Bottom navigation items (Help, Logout)
// export const bottomNavItems = [
//   {
//     text: "Help",
//     icon: HelpCircle,
//     path: "/help",
//   },
// ];

/**
 * Get navigation items based on user role
 * @param role - User's role
 * @returns Array of navigation items for that role
 */
export const getNavItemsByRole = (role: string | undefined): any[] => {
  if (!role) {
    return roleBasedNavData.admin || [];
  }
  return roleBasedNavData[role] || roleBasedNavData.admin || [];
};

export default roleBasedNavData;

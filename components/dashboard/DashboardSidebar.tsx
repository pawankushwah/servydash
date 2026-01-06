"use client";
import Link from "next/link";
import DashboardButton from "./DashboardButton";
import {
  LayoutDashboard,
  ListOrdered,
  Plus,
  Settings,
  Home,
  User,
  LogOut,
  ChevronRight,
  ArrowLeft,
  UserCog,
  KeyRound,
  Bell,
  CreditCard,
  BookOpen,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";

const links = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LayoutDashboard size={18} className="mr-2" />,
  },
  {
    href: "/dashboard/services",
    label: "Services",
    icon: <ListOrdered size={18} className="mr-2" />,
    children: [
      {
        href: "/dashboard/services",
        label: "My Services",
        icon: <ListOrdered size={18} className="mr-2" />,
      },
      {
        href: "/dashboard/services/new",
        label: "Add New Service",
        icon: <Plus size={18} className="mr-2" />,
      },
    ],
  },
  {
    href: "/dashboard/blogs",
    label: "Blogs",
    icon: <BookOpen size={18} className="mr-2" />,
    children: [
      {
        href: "/dashboard/blogs",
        label: "My Blogs",
        icon: <ListOrdered size={18} className="mr-2" />,
      },
      {
        href: "/dashboard/blogs/new",
        label: "Add New Blog",
        icon: <Plus size={18} className="mr-2" />,
      },
    ],
  },
  {
    label: "Settings",
    icon: <Settings size={18} className="mr-2" />,
    children: [
      {
        href: "/dashboard/settings/profile",
        label: "Profile Settings",
        icon: <UserCog size={18} className="mr-2" />,
      },
      {
        href: "/dashboard/settings/account",
        label: "Account Settings",
        icon: <KeyRound size={18} className="mr-2" />,
      },
      {
        href: "/dashboard/settings/notifications",
        label: "Notification Settings",
        icon: <Bell size={18} className="mr-2" />,
      },
      {
        href: "/dashboard/settings/billing",
        label: "Billing & Payments",
        icon: <CreditCard size={18} className="mr-2" />,
      },
    ],
  },
];

const bottomLinks = [
  {
    href: "/",
    label: "Back to Home",
    icon: <Home size={18} className="mr-2" />,
  },
  {
    href: "/dashboard/profile",
    label: "Profile",
    icon: <User size={18} className="mr-2" />,
  },
];

export default function DashboardSidebar() {
  const [expandedParent, setExpandedParent] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Helper to get children for expanded parent
  const expandedChildren = expandedParent
    ? links.find((l) => l.label === expandedParent)?.children || []
    : [];

  // Sidebar content as a component for reuse
  const SidebarContent = (
    <div className="flex flex-col h-full">
      <div className="mb-8">
        <div className="text-2xl font-bold text-slate-900 bg-white p-2 rounded-lg dark:bg-gray-800 dark:text-white">
          Servy<span className="text-cyan-500">Dash</span>
        </div>
      </div>
      <nav className="flex-1 flex flex-col justify-between space-y-6">
        {/* Upper Section */}
        <div className="flex flex-col space-y-2 min-h-[300px]">
          <AnimatePresence mode="wait">
            {!expandedParent ? (
              <motion.div
                key="main-links"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-2"
              >
                {links.map((link) =>
                  link.children ? (
                    <DashboardButton
                      key={link.label}
                      icon={link.icon}
                      trailingIcon={<ChevronRight size={18} />}
                      onClick={() => setExpandedParent(link.label)}
                    >
                      {link.label}
                    </DashboardButton>
                  ) : (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                    >
                      <DashboardButton icon={link.icon}>
                        {link.label}
                      </DashboardButton>
                    </Link>
                  )
                )}
              </motion.div>
            ) : (
              <motion.div
                key="children-links"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col space-y-2"
              >
                <DashboardButton
                  icon={<ArrowLeft size={18} />}
                  onClick={() => setExpandedParent(null)}
                >
                  <span className="ml-2">Back</span>
                </DashboardButton>
                {expandedChildren.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                  >
                    <DashboardButton icon={child.icon}>{child.label}</DashboardButton>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col space-y-2">
          {bottomLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors mt-auto"
            >
              <DashboardButton icon={link.icon}>{link.label}</DashboardButton>
            </Link>
          ))}
          <LogoutLink href="/">
            <DashboardButton
              icon={<LogOut size={18} className="mr-2" />}
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-500 dark:hover:bg-red-500/20"
            >
              Log Out
            </DashboardButton>
          </LogoutLink>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar toggle button */}
      <button
        className="fixed top-4 left-4 z-40 md:hidden bg-cyan-500 text-white p-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar"
      >
        <LayoutDashboard size={24} />
      </button>

      {/* Sidebar for desktop */}
      <aside className="hidden md:flex min-h-screen max-h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex-col p-3">
        {SidebarContent}
      </aside>

      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex"
          >
            {/* Overlay background */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setOpen(false)}
              aria-label="Close sidebar overlay"
            />
            {/* Sidebar panel */}
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ duration: 0.25 }}
              className="relative min-h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col p-3 z-50 shadow-xl"
            >
              {/* Close button */}
              <button
                className="absolute top-3 -right-10 text-gray-500 hover:text-cyan-500 focus:outline-none"
                onClick={() => setOpen(false)}
                aria-label="Close sidebar"
              >
                <ArrowLeft size={24} />
              </button>
              {SidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

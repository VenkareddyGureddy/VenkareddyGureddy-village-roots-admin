"use client";

import { usePathname, useRouter } from "next/navigation";
import { Bell, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

/* ------------------------------------------------------------------ */
/* Route → Title Mapping                                               */
/* ------------------------------------------------------------------ */
const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/products": "Products",
  "/orders": "Orders",
  "/users": "Users",
};

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  // 🔹 TEMP MOCK USER (replace with real auth later)
  const user = { email: "admin@vr.com", role: "admin" };

  const pageTitle = ROUTE_TITLES[pathname] ?? "Dashboard";
  const userInitials =
    user.email?.slice(0, 2).toUpperCase() ?? "AD";

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-[#f8f6f2] px-4 sm:px-6">
      {/* ---------------- Left: Breadcrumb ---------------- */}
      <nav className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">Admin</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-foreground">
          {pageTitle}
        </span>
      </nav>

      {/* ---------------- Right: Actions ---------------- */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-80"
          >
            <DropdownMenuLabel>
              Notifications
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <NotificationItem
              title="New order received"
              subtitle="Order #1234 · 5 min ago"
            />
            <NotificationItem
              title="Low stock alert"
              subtitle="Fresh Milk · 1 hour ago"
            />
            <NotificationItem
              title="New user registered"
              subtitle="john@example.com · 2 hours ago"
            />

            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary text-sm">
                  {userInitials}
                </AvatarFallback>
              </Avatar>

              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium">
                  {user.email}
                </span>
                <span className="text-xs text-muted-foreground">
                  {user.role}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive cursor-pointer"
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Notification Item                                                   */
/* ------------------------------------------------------------------ */
function NotificationItem({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
      <span className="font-medium">{title}</span>
      <span className="text-xs text-muted-foreground">
        {subtitle}
      </span>
    </DropdownMenuItem>
  );
}

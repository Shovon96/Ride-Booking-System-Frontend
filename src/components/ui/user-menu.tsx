import {
  LogOutIcon,
  User,
  Shield,
  Mail,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authApi, useLogoutMutation, useUserDataQuery } from "@/redux/features/api/auth.api";
import { useAppDispatch } from "@/redux/hooks"

export default function UserMenu() {

  const { data } = useUserDataQuery(undefined)
  const [logout] = useLogoutMutation()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    await logout(undefined)
    dispatch(authApi.util.resetApiState());
  }

  // Get initials from name
  const getInitials = (name: string | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Get role color
  const getRoleColor = (role: string | undefined) => {
    switch (role?.toUpperCase()) {
      case "DRIVER":
        return "text-[#0862ca]";
      case "RIDER":
        return "text-[#d01622]";
      case "ADMIN":
        return "text-purple-600";
      default:
        return "text-gray-600";
    }
  };

  // Get role background
  const getRoleBg = (role: string | undefined) => {
    switch (role?.toUpperCase()) {
      case "DRIVER":
        return "bg-gradient-to-r from-[#0862ca]/10 to-[#0862ca]/5";
      case "RIDER":
        return "bg-gradient-to-r from-[#d01622]/10 to-[#d01622]/5";
      case "ADMIN":
        return "bg-gradient-to-r from-purple-600/10 to-purple-600/5";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent cursor-pointer group">
          <div className="relative">
            <Avatar className="ring-2 ring-transparent group-hover:ring-[#0862ca]/50 transition-all duration-300">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile image" />
              <AvatarFallback className="bg-gradient-to-br from-[#0862ca] to-[#d01622] text-white font-bold">
                {getInitials(data?.data?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-0 overflow-hidden" align="end">
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-r from-[#0862ca] via-[#0862ca]/90 to-[#d01622] p-4 text-white">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-white/50">
              <AvatarImage src="https://github.com/shadcn.png" alt="Profile image" />
              <AvatarFallback className="bg-white/20 text-white font-bold text-lg">
                {getInitials(data?.data?.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <User className="h-3.5 w-3.5 opacity-80" />
                <span className="text-sm font-bold truncate">
                  {data?.data?.name || "User"}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Mail className="h-3 w-3 opacity-70" />
                <span className="text-xs opacity-90 truncate">
                  {data?.data?.email || "user@example.com"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Role Badge */}
        <div className="p-3">
          <div className={`${getRoleBg(data?.data?.role)} rounded-xl p-3 border border-gray-200`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Shield className={`h-4 w-4 ${getRoleColor(data?.data?.role)}`} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-600 font-medium">Account Type</p>
                <p className={`text-sm font-bold capitalize ${getRoleColor(data?.data?.role)}`}>
                  {data?.data?.role || "User"}
                </p>
              </div>
              <Sparkles className={`h-4 w-4 ${getRoleColor(data?.data?.role)}`} />
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="my-0" />

        {/* Logout Button */}
        <div className="p-3">
          <DropdownMenuItem className="p-0 focus:bg-transparent">
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="w-full cursor-pointer hover:bg-gradient-to-r hover:from-[#d01622]/10 hover:to-[#d01622]/5 hover:border-[#d01622]/50 hover:text-[#d01622] transition-all duration-300 group font-semibold"
            >
              <LogOutIcon size={16} className="opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
              Logout
            </Button>
          </DropdownMenuItem>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-4 py-2 border-t">
          <p className="text-xs text-center text-gray-500">
            Powered by <span className="font-semibold text-[#0862ca]">CHOLORIDE</span>
          </p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

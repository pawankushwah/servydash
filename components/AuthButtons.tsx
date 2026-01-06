"use client";

import { 
  RegisterLink, 
  LoginLink, 
  LogoutLink 
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export const AuthButtons = () => {
  const { isAuthenticated, isLoading } = useKindeBrowserClient();

  // Show a ghost/loading state while checking auth to prevent UI flickering
  if (isLoading) return <div className="w-20 h-10 bg-gray-100 animate-pulse rounded-md" />;

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-4">
        <LogoutLink className="px-4 py-2 border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition cursor-pointer">
          Log Out
        </LogoutLink>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center md:justify-start">
      <LoginLink className="px-4 py-2 font-medium text-gray-700 hover:text-blue-600 cursor-pointer">
        Sign In
      </LoginLink>
      
      <RegisterLink className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 shadow-sm transition cursor-pointer">
        Create Storefront
      </RegisterLink>
    </div>
  );
};
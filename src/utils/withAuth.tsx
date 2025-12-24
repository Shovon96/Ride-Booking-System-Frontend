import { UserRole } from "@/constants/userRole";
import { useUserDataQuery } from "@/redux/features/api/auth.api";
import type { ComponentType } from "react";
import { Navigate } from "react-router";


export const withAuth = ( Component: ComponentType, allowedRoles?: UserRole[] ) =>
{
    return function AuthWrapper ()
    {
        const { data, isLoading } = useUserDataQuery(undefined);
        const userRole = data?.data?.role;

        // If PUBLIC role is allowed, skip authentication check
        if ( allowedRoles && allowedRoles.includes( UserRole.PUBLIC ) )
        {
            return <Component />;
        }

        if ( !data?.data?.username && !isLoading )
        {
            return <Navigate to="/login" />;
        }

        // console.log(allowedRoles, userRole)
        if ( allowedRoles && !isLoading && !allowedRoles.includes( userRole ) )
        {
            return <Navigate to="/unauthorized" />;
        }

        return <Component />;
    };
};
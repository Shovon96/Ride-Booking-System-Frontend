/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserStatsPage } from "@/components/pages/user/userStatsPage";
import { lazy } from "react";

const RequestRidePage = lazy( () => import( "@/components/pages/ride/requestRide/page" ) );
const RideInfoPage = lazy( () => import( "@/components/pages/ride/rideInfo/page" ) );
const CheckRideRequestPage = lazy( () => import( "@/components/pages/ride/checkRideRequest/page" ) );
const CheckRideStatus = lazy( () => import( "@/components/pages/ride/rideHistory/page" ) );
const VehicleInfoPage = lazy( () => import( "@/components/pages/user/stats/page" ) );
const UserInfo = lazy( () => import( "@/components/pages/user/userInfo/page" ) );
const UpdateUserPage = lazy( () => import( "@/components/pages/user/updateUser/page" ) );
const ControlUserPage = lazy( () => import( "@/components/pages/user/manageAccessUser/page.tsx" ) ); 
const SeeRidesPage = lazy( () => import( "@/components/pages/ride/rideHistory/page" ) );


export const navItemLinks = {
  menu: [
    {
      title: "Ride",
      url: "/ride",
      roles: ["RIDER", "ADMIN", "DRIVER"],
      items: [
        {
          title: "Take a Ride",
          description: "Request a new ride",
          url: "/ride/request-ride",
          roles: [ "RIDER", "ADMIN" ],
          Component: RequestRidePage
        },
        {
          title: "Ride History",
          description: "See your all ride history",
          url: "/ride/ride-info",
          roles: [ "RIDER", "DRIVER", "ADMIN" ],
          Component: SeeRidesPage
        },
        {
          title: "Check Requested Ride",
          description: "Check your requested ride status",
          url: "/ride/check-ride-request",
          roles: [ "DRIVER" ],
          Component: CheckRideRequestPage
        },
      ],
    },
    {
      title: "User panel",
      url: "/user",
      roles: ["RIDER", "ADMIN", "DRIVER"],
      items: [
        {
          title: "User Info",
          description: "Profile and settings",
          url: "/user/info",
          roles: [ "RIDER", "ADMIN", "DRIVER" ],
          Component: UserInfo
          
        },
        {
          title: "User Stats",
          description: "User stats and details for individuals",
          url: "/user/user-stats",
          roles: [ "DRIVER" , "RIDER", "ADMIN"],
          Component: UserStatsPage
        },
        {
          title: "Control User",
          description: "Manage user access",
          url: "/user/manage-access",
          roles: [ "ADMIN" ],
          Component: ControlUserPage
        },
      ],
    },
    {
      title: "About",
      url: "/about",
      roles: ["PUBLIC", "RIDER", "DRIVER", "ADMIN"],
    },
    {
      title: "FAQ",
      url: "/faq",
      roles: [ "PUBLIC", "RIDER", "DRIVER", "ADMIN" ],
    },
    {
      title: "Features",
      url: "/test-features",
      roles: [ "PUBLIC", "RIDER", "DRIVER", "ADMIN" ],
    },
    {
      title: "Contact",
      url: "/wrong-contact-information",
      roles: [ "PUBLIC", "RIDER", "DRIVER", "ADMIN" ],
    },
  ],
  auth: {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/registration" },
  },
};

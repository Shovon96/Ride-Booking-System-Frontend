import AboutPage from "@/components/pages/About";
import AccountStatusPage from "@/components/pages/AcoountStatPage";
import LoginPage from "@/components/pages/auth/login/page";
import RegistrationPage from "@/components/pages/auth/registration/page";
import ContactPage from "@/components/pages/ContactPage";
import FAQPage from "@/components/pages/FaqPage";
import FeaturesPage from "@/components/pages/FeaturesPage";
import NotFoundPage from "@/components/pages/NotFound";
import UnAuthPage from "@/components/pages/UnAuthPage";
import BikeProductDetailPage from "@/components/pages/vehicles-product/bike-products/[id]/page";
import BikePartsProductPage from "@/components/pages/vehicles-product/bike-products/page";
import CarProductDetailPage from "@/components/pages/vehicles-product/car-products/[id]/page";
import CarPartsProductPage from "@/components/pages/vehicles-product/car-products/page";
import { navItemLinks } from "@/constants/links";
import { UserRole } from "@/constants/userRole";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { lazy } from "react";
import { createBrowserRouter } from "react-router";

const App = lazy( () => import( "@/App" ) );
const Home = lazy( () => import( "@/components/pages/home/page" ) );
const RideInfoPage = lazy( () => import( "@/components/pages/ride/rideInfo/page" ) );

const dynamicRoutes =  generateRoutes( navItemLinks );

export const appRouter = createBrowserRouter( [
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
        
      },
      ...dynamicRoutes,
      {
        path: "/ride/ride-info/:id",
        Component: withAuth(RideInfoPage, [UserRole.DRIVER, UserRole.ADMIN, UserRole.RIDER]),
      },
      {
        path: '/vehicles-product/car-products',
        component: CarPartsProductPage
      },
      {
        path: '/vehicles-product/bike-products',
        component: BikePartsProductPage
      },
      {
        path: '/vehicles-product/car-products/:id',
        Component: CarProductDetailPage
      },
      {
        path: '/vehicles-product/bike-products/:id',
        Component: BikeProductDetailPage
      },
      {
        path: '/about',
        Component: AboutPage
      },
      {
        path: '/faq',
        Component: FAQPage
      },
      {
        path: '/test-features',
        Component: FeaturesPage
      },
      {
        path: '/wrong-contact-information',
        Component: ContactPage
      },
    ]
  },
  {
    path: "*",
    Component: NotFoundPage
  },
  {
    path: "/login",
    Component: LoginPage
  },
  {
    path: "/registration",
    Component: RegistrationPage
  },
  {
    path: "/account-status-page/:id",
    Component: AccountStatusPage
  },
  {
    path: "/unauthorized",
    Component: UnAuthPage,
  }
] );

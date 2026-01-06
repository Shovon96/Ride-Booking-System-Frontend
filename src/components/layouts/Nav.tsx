
import {
  Accordion
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItemLinks } from "@/constants/links";
import { authApi, useLogoutMutation, useUserDataQuery } from "@/redux/features/api/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { Link, useLocation, useNavigate } from "react-router";
import { renderMenuItem, renderMobileMenuItem } from "../ui/NavComponents";
import Logo from "@/assets/Logo";
import { Heart, Menu } from "lucide-react";
import UserMenu from "../ui/user-menu";

const Navbar = () => {
  const { data } = useUserDataQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log( location );

  // console.log( data )

  const userRole = data?.data?.role || "PUBLIC";

  const filterMenuByRole = (menu, role) =>
    menu.filter((item) => item.roles?.includes(role))
      .map((item) => ({
        ...item,
        items: item.items
          ? item.items.filter((sub) => sub.roles?.includes(role))
          : undefined,
      }));

  const { auth, menu } = navItemLinks;
  const roleBasedMenu = filterMenuByRole(menu, userRole);
  // console.log(auth?.login?.url)

  const handleLogout = async () => {
    await logout(undefined);
    // console.log("logout", res);

    dispatch(authApi.util.resetApiState());
    navigate("/login")
  }

  return (
    <section className="sticky top-0 left-0 w-full p-2 bg-gradient-to-r from-gray-100/90 to-gray-100/30 backdrop-blur-md border border-gray-500/20 shadow-lg z-50">
      <div className="">
        {/* Desktop Menu */}
        <nav className="hidden max-w-7xl mx-auto px-6 md:hidden justify-between items-center lg:flex w-full">
          <div className="flex items-center justify-between gap-6">
            {/* Logo */}
            <Logo />
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {roleBasedMenu.map((item) => renderMenuItem(item, location?.pathname))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* wishlist */}
            <Link to={"/wishlist"}>
              <Button variant="ghost" className="cursor-pointer">
                <Heart className="size-6 text-gray-800" />
              </Button>
            </Link>
            {/* User menu */}
            {!data?.data?.email && <Link to={"/login"}>
              <Button variant="default" className="cursor-pointer bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:bg-gradient-to-br hover:from-[#d01622] hover:to-[#0862ca]">Login</Button>
            </Link>
            }
            {data?.data?.email &&
              <UserMenu />
            }
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Logo />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {roleBasedMenu.map((item) => renderMobileMenuItem(item, location?.pathname))}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    {
                      data?.data ? (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-sm text-muted-foreground"
                            onClick={handleLogout}
                          >
                            Logout
                          </Button>
                          <Button>
                            {data?.data?.name} || {data?.data?.role}
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button className="text-black bg-yellow-50" asChild variant="outline" size="sm">
                            <Link to={auth?.login?.url}>{auth?.login?.title}</Link>
                          </Button>
                          <Button asChild size="sm" className="text-white bg-yellow-500">
                            <Link to={auth?.signup?.url}>{auth?.signup?.title}</Link>
                          </Button>
                        </>
                      )
                    }
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar };

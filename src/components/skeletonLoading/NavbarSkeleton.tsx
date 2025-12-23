import { Skeleton } from "@/components/ui/skeleton";

export const NavbarSkeleton = () => {
  return (
    <section className="sticky top-0 left-0 w-full p-2 bg-gradient-to-r from-gray-200 to-gray-100/30 backdrop-blur-md border border-gray-500/20 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex justify-between items-center h-16">
          {/* Logo Skeleton */}
          <Skeleton className="h-10 w-32" />

          {/* Desktop Menu Items Skeleton */}
          <div className="hidden lg:flex items-center gap-6">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-28" />
          </div>

          {/* User Menu / Login Button Skeleton */}
          <div className="hidden lg:block">
            <Skeleton className="h-10 w-24 rounded-full" />
          </div>

          {/* Mobile Menu Button Skeleton */}
          <div className="block lg:hidden">
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </nav>
      </div>
    </section>
  );
};

import { Skeleton } from "@/components/ui/skeleton";

export const PageBannerSkeleton = () => {
  return (
    <section className="relative h-[550px] lg:h-[650px] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full lg:w-3/5 space-y-8">

          {/* Title Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-16 w-full max-w-2xl" />
            <Skeleton className="h-16 w-4/5 max-w-xl" />
          </div>

          {/* Description Skeleton */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-full max-w-2xl" />
            <Skeleton className="h-6 w-3/4 max-w-xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

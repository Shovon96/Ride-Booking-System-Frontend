import { Skeleton } from "@/components/ui/skeleton";

export const HeroSectionSkeleton = () => {
  return (
    <section className="relative h-[650px] lg:h-[750px] overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="w-full lg:w-3/5 space-y-8">
          {/* Badge Skeleton */}
          <Skeleton className="h-10 w-48 rounded-full" />

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

          {/* Buttons Skeleton */}
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-14 w-40 rounded-xl" />
            <Skeleton className="h-14 w-40 rounded-xl" />
          </div>
        </div>
      </div>

      {/* Navigation Arrows Skeleton */}
      <div className="absolute left-6 top-1/2 -translate-y-1/2">
        <Skeleton className="h-16 w-16 rounded-2xl" />
      </div>
      <div className="absolute right-6 top-1/2 -translate-y-1/2">
        <Skeleton className="h-16 w-16 rounded-2xl" />
      </div>

      {/* Dots Indicator Skeleton */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
        <Skeleton className="h-3 w-10 rounded-full" />
        <Skeleton className="h-3 w-3 rounded-full" />
      </div>
    </section>
  );
};

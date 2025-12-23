import { Skeleton } from "@/components/ui/skeleton";

export const StatsSectionSkeleton = () => {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="text-center space-y-3">
              {/* Number Skeleton */}
              <Skeleton className="h-12 w-32 mx-auto" />
              {/* Label Skeleton */}
              <Skeleton className="h-5 w-24 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

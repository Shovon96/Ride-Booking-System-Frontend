import { Skeleton } from "@/components/ui/skeleton";

export default function FooterSkeleton() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section Skeleton */}
          <div className="lg:col-span-2">
            <Skeleton className="h-10 w-32 mb-4 bg-gray-700" />
            <Skeleton className="h-20 w-full max-w-md mb-6 bg-gray-700" />
            <div className="flex gap-3">
              <Skeleton className="h-12 w-12 rounded-xl bg-gray-700" />
              <Skeleton className="h-12 w-12 rounded-xl bg-gray-700" />
              <Skeleton className="h-12 w-12 rounded-xl bg-gray-700" />
            </div>
          </div>

          {/* Quick Links Skeleton */}
          <div>
            <Skeleton className="h-6 w-24 mb-6 bg-gray-700" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-20 bg-gray-700" />
              <Skeleton className="h-4 w-16 bg-gray-700" />
              <Skeleton className="h-4 w-24 bg-gray-700" />
            </div>
          </div>

          {/* Contact Info Skeleton */}
          <div>
            <Skeleton className="h-6 w-28 mb-6 bg-gray-700" />
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-lg bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-16 bg-gray-700" />
                  <Skeleton className="h-4 w-32 bg-gray-700" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-lg bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-16 bg-gray-700" />
                  <Skeleton className="h-4 w-40 bg-gray-700" />
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Skeleton className="h-10 w-10 rounded-lg bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-16 bg-gray-700" />
                  <Skeleton className="h-4 w-36 bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar Skeleton */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Skeleton className="h-4 w-64 bg-gray-700" />
            <div className="flex items-center gap-6">
              <Skeleton className="h-4 w-24 bg-gray-700" />
              <Skeleton className="h-4 w-28 bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

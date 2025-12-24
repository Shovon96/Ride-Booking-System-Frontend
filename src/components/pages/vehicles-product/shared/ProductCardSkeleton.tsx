import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ProductCardSkeleton = () => (
  <Card className="h-full overflow-hidden p-0">
    <CardHeader className="p-0">
      <Skeleton className="h-48 w-full rounded-t-xl" />
    </CardHeader>
    <CardContent className="p-4 space-y-3">
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <div className="flex items-center gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-5 w-16" />
      </div>
    </CardContent>
    <CardFooter className="p-4 pt-0 flex gap-2">
      <Skeleton className="h-10 flex-1" />
      <Skeleton className="h-10 w-20" />
    </CardFooter>
  </Card>
);

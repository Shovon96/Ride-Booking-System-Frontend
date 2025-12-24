import { useParams, Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ProductDetail } from '../../shared/ProductDetail';
import { useGetVehicleProductByIdQuery } from '@/redux/features/api/vehicle-product.api';

const DetailPageSkeleton = () => (
  <div className="min-h-screen bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Skeleton className="h-10 w-32 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Skeleton className="h-96 w-full rounded-xl" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  </div>
);

export default function CarProductDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetVehicleProductByIdQuery(id || '', {
    skip: !id,
  });

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (error || !data?.data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Product Not Found
          </h1>
          <Link to="/car-parts">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <ProductDetail
      product={data.data}
      backPath="/car-parts"
      backLabel="Back to Car Parts"
    />
  );
}

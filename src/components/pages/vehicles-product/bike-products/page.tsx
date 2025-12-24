import { Search, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../shared/ProductCard';
import { ProductCardSkeleton } from '../shared/ProductCardSkeleton';
import { ProductHero } from '../shared/ProductHero';
import { useGetVehicleProductsQuery } from '@/redux/features/api/vehicle-product.api';

export default function BikePartsProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error } = useGetVehicleProductsQuery({
    category: 'BIKE',
    search: debouncedSearch || undefined,
    limit: 12
  });

  const products = data?.data || [];
  const errorMessage = error ? 'Failed to load products' : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <ProductHero
        category="BIKE"
        title="Premium"
        subtitle="Bike Parts"
        backgroundImage="https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg"
      />

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-xl w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#d01622] focus:ring-2 focus:ring-[#d01622]/20 transition-all duration-300"
                placeholder="Search bike parts..."
              />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-gray-900">
              {isLoading ? 'Loading Products...' : errorMessage ? 'Error Loading Products' : `${products.length} Products Available`}
            </h2>
          </div>

          {errorMessage && (
            <div className="text-center py-16">
              <p className="text-xl text-red-600">{errorMessage}</p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                  detailsPath="/vehicles-product/bike-products"
                />
              ))
            )}
          </div>

          {!isLoading && !errorMessage && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

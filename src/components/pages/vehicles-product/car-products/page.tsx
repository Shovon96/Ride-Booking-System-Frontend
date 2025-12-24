import { Search, Filter, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '../shared/ProductCard';
import { ProductCardSkeleton } from '../shared/ProductCardSkeleton';
import { ProductHero } from '../shared/ProductHero';
import { useGetVehicleProductsQuery } from '@/redux/features/api/vehicle-product.api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';

export default function CarPartsProductPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [status, setStatus] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('-createdAt');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data, isLoading, error } = useGetVehicleProductsQuery({
    category: 'CAR',
    search: debouncedSearch || undefined,
    status: status || undefined,
    sortBy: sortBy || undefined,
    minPrice: minPrice ? parseFloat(minPrice) : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
    page: currentPage,
    limit: 12
  });

  const products = data?.data || [];
  const pagination = data?.meta;
  const errorMessage = error ? 'Failed to load products' : null;

  const clearFilters = () => {
    setStatus('');
    setSortBy('-createdAt');
    setMinPrice('');
    setMaxPrice('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const hasActiveFilters = status || minPrice || maxPrice || searchTerm;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <ProductHero
        category="CAR"
        title="Premium"
        subtitle="Car Parts"
        backgroundImage="https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg"
      />

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search and Filter Toggle */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-xl w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#0862ca] focus:ring-2 focus:ring-[#0862ca]/20 transition-all duration-300"
                  placeholder="Search car parts..."
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="gap-2 cursor-pointer"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </Button>
                {hasActiveFilters && (
                  <Button 
                    variant="outline" 
                    className="gap-2 cursor-pointer text-red-600 hover:text-red-700"
                    onClick={clearFilters}
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </Button>
                )}
              </div>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Status</label>
                  <Select value={status} onValueChange={setStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="In Stock">In Stock</SelectItem>
                      <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-createdAt">Newest First</SelectItem>
                      <SelectItem value="createdAt">Oldest First</SelectItem>
                      <SelectItem value="price">Price: Low to High</SelectItem>
                      <SelectItem value="-price">Price: High to Low</SelectItem>
                      <SelectItem value="title">Name: A to Z</SelectItem>
                      <SelectItem value="-title">Name: Z to A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Min Price</label>
                  <Input
                    type="number"
                    placeholder="$0"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border-gray-300"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Max Price</label>
                  <Input
                    type="number"
                    placeholder="$1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border-gray-300"
                  />
                </div>
              </div>
            )}
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
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  index={index}
                  detailsPath="/vehicles-product/car-products"
                />
              ))
            )}
          </div>

          {!isLoading && !errorMessage && products.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No products found matching your search.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4"
              >
                Previous
              </Button>
              
              <div className="flex gap-2">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 ${currentPage === page ? 'bg-[#0862ca]' : ''}`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
                disabled={currentPage === pagination.totalPages}
                className="px-4"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

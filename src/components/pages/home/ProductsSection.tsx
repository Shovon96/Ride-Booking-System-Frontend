import { motion } from 'framer-motion';
import { ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { useGetVehicleProductsQuery } from '@/redux/features/api/vehicle-product.api';
import { ProductCard } from '../vehicles-product/shared/ProductCard';
import { ProductCardSkeleton } from '../vehicles-product/shared/ProductCardSkeleton';

export const ProductsSection = () => {
  const { data, isLoading } = useGetVehicleProductsQuery({
    limit: 8,
  });

  const products = data?.data || [];

  return (
    <section className="py-20 bg-gradient-to-b from-red-50/70 to-blue-50/70 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 px-4 py-2 rounded-full mb-4">
            <Package className="h-5 w-5 text-[#0862ca]" />
            <span className="text-sm font-semibold text-gray-700">Vehicle Parts</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Premium{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
              Auto Parts
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover high-quality parts for your car and bike. From brake systems to safety gear, we've got you covered.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          ) : (
            products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={product._id}
                product={product}
                index={index}
                detailsPath={`/vehicles-product/${product.category.toLowerCase()}-products`}
              />
            ))
          )}
        </div>

        {/* View All Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/vehicles-product/car-products">
            <Button
              size="lg"
              className="gap-2 cursor-pointer bg-gradient-to-r from-[#0862ca] to-[#0862ca]/80 hover:shadow-xl transition-all duration-300 group"
            >
              View All Car Parts
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/vehicles-product/bike-products">
            <Button
              size="lg"
              className="gap-2 cursor-pointer bg-gradient-to-r from-[#d01622] to-[#d01622]/80 hover:shadow-xl transition-all duration-300 group"
            >
              View All Bike Parts
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

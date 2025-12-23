import { motion } from 'framer-motion';
import { Search, Sparkles, ShoppingCart, Eye, Star, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Demo Data
const carProducts = [
  {
    id: 1,
    title: 'Premium Brake Pads Set',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
    description: 'High-performance ceramic brake pads for superior stopping power and durability.',
    price: 89.99,
    rating: 4.8,
    reviews: 124,
    status: 'In Stock',
    type: 'Brake System',
    brand: 'AutoPro'
  },
  {
    id: 2,
    title: 'LED Headlight Assembly',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    description: 'Ultra-bright LED headlights with automatic leveling and adaptive beam control.',
    price: 249.99,
    rating: 4.9,
    reviews: 89,
    status: 'In Stock',
    type: 'Lighting',
    brand: 'LightMax'
  },
  {
    id: 3,
    title: 'Performance Air Filter',
    image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg',
    description: 'Washable and reusable air filter for improved engine performance and fuel efficiency.',
    price: 54.99,
    rating: 4.7,
    reviews: 156,
    status: 'In Stock',
    type: 'Engine Parts',
    brand: 'AirFlow'
  },
  {
    id: 4,
    title: 'All-Season Wiper Blades',
    image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg',
    description: 'Durable silicone wiper blades for clear visibility in all weather conditions.',
    price: 29.99,
    rating: 4.6,
    reviews: 203,
    status: 'In Stock',
    type: 'Accessories',
    brand: 'ClearView'
  },
  {
    id: 5,
    title: 'Heavy-Duty Car Battery',
    image: 'https://images.pexels.com/photos/13861/IMG_3496bfree.jpg',
    description: 'Long-lasting 12V battery with 800 CCA for reliable starting power.',
    price: 159.99,
    rating: 4.9,
    reviews: 78,
    status: 'Low Stock',
    type: 'Electrical',
    brand: 'PowerCell'
  },
  {
    id: 6,
    title: 'Sport Exhaust System',
    image: 'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
    description: 'Stainless steel exhaust system for enhanced performance and aggressive sound.',
    price: 599.99,
    rating: 4.8,
    reviews: 45,
    status: 'In Stock',
    type: 'Exhaust',
    brand: 'TurboFlow'
  },
  {
    id: 7,
    title: 'Synthetic Motor Oil 5W-30',
    image: 'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg',
    description: 'Premium full synthetic motor oil for maximum engine protection and performance.',
    price: 34.99,
    rating: 4.7,
    reviews: 312,
    status: 'In Stock',
    type: 'Fluids',
    brand: 'OilGuard'
  },
  {
    id: 8,
    title: 'Carbon Fiber Side Mirrors',
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    description: 'Lightweight carbon fiber mirrors with integrated turn signals and heating.',
    price: 189.99,
    rating: 4.6,
    reviews: 67,
    status: 'In Stock',
    type: 'Exterior',
    brand: 'CarbonTech'
  },
];

// Product Card Skeleton
const ProductCardSkeleton = () => (
  <Card className="h-full overflow-hidden">
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

export default function CarPartsProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = carProducts.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0862ca]/80 via-[#0862ca]/60 to-[#d01622]/80" />

        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-2xl space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-sm font-medium text-white tracking-wide">Car Parts Store</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-2xl">
              Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-500">
                Car Parts
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
              Quality automotive parts and accessories for your vehicle
            </p>
          </motion.div>
        </div>
      </section>

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
                className="w-full pl-12 pr-4 py-3 text-gray-900 bg-gray-50 rounded-xl border-2 border-gray-200 focus:border-[#0862ca] focus:ring-2 focus:ring-[#0862ca]/20 transition-all duration-300"
                placeholder="Search car parts..."
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
              {isLoading ? 'Loading Products...' : `${filteredProducts.length} Products Available`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#0862ca]/50 group">
                    <CardHeader className="p-0 relative">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge
                        className={`absolute top-3 right-3 ${
                          product.status === 'In Stock'
                            ? 'bg-green-500'
                            : 'bg-orange-500'
                        }`}
                      >
                        {product.status}
                      </Badge>
                      <Badge className="absolute top-3 left-3 bg-[#0862ca]">
                        {product.type}
                      </Badge>
                    </CardHeader>

                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#0862ca] transition-colors">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-semibold text-gray-900">
                            {product.rating}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          ({product.reviews} reviews)
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className="text-2xl font-black text-[#0862ca]">
                          ${product.price}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Link to={`/vehicles-product/car-products/${product.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full gap-2 hover:bg-[#0862ca]/10 hover:border-[#0862ca] hover:text-[#0862ca]"
                        >
                          <Eye className="h-4 w-4" />
                          Details
                        </Button>
                      </Link>
                      <Button className="gap-2 bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-lg">
                        <ShoppingCart className="h-4 w-4" />
                        Buy
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No products found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

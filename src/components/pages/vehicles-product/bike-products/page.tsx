import { motion } from 'framer-motion';
import { Search, Sparkles, ShoppingCart, Eye, Star, Filter } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';

// Demo Data
const bikeProducts = [
  {
    id: 1,
    title: 'Racing Motorcycle Helmet',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'DOT certified full-face helmet with aerodynamic design and anti-fog visor.',
    price: 149.99,
    rating: 4.9,
    reviews: 234,
    status: 'In Stock',
    type: 'Safety Gear',
    brand: 'SafeRide'
  },
  {
    id: 2,
    title: 'LED Bike Headlight Kit',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    description: 'Ultra-bright 6000K LED headlight with high/low beam and waterproof design.',
    price: 79.99,
    rating: 4.7,
    reviews: 156,
    status: 'In Stock',
    type: 'Lighting',
    brand: 'BrightPath'
  },
  {
    id: 3,
    title: 'Performance Chain Set',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'Heavy-duty chain and sprocket kit for enhanced durability and smooth power transfer.',
    price: 124.99,
    rating: 4.8,
    reviews: 98,
    status: 'In Stock',
    type: 'Drive Train',
    brand: 'ChainMaster'
  },
  {
    id: 4,
    title: 'Sport Riding Gloves',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    description: 'Leather gloves with carbon fiber knuckle protection and touchscreen compatibility.',
    price: 59.99,
    rating: 4.6,
    reviews: 187,
    status: 'In Stock',
    type: 'Safety Gear',
    brand: 'GripPro'
  },
  {
    id: 5,
    title: 'High-Performance Brake Pads',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'Ceramic brake pads for superior stopping power in all weather conditions.',
    price: 44.99,
    rating: 4.8,
    reviews: 142,
    status: 'In Stock',
    type: 'Brake System',
    brand: 'StopMax'
  },
  {
    id: 6,
    title: 'Exhaust System Upgrade',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    description: 'Stainless steel slip-on exhaust for improved performance and deep sound.',
    price: 299.99,
    rating: 4.9,
    reviews: 76,
    status: 'Low Stock',
    type: 'Exhaust',
    brand: 'PowerFlow'
  },
  {
    id: 7,
    title: 'Motorcycle Battery 12V',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'Maintenance-free AGM battery with high cranking power and long life.',
    price: 89.99,
    rating: 4.7,
    reviews: 203,
    status: 'In Stock',
    type: 'Electrical',
    brand: 'VoltPower'
  },
  {
    id: 8,
    title: 'Carbon Fiber Tank Pad',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    description: 'Premium carbon fiber tank protector with 3M adhesive backing.',
    price: 34.99,
    rating: 4.5,
    reviews: 124,
    status: 'In Stock',
    type: 'Accessories',
    brand: 'CarbonShield'
  },
  {
    id: 9,
    title: 'Sport Bike Mirror Set',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'Aerodynamic CNC machined mirrors with wide-angle view and adjustable arms.',
    price: 64.99,
    rating: 4.6,
    reviews: 89,
    status: 'In Stock',
    type: 'Accessories',
    brand: 'ViewMax'
  },
  {
    id: 10,
    title: 'Synthetic Engine Oil 10W-40',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    description: 'Premium motorcycle oil for maximum engine protection and performance.',
    price: 29.99,
    rating: 4.8,
    reviews: 267,
    status: 'In Stock',
    type: 'Fluids',
    brand: 'MotoGuard'
  },
  {
    id: 11,
    title: 'Racing Foot Pegs',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'CNC aluminum foot pegs with aggressive grip pattern for better control.',
    price: 74.99,
    rating: 4.7,
    reviews: 112,
    status: 'In Stock',
    type: 'Controls',
    brand: 'GripTech'
  },
  {
    id: 12,
    title: 'Windscreen Deflector',
    image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
    description: 'Aerodynamic windscreen for reduced wind noise and improved rider comfort.',
    price: 119.99,
    rating: 4.6,
    reviews: 94,
    status: 'In Stock',
    type: 'Accessories',
    brand: 'WindGuard'
  },
];

// Product Card Skeleton
const ProductCardSkeleton = () => (
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

export default function BikePartsProductPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = bikeProducts.filter(product =>
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
            backgroundImage: "url('https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#d01622]/20 via-[#d01622]/20 to-[#0862ca]/60" />

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
              <span className="text-sm font-medium text-white tracking-wide">Bike Parts Store</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight text-white drop-shadow-2xl">
              Premium{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d01622] via-orange-300 to-[#0862ca]">
                Bike Parts
              </span>
            </h1>
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed">
              Quality motorcycle parts and accessories for your ride
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
              {isLoading ? 'Loading Products...' : `${filteredProducts.length} Products Available`}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {isLoading ? (
              Array.from({ length: 12 }).map((_, index) => (
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
                  <Card className="h-full overflow-hidden p-0 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#d01622]/50 group">
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
                      <Badge className="absolute top-3 left-3 bg-[#d01622]">
                        {product.type}
                      </Badge>
                    </CardHeader>

                    <CardContent className="p-4 space-y-3">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[#d01622] transition-colors">
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
                        <span className="text-2xl font-black text-[#d01622]">
                          ${product.price}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex gap-2">
                      <Link to={`/vehicles-product/bike-products/${product?.id}`} className="flex-1">
                        <Button
                          variant="outline"
                          className="w-full gap-2 cursor-pointer hover:bg-[#d01622]/10 hover:border-[#d01622] hover:text-[#d01622]"
                        >
                          <Eye className="h-4 w-4" />
                          Details
                        </Button>
                      </Link>
                      <Button className="gap-2 cursor-pointer bg-gradient-to-r from-[#d01622] to-[#0862ca] hover:scale-105 transition-transform duration-300 text-white">
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

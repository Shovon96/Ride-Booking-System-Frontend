
import { Heart, Trash2, Eye, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';

// Mock data - replace with actual API call later
const mockWishlistItems = [
  {
    _id: '1',
    vehicleId: 'v1',
    vehicleType: 'bike',
    vehicle: {
      _id: 'v1',
      name: 'Honda CBR 150R',
      image: 'https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg',
      pricePerHour: 25,
      type: 'Sport Bike',
      brand: 'Honda',
      status: 'In Stock'
    }
  },
  {
    _id: '2',
    vehicleId: 'v2',
    vehicleType: 'car',
    vehicle: {
      _id: 'v2',
      name: 'Toyota Camry 2023',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      pricePerHour: 45,
      type: 'Sedan',
      brand: 'Toyota',
      status: 'In Stock'
    }
  }
];

export default function WishlistPage() {
  // TODO: Replace with actual API call
  // const { data, isLoading, error } = useGetWishlistQuery();
  const isLoading = false;
  const wishlistItems = mockWishlistItems;
  const isEmpty = wishlistItems.length === 0;

  const handleRemove = (itemId: string) => {
    // TODO: Implement remove functionality
    console.log('Remove item:', itemId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-96 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">Save your favorite vehicles for later</p>
          </div>

          {/* Empty State */}
          <div className="flex flex-col items-center justify-center py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: "spring" }}
              className="mb-6"
            >
              <div className="w-32 h-32 bg-gradient-to-br from-[#0862ca]/10 to-[#d01622]/10 rounded-full flex items-center justify-center">
                <Heart className="w-16 h-16 text-gray-400" strokeWidth={1.5} />
              </div>
            </motion.div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Start adding vehicles to your wishlist to see them here. Browse our collection and save your favorites!
            </p>
            
            <div className="flex gap-4">
              <Link to="/vehicles-product/bike-products">
                <Button className="gap-2 cursor-pointer bg-gradient-to-r from-[#d01622] to-[#0862ca] hover:shadow-lg">
                  Browse Bikes
                </Button>
              </Link>
              <Link to="/vehicles-product/car-products">
                <Button className="gap-2 cursor-pointer bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-lg">
                  Browse Cars
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">My Wishlist</h1>
            <p className="text-gray-600">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          <Link to="/">
            <Button variant="outline" className="gap-2 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => {
            const brandColor = item.vehicleType === 'car' ? '#0862ca' : '#d01622';
            
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="p-0 h-full overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[var(--brand-color)]/50 group relative" style={{ '--brand-color': brandColor } as React.CSSProperties}>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg group/btn"
                    aria-label="Remove from wishlist"
                  >
                    <Trash2 className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                  </button>

                  <CardHeader className="p-0 relative">
                    <img
                      src={item.vehicle.image}
                      alt={item.vehicle.name}
                      className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge
                      className={`absolute top-3 left-3 ${
                        item.vehicle.status === 'In Stock'
                          ? 'bg-green-500'
                          : 'bg-orange-500'
                      }`}
                    >
                      {item.vehicle.status}
                    </Badge>
                    <Badge 
                      className="absolute bottom-3 left-3" 
                      style={{ backgroundColor: brandColor }}
                    >
                      {item.vehicle.type}
                    </Badge>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[var(--brand-color)] transition-colors" style={{ '--brand-color': brandColor } as React.CSSProperties}>
                        {item.vehicle.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{item.vehicle.brand}</p>
                    </div>

                    <div className="pt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black" style={{ color: brandColor }}>
                        ${item.vehicle.pricePerHour}
                      </span>
                      <span className="text-sm text-gray-500">/hour</span>
                    </div>
                  </CardContent>

                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Link 
                      to={`/vehicles-product/${item.vehicleType}-products/${item.vehicle._id}`} 
                      className="flex-1"
                    >
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer gap-2 hover:bg-[var(--brand-color)]/10 hover:border-[var(--brand-color)] hover:text-[var(--brand-color)]"
                        style={{ '--brand-color': brandColor } as React.CSSProperties}
                      >
                        <Eye className="h-4 w-4" />
                        View Details
                      </Button>
                    </Link>
                    <Button 
                      className="gap-2 cursor-pointer bg-gradient-to-r hover:shadow-lg hover:scale-105" 
                      style={{ 
                        backgroundImage: item.vehicleType === 'car' 
                          ? 'linear-gradient(to right, #0862ca, #d01622)' 
                          : 'linear-gradient(to right, #d01622, #0862ca)' 
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Book
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

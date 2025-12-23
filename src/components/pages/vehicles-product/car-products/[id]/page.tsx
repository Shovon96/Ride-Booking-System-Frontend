import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Star, Check, Package, Shield, Truck, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

// Demo Data (same as list page)
const carProducts = [
  {
    id: 1,
    title: 'Premium Brake Pads Set',
    images: [
      'https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg',
      'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
      'https://images.pexels.com/photos/4489702/pexels-photo-4489702.jpeg',
    ],
    description: 'High-performance ceramic brake pads designed for superior stopping power and exceptional durability. These premium brake pads feature advanced ceramic compound technology that provides consistent braking performance in all weather conditions. The low-dust formula keeps your wheels cleaner while reducing brake noise. Perfect for both daily driving and spirited performance applications.',
    price: 89.99,
    rating: 4.8,
    reviews: 124,
    status: 'In Stock',
    type: 'Brake System',
    brand: 'AutoPro',
    sku: 'AP-BP-001',
    warranty: '2 Years',
    specifications: {
      'Material': 'Ceramic Composite',
      'Compatibility': 'Universal Fit',
      'Temperature Range': '-40°C to 650°C',
      'Noise Level': 'Ultra-Quiet',
      'Dust Production': 'Low',
      'Installation': 'Professional Recommended'
    },
    features: [
      'Advanced ceramic compound for superior stopping power',
      'Low-dust formula keeps wheels cleaner',
      'Reduced brake noise and vibration',
      'Excellent heat dissipation',
      'Long-lasting durability',
      'Compatible with most vehicle models'
    ],
    reviews_data: [
      {
        name: 'John Smith',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent brake pads! Noticed immediate improvement in braking performance. Very quiet and minimal dust.'
      },
      {
        name: 'Sarah Johnson',
        rating: 5,
        date: '2024-01-10',
        comment: 'Best brake pads I\'ve used. Great stopping power and my wheels stay much cleaner now.'
      },
      {
        name: 'Mike Davis',
        rating: 4,
        date: '2024-01-05',
        comment: 'Good quality pads. Installation was straightforward. Slight improvement over OEM pads.'
      }
    ]
  },
  // Add more products as needed
];

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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Find product by ID
  const product = carProducts.find(p => p.id === parseInt(id || '1'));

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link to="/vehicles-product/car-products">
            <Button>Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            to="/vehicles-product/car-products"
            className="inline-flex items-center gap-2 text-[#0862ca] hover:text-[#d01622] transition-colors font-semibold"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Car Parts
          </Link>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="space-y-4">
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 right-4 bg-green-500">
                    {product.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-[#0862ca] ring-2 ring-[#0862ca]/20'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div>
                <Badge className="mb-3 bg-[#0862ca]">{product.type}</Badge>
                <h1 className="text-4xl font-black text-gray-900 mb-2">
                  {product.title}
                </h1>
                <p className="text-lg text-gray-600">by {product.brand}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-semibold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              <Separator />

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black text-[#0862ca]">
                  ${product.price}
                </span>
                <span className="text-gray-600">per set</span>
              </div>

              {/* Key Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Package className="h-5 w-5 text-[#0862ca]" />
                  <div>
                    <p className="text-xs text-gray-600">SKU</p>
                    <p className="font-semibold text-gray-900">{product.sku}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <Shield className="h-5 w-5 text-[#0862ca]" />
                  <div>
                    <p className="text-xs text-gray-600">Warranty</p>
                    <p className="font-semibold text-gray-900">{product.warranty}</p>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2 bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-xl text-lg font-bold py-6"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 hover:bg-red-50 hover:border-red-500 hover:text-red-500"
                >
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                <Truck className="h-5 w-5 text-green-600" />
                <p className="text-sm text-green-800 font-medium">
                  Free shipping on orders over $100
                </p>
              </div>
            </motion.div>
          </div>

          {/* Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 space-y-8"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </CardContent>
            </Card>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-semibold text-gray-900">{key}:</span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl font-black">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {product.reviews_data.map((review, index) => (
                  <div key={index} className="border-b last:border-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900">{review.name}</span>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Eye, ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    images: string[];
    description: string;
    price: number;
    rating?: number;
    reviews?: number;
    status: string;
    type: string;
    brand: string;
    category: string;
  };
  index: number;
  detailsPath: string;
}

export const ProductCard = ({ product, index, detailsPath }: ProductCardProps) => {
  const brandColor = product.category === 'CAR' ? '#0862ca' : '#d01622';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="h-full p-0 overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[var(--brand-color)]/50 group" style={{ '--brand-color': brandColor } as React.CSSProperties}>
        <CardHeader className="p-0 relative">
          <img
            src={product.images[0]}
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
          <Badge className="absolute top-3 left-3" style={{ backgroundColor: brandColor }}>
            {product.type}
          </Badge>
        </CardHeader>

        <CardContent className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-[var(--brand-color)] transition-colors" style={{ '--brand-color': brandColor } as React.CSSProperties}>
              {product.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{product.brand}</p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          {product.rating && product.reviews && (
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
          )}

          <div className="pt-2">
            <span className="text-2xl font-black" style={{ color: brandColor }}>
              ${product.price}
            </span>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex gap-2">
          <Link to={`${detailsPath}/${product._id}`} className="flex-1">
            <Button
              variant="outline"
              className="w-full cursor-pointer gap-2 hover:bg-[var(--brand-color)]/10 hover:border-[var(--brand-color)] hover:text-[var(--brand-color)]"
              style={{ '--brand-color': brandColor } as React.CSSProperties}
            >
              <Eye className="h-4 w-4" />
              Details
            </Button>
          </Link>
          <Button className="gap-2 cursor-pointer bg-gradient-to-r hover:shadow-lg hover:scale-105" style={{ backgroundImage: product.category === 'CAR' ? 'linear-gradient(to right, #0862ca, #d01622)' : 'linear-gradient(to right, #d01622, #0862ca)' }}>
            <ShoppingCart className="h-4 w-4" />
            Buy
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

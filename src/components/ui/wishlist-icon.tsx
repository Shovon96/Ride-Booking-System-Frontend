import { Heart } from 'lucide-react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/button';

interface WishlistIconProps {
  count: number;
}

export default function WishlistIcon({ count }: WishlistIconProps) {
  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <Link to="/wishlist">
      <Button 
        variant="ghost" 
        className="relative h-auto p-2 hover:bg-transparent cursor-pointer group"
        aria-label={`Wishlist with ${count} items`}
      >
        <div className="relative">
          <Heart 
            className="size-6 text-gray-600 group-hover:text-[#d01622] group-hover:fill-[#d01622]/20 transition-all duration-300" 
            strokeWidth={2}
          />
          {count > 0 && (
            <div className="absolute -top-2 -right-2 min-w-[20px] h-5 bg-[#d01622] text-white text-xs font-bold rounded-full flex items-center justify-center px-1.5 shadow-lg animate-in zoom-in-50 duration-200">
              {displayCount}
            </div>
          )}
        </div>
      </Button>
    </Link>
  );
}

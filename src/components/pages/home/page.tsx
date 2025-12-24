import { useMyToast } from '@/components/layouts/MyToast';
import { UserRole } from '@/constants/userRole';
import { useUserDataQuery } from '@/redux/features/api/auth.api';
import {
  CarFront,
  CircleDollarSign,
  Clock,
  MapPin,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { MyModal } from '@/components/dialogs/MyModal';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { FeaturesSection } from './FeaturesSection';
import { ImageWithTextSection } from './ImageWithTextSection';
import { TestimonialsSection } from './TestimonialsSection';
import { NewsletterSection } from './NewsletterSection';
import { ProductsSection } from './ProductsSection';
import { HeroSectionSkeleton } from '../../skeletonLoading/HeroSectionSkeleton';
import { StatsSectionSkeleton } from '../../skeletonLoading/StatsSectionSkeleton';

const Home = () => {

  // Feature section data
  const features = [
    {
      icon: <ShieldCheck className="h-12 w-12 m-auto text-green-600" />,
      title: "Safe & Secure",
      description: "All drivers verified with background checks. Your safety is our priority."
    },
    {
      icon: <Clock className="h-12 w-12 m-auto text-blue-600" />,
      title: "Quick Booking",
      description: "Book a ride in seconds. Average pickup time is under 5 minutes."
    },
    {
      icon: <CircleDollarSign className="h-12 w-12 m-auto text-yellow-500" />,
      title: "Affordable Rates",
      description: "Transparent pricing with no  fees. Get the best value for your money."
    },
    {
      icon: <Smartphone className="h-12 w-12 m-auto text-purple-600" />,
      title: "Easy to Use",
      description: "Intuitive app design makes booking rides effortless for everyone."
    }
  ];

  // Testimonial section data
  const testimonials = [
    {
      name: "Aisha Rahman",
      role: "University Student",
      rating: 5,
      comment: "Booking a ride is so simple and affordable. It's perfect for getting to classes on time without stress.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    },
    {
      name: "James Miller",
      role: "Frequent Traveler",
      rating: 5,
      comment: "I use this app for airport rides all the time. The drivers are punctual, and I love being able to track them in real time.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg"
    },
    {
      name: "Sophia Patel",
      role: "Working Mom",
      rating: 5,
      comment: "Safe and reliable rides give me peace of mind when I'm traveling with my kids. Highly recommend this service!",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
      name: "Michael Chen",
      role: "Business Professional",
      rating: 5,
      comment: "The app is incredibly user-friendly and the drivers are always professional. Best ride service I've used!",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
    },
    {
      name: "Emily Johnson",
      role: "Daily Commuter",
      rating: 5,
      comment: "I rely on this service every day for my commute. Always on time, always reliable. Couldn't ask for more!",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    {
      name: "David Martinez",
      role: "Night Shift Worker",
      rating: 5,
      comment: "Even late at night, I can always find a ride. The safety features make me feel secure during my late-night commutes.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    }
  ];

  // Stats countersection data
  const stats = [
    { number: 50, suffix: "K+", label: "Happy Riders" },
    { number: 10, suffix: "K+", label: "Active Drivers" },
    { number: 30, suffix: "+", label: "Cities Served" },
    { number: 5, suffix: "⭐", label: "Average Rating" }
  ];

  // How it works section
  const howItWorksData =
    [
      {
        step: "01",
        icon: <MapPin className="h-8 w-8 text-blue-600" />,
        title: "Set Pickup & Destination",
        description: "Enter your pickup point and where you are going. Our smart maps will detect your location instantly."
      },
      {
        step: "02",
        icon: <CarFront className="h-8 w-8 text-green-600" />,
        title: "Choose Your Ride",
        description: "Pick from standard, premium, or shared rides with transparent pricing before you confirm."
      },
      {
        step: "03",
        icon: <Smartphone className="h-8 w-8 text-purple-600" />,
        title: "Track & Arrive",
        description: "Track your driver in real-time, enjoy a safe ride, and pay easily through the app."
      }
    ]


  const { data } = useUserDataQuery(undefined);
  const navigate = useNavigate();
  const { showToast } = useMyToast();
  const [isHeroSectionLoading, setHeroSectionLoading] = useState(true);

  useEffect(() => {
    // Simulate initial navbar load
    const timer = setTimeout(() => {
      setHeroSectionLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const role = data?.data?.role || "";

  const handleDriverClick = () => {
    if (role !== UserRole.DRIVER) {
      showToast({
        type: "info",
        message: "Please logout your account and register as driver!"
      });

      navigate("/registration", { state: UserRole.DRIVER });
      return;
    }

    if (role === UserRole.DRIVER) {
      navigate("/ride/check-ride-request");
      return;
    }

  }

  const [open, setOpen] = useState(false)

  const isDriver = data?.data?.role === "DRIVER"

  useEffect(() => {
    if (isDriver) {
      setOpen(true)
    }
  }, [isDriver])

  const handleConfirm = () => {
    setOpen(false)
  }

  return (
    <>
      {isDriver && !data?.data?.location && (
        <MyModal
          open={open}
          onOpenChange={setOpen}
          title={`Welcome ${data?.data?.name}`}
          description="Need to your updated location. Please Update!"
          onConfirm={handleConfirm}
          confirmLabel="Update Location"
        // cancelLabel="Close"
        >
          <p className="text-lg text-primary">
            Please update your current location to accept ride requests. You can find the 'Update Location' button at the bottom of the User Info page.
          </p>
        </MyModal>
      )}
      <div className="min-h-screen">
        {isHeroSectionLoading ? (
          <>
            <div className='relative'>
              <HeroSectionSkeleton />
            </div>
            <div className='absolute w-full -mt-10 z-19'>
              <StatsSectionSkeleton />
            </div>
            <div className="mt-40"></div>
          </>
        ) : (
          <>
            <div className='relative'>
              <HeroSection role={role} handleDriverClick={handleDriverClick} />
            </div>
            <div className='absolute w-full -mt-10 z-19'>
              <StatsSection stats={stats} />
            </div>
            <HowItWorksSection howItWorksData={howItWorksData} />
            <ProductsSection />
            <FeaturesSection features={features} />
            <ImageWithTextSection role={role} handleDriverClick={handleDriverClick} />
            <TestimonialsSection testimonials={testimonials} />
            <NewsletterSection />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
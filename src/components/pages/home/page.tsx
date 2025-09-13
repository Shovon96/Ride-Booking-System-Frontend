import { useMyToast } from '@/components/layouts/MyToast';
import { UserRole } from '@/constants/userRole';
import { useUserDataQuery } from '@/redux/features/api/auth.api';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CarFront,
  CircleDollarSign,
  Clock,
  MapPin,
  ShieldCheck,
  Smartphone,
  Star,
  TrendingUp,
  Users
} from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import CountUp from "react-countup";



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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        style={{
          backgroundImage: "url('/choloride-hero-banner-image.png')",
        }}
        className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        {/* <div className="absolute inset-0 bg-black/20"></div> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl lg:text-5xl font-bold leading-tight mb-6 text-muted-foreground">
                SAFE AND FAST WAY WITH
                <span className="text-primary font-bold italic text-shadow-lg text-shadow-amber-400"> CHOLORIDE</span>
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Experience seamless transportation with verified drivers, real-time tracking, and affordable rates.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 justify-center py-2 place-self-start"
              >
                <Link
                  to={role ? "/user" : "/login"}
                  className="bg-chart-4 text-background px-8 py-2 rounded-full font-semibold text-lg hover:bg-primary transition-colors duration-200 flex items-center justify-center"
                >
                  <Users />
                  {
                    role ? role : "Login"
                  }
                </Link>
                {UserRole.DRIVER && role === UserRole.DRIVER &&
                  <div
                    onClick={handleDriverClick}
                    className="border-2 border-white text-muted-foreground px-5 py-2 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200 flex items-center justify-center cursor-pointer"
                  >
                    <TrendingUp />
                    {role === UserRole.DRIVER ? "Go for drive!" : "Drive & Earn"}
                  </div>
                }
                <div className="flex flex-col sm:flex-row gap-4">
                  {
                    !role && (
                      <Link
                        to={"/registration"}
                        className="text-foreground border border-muted-foreground px-6 py-3 rounded-full font-semibold text-lg hover:bg-muted transition-all duration-200 flex items-center justify-center group"
                      >
                        Get Started Today
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    )
                  }
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-chart-4 mb-2">
                  <CountUp
                    start={0}
                    end={stat.number}
                    duration={3.5}
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce={false}
                  />
                </div>
                <div className="text-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              <span className="text-primary font-bold text-shadow-lg text-shadow-gray-400">HOW IT WORKS</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Getting a ride is easier than ever. Just follow these simple steps.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData?.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center group border border-primary px-6 py-8 rounded-lg hover:bg-background hover:text-foreground transition-colors duration-300 shadow-md shadow-primary/20"
              >
                <div className="relative mb-8">
                  <div className=" text-white rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-200">
                    {item.icon}
                  </div>
                  <div className="absolute -top-11 -right-7 p-3 bg-chart-3 text-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              WHY CHOOSE <span className="text-primary font-bold italic text-shadow-lg text-shadow-amber-400"> CHOLORIDE</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We're committed to providing the best ride-sharing experience with cutting-edge technology and exceptional service.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-100 text-center group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
            >
              <span className="text-primary font-bold text-shadow-lg text-shadow-gray-400">CUSTOMER TESTIMONIAL</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Don't just take our word for it. Here's what our satisfied customers have to say.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.comment}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            {
              role ? "You can start the journey from here!" : "Ready to Start Your Journey?"
            }
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl mb-8 text-blue-100"
          >
            Join millions of riders who trust Let's Ride for their daily transportation needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to={role ? "/user" : "/registration"}
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-yellow-300 transition-colors duration-200 flex items-center justify-center"
            >
              <Users className="mr-2 h-5 w-5" />
              {
                role ? role : "Register"
              }
            </Link>
            <div
              onClick={handleDriverClick}
              className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors duration-200 flex items-center justify-center cursor-pointer"
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              Drive & Earn
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
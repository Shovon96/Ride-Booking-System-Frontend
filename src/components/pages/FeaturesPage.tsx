import { Card } from '@/components/ui/card';
import {
  BarChart3,
  Bell,
  Clock,
  CreditCard,
  HeadphonesIcon,
  Lock,
  MapPin,
  Shield,
  Smartphone,
  Star,
  Users,
  Zap,
  Sparkles
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageBannerSkeleton } from '../skeletonLoading/PageBannerSkeleton';

const FeaturesPage: React.FC = () => {

  const [isBannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    // Simulate initial navbar load
    const timer = setTimeout(() => {
      setBannerLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const riderFeatures = [
    {
      icon: MapPin,
      title: 'Easy Booking',
      description: 'Book rides with just a few taps. Enter your destination and get matched with nearby drivers instantly.',
      color: 'from-[#0862ca] to-[#0862ca]/80'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Track your driver in real-time, get accurate arrival estimates, and never wonder where your ride is.',
      color: 'from-[#d01622] to-[#d01622]/80'
    },
    {
      icon: CreditCard,
      title: 'Seamless Payments',
      description: 'Pay with credit cards, debit cards, or cash. No need to fumble for money at the end of your ride.',
      color: 'from-[#0862ca] to-[#d01622]'
    },
    {
      icon: Star,
      title: 'Rate & Review',
      description: 'Rate your driver and provide feedback to maintain high service quality across the platform.',
      color: 'from-[#d01622] to-[#0862ca]'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'SOS button, ride sharing with contacts, driver verification, and 24/7 support for your peace of mind.',
      color: 'from-[#0862ca] to-[#0862ca]/80'
    },
    {
      icon: Bell,
      title: 'Smart Notifications',
      description: 'Get timely updates about your ride status, driver arrival, and trip completion.',
      color: 'from-[#d01622] to-[#d01622]/80'
    },
  ];

  const driverFeatures = [
    {
      icon: Smartphone,
      title: 'Driver App',
      description: 'Intuitive driver app with easy navigation, ride requests, and earnings tracking.',
      color: 'from-[#0862ca] to-[#d01622]'
    },
    {
      icon: BarChart3,
      title: 'Earnings Dashboard',
      description: 'Track your daily, weekly, and monthly earnings with detailed breakdowns and insights.',
      color: 'from-[#d01622] to-[#0862ca]'
    },
    {
      icon: Users,
      title: 'Flexible Schedule',
      description: 'Work when you want, where you want. Go online and offline as per your availability.',
      color: 'from-[#0862ca] to-[#0862ca]/80'
    },
    {
      icon: MapPin,
      title: 'Route Optimization',
      description: 'Get the best routes to pickup and drop-off locations to save time and fuel.',
      color: 'from-[#d01622] to-[#d01622]/80'
    },
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Access your earnings instantly with fast and secure payout options.',
      color: 'from-[#0862ca] to-[#d01622]'
    },
    {
      icon: HeadphonesIcon,
      title: 'Driver Support',
      description: 'Dedicated support team for drivers with quick resolution of issues and queries.',
      color: 'from-[#d01622] to-[#0862ca]'
    },
  ];

  const adminFeatures = [
    {
      icon: Users,
      title: 'User Management',
      description: 'Comprehensive user management system to handle rider and driver accounts efficiently.',
      color: 'from-[#0862ca] to-[#0862ca]/80'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Advanced analytics and reporting tools to track platform performance and user behavior.',
      color: 'from-[#d01622] to-[#d01622]/80'
    },
    {
      icon: Shield,
      title: 'Safety Oversight',
      description: 'Monitor safety incidents, manage driver verification, and ensure platform security.',
      color: 'from-[#0862ca] to-[#d01622]'
    },
    {
      icon: CreditCard,
      title: 'Financial Management',
      description: 'Track revenue, manage payouts, handle billing, and oversee financial operations.',
      color: 'from-[#d01622] to-[#0862ca]'
    },
    {
      icon: Bell,
      title: 'System Monitoring',
      description: 'Real-time system monitoring, alert management, and performance optimization tools.',
      color: 'from-[#0862ca] to-[#0862ca]/80'
    },
    {
      icon: Lock,
      title: 'Security Controls',
      description: 'Advanced security features, access controls, and fraud prevention mechanisms.',
      color: 'from-[#d01622] to-[#d01622]/80'
    },
  ];

  const safetyFeatures = [
    {
      title: 'Driver Background Checks',
      description: 'All drivers undergo comprehensive background verification including criminal history and driving records.',
    },
    {
      title: 'Real-time GPS Tracking',
      description: 'Every ride is tracked in real-time with GPS technology for complete transparency and safety.',
    },
    {
      title: 'Emergency SOS Button',
      description: 'One-tap emergency assistance during rides with automatic location sharing to emergency contacts.',
    },
    {
      title: '24/7 Safety Support',
      description: 'Round-the-clock safety support team ready to assist with any concerns or emergencies.',
    },
    {
      title: 'Ride Sharing',
      description: 'Share your ride details with trusted contacts so they can track your journey in real-time.',
    },
    {
      title: 'Two-way Rating System',
      description: 'Both riders and drivers rate each other, ensuring accountability and quality service.',
    },
  ];

  const renderFeatureSection = (
    title: string,
    badge: string,
    description: string,
    features: typeof riderFeatures,
    badgeColor: string
  ) => (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-0 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className={`inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[${badgeColor}] mb-4`}>
              {badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
          >
            {title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
              Features
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center h-full bg-white hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#0862ca]/50 group">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl p-3 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#0862ca] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <>
      {isBannerLoading ? (
        <PageBannerSkeleton />
      ) : (
        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="relative h-[60vh] w-full overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/feature-page-image.png')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0862ca]/20 via-[#0862ca]/20 to-[#d01622]/20" />

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
                className="absolute -top-20 -right-20 w-96 h-96 bg-[#d01622]/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#0862ca]/10 rounded-full blur-3xl"
              />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-left max-w-2xl space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-white tracking-wide">Features</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white drop-shadow-2xl">
                  Powerful Features of{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] via-[#0862ca] to-[#d01622]">
                    CHOLORIDE
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  Discover the comprehensive features that make CHOLORIDE the best choice for riders, drivers, and administrators.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Rider Features */}
          {renderFeatureSection(
            'Rider',
            'For Riders',
            'Everything you need for a smooth, safe, and convenient ride experience.',
            riderFeatures,
            '#0862ca'
          )}

          {/* Driver Features */}
          {renderFeatureSection(
            'Driver',
            'For Drivers',
            'Powerful tools and features to help drivers maximize their earnings and manage their business.',
            driverFeatures,
            '#d01622'
          )}

          {/* Admin Features */}
          {renderFeatureSection(
            'Admin',
            'For Administrators',
            'Comprehensive management tools to oversee platform operations and ensure optimal performance.',
            adminFeatures,
            '#0862ca'
          )}

          {/* Safety Features */}
          <section className="py-20 bg-gradient-to-r from-[#0862ca] via-[#0862ca]/90 to-[#d01622] text-white relative overflow-hidden">
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
              <motion.div
                animate={{
                  scale: [1.2, 1, 1.2],
                  rotate: [90, 0, 90],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl p-4 mx-auto mb-6 flex items-center justify-center"
                >
                  <Shield className="h-10 w-10 text-white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-black mb-4"
                >
                  Safety & Security
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-white/80 max-w-3xl mx-auto"
                >
                  Your safety is our top priority. We've built comprehensive safety features into every aspect of the platform.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {safetyFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-6 text-center h-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                      <div className="w-12 h-12 bg-white/20 rounded-2xl p-2 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-lg font-bold mb-3 text-white">{feature.title}</h3>
                      <p className="text-white/70 leading-relaxed">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Stack */}
          <section className="py-20 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-black mb-4"
                >
                  Built with Modern{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                    Technology
                  </span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-300 max-w-3xl mx-auto"
                >
                  Our platform is built using cutting-edge technology to ensure reliability,
                  scalability, and exceptional user experience.
                </motion.p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                  { name: 'React', color: 'text-[#0862ca]', label: 'Frontend Framework' },
                  { name: 'Express.js', color: 'text-emerald-400', label: 'Backend Runtime' },
                  { name: 'MongoDB', color: 'text-[#d01622]', label: 'Database' },
                  { name: 'Vercel', color: 'text-orange-400', label: 'Host Platform' },
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className={`text-2xl font-bold ${tech.color} mb-2`}>{tech.name}</div>
                    <div className="text-gray-400">{tech.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default FeaturesPage;

import { Card } from '@/components/ui/card';
import { Award, Heart, Target, Users, Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PageBannerSkeleton } from '../skeletonLoading/PageBannerSkeleton';

const AboutPage: React.FC = () => {

  const [isBannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    // Simulate initial navbar load
    const timer = setTimeout(() => {
      setBannerLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const values = [
    {
      icon: Users,
      title: 'Community First',
      description: 'We build technology that brings people together and strengthens communities.',
      color: 'from-[#0862ca] to-[#0862ca]/80'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'We constantly innovate to provide the best transportation experience.',
      color: 'from-[#d01622] to-[#d01622]/80'
    },
    {
      icon: Heart,
      title: 'Safety & Trust',
      description: 'Every feature we build prioritizes the safety and trust of our users.',
      color: 'from-[#0862ca] to-[#d01622]'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in every interaction and every ride.',
      color: 'from-[#d01622] to-[#0862ca]'
    },
  ];

  const stats = [
    { number: '500K+', label: 'Completed Rides', icon: TrendingUp },
    { number: '50K+', label: 'Active Riders', icon: Users },
    { number: '10K+', label: 'Driver Partners', icon: Shield },
    { number: '25+', label: 'Cities Served', icon: Zap },
  ];

  return (
    <>
      {isBannerLoading ? (
        <PageBannerSkeleton />
      ) : (

        <div className="min-h-screen bg-white">
          {/* Hero Section */}
          <section className="relative h-[70vh] w-full overflow-hidden">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('/about-page-banner.png')",
              }}
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0862ca]/20 via-[#0862ca]/20 to-[#d01622]/20" />

            {/* Animated Shapes */}
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
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2">
                  <Sparkles className="h-4 w-4 text-white" />
                  <span className="text-sm font-medium text-[#0862ca] tracking-wide">About Us</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white drop-shadow-2xl">
                  About{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] via-[#0862ca] to-[#d01622]">
                    CHOLORIDE
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  We're on a mission to transform urban mobility by connecting riders and drivers
                  through innovative technology and exceptional service.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Our Story */}
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-0 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-0 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="relative">
                    <img
                      src="/about-page-image39.png"
                      alt="CHOLORIDE team"
                      className="rounded-3xl shadow-2xl w-full object-cover"
                    />
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#0862ca]/20 to-[#d01622]/20" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div>
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
                      Our Journey
                    </span>
                  </div>

                  <h2 className="text-4xl lg:text-5xl font-black text-gray-900">
                    Our{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                      Story
                    </span>
                  </h2>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    Founded in 2020, <span className="font-bold text-[#0862ca]">CHOLORIDE</span> started with a simple mission: to make everyday travel safe, fast, and reliable. What began as a small vision has now grown into a trusted platform connecting thousands of riders and drivers across multiple cities.
                  </p>

                  <p className="text-lg text-gray-700 leading-relaxed">
                    We're committed to delivering affordable rides, verified drivers, and real-time tracking, while also creating flexible earning opportunities for drivers. At <span className="font-bold text-[#d01622]">CHOLORIDE</span>, it's not just about reaching destinations — it's about building a smarter and more sustainable way to move through the city.
                  </p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section className="py-20 bg-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
                    What Drives Us
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
                >
                  Mission &{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                    Vision
                  </span>
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="p-8 text-center h-full bg-gradient-to-br from-white to-blue-50 border-2 border-[#0862ca]/20 hover:border-[#0862ca] transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#0862ca] to-[#0862ca]/80 rounded-2xl p-4 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Target className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                    <p className="text-gray-700 leading-relaxed">
                      To provide safe, reliable, and affordable transportation solutions that connect
                      communities, empower drivers with flexible earning opportunities, and contribute
                      to sustainable urban mobility.
                    </p>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Card className="p-8 text-center h-full bg-gradient-to-br from-white to-red-50 border-2 border-[#d01622]/20 hover:border-[#d01622] transition-all duration-300 hover:shadow-2xl">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#d01622] to-[#d01622]/80 rounded-2xl p-4 mx-auto mb-6 flex items-center justify-center shadow-lg">
                      <Heart className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                    <p className="text-gray-700 leading-relaxed">
                      A world where transportation is seamless, accessible, and environmentally conscious.
                      Where technology serves humanity and creates opportunities for economic empowerment
                      and community building.
                    </p>
                  </Card>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Values */}
          <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-10 w-96 h-96 bg-[#0862ca]/5 rounded-full blur-3xl" />
              <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#d01622]/5 rounded-full blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
                    Core Values
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
                >
                  Our{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                    Values
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-gray-600 max-w-3xl mx-auto"
                >
                  These core values guide every decision we make and every feature we build.
                </motion.p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="p-6 text-center h-full bg-white hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-[#0862ca]/50 group">
                      <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl p-3 mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <value.icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#0862ca] transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{value.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="py-20 bg-gradient-to-r from-[#0862ca] via-[#0862ca]/90 to-[#d01622] text-white relative overflow-hidden">
            {/* Animated Shapes */}
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
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl lg:text-5xl font-black mb-4"
                >
                  Our Impact in Numbers
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-xl text-white/80"
                >
                  Growing every day, making transportation better for everyone.
                </motion.p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center group"
                  >
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl p-3 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-4xl md:text-5xl font-black mb-2">{stat.number}</div>
                    <div className="text-white/70">{stat.label}</div>
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

export default AboutPage;

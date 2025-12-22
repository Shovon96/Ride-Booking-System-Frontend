import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router';

interface HeroSectionProps {
  role: string;
  handleDriverClick: () => void;
}

export const HeroSection = ({ role, handleDriverClick }: HeroSectionProps) => {
  return (
    <section
      style={{
        backgroundImage: "url('/choloride-hero-banner-image.png')",
      }}
      className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
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
                {role ? role : "Login"}
              </Link>
              {role === "DRIVER" && (
                <div
                  onClick={handleDriverClick}
                  className="border-2 border-white text-muted-foreground px-5 py-2 rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-colors duration-200 flex items-center justify-center cursor-pointer"
                >
                  <TrendingUp />
                  {role === "DRIVER" ? "Go for drive!" : "Drive & Earn"}
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                {!role && (
                  <Link
                    to={"/registration"}
                    className="text-foreground border border-muted-foreground px-6 py-3 rounded-full font-semibold text-lg hover:bg-muted transition-all duration-200 flex items-center justify-center group"
                  >
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

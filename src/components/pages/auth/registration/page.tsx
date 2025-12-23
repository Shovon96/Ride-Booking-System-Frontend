import registerImage from "@/assets/register-rider-image.png";
import Logo from "@/assets/Logo";
import RegistrationForm from "./RegistrationForm";
import { motion } from "framer-motion";

export default function RegistrationPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0862ca]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#d01622]/10 rounded-full blur-3xl" />
      </div>

      {/* Left Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden bg-muted lg:block"
      >
        <img
          src={registerImage}
          alt="Register"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d01622]/20 via-transparent to-[#0862ca]/20" />

        {/* Floating Badge */}
        <div className="absolute bottom-10 left-10 right-10">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-2">Join CHOLORIDE Today!</h3>
            <p className="text-white/80">Create your account and start your journey with us</p>
          </div>
        </div>
      </motion.div>

      {/* Right Side - Form */}
      <div className="flex flex-col gap-6 p-6 md:p-10 relative z-10 overflow-y-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-2 md:justify-start"
        >
          <div className="flex items-center gap-2 font-medium">
            <Logo />
          </div>
        </motion.div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full max-w-md"
          >
            <RegistrationForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

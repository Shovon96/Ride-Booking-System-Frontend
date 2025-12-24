import LoginImage from "@/assets/login-rider-image.png";
import { LoginForm } from "./LoginForm";
import Logo from "@/assets/Logo";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0862ca]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#d01622]/10 rounded-full blur-3xl" />
      </div>

      {/* Left Side - Form */}
      <div className="flex flex-col gap-6 p-4 md:p-6 md:pb-12 relative z-10">
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
            <LoginForm />
          </motion.div>
        </div>
      </div>

      {/* Right Side - Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="relative hidden bg-muted lg:block"
      >
        <img
          src={LoginImage}
          alt="Login"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0862ca]/20 via-transparent to-[#d01622]/20" />
      </motion.div>
    </div>
  );
}

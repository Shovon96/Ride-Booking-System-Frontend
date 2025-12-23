
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Home, Search, ArrowLeft, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden">
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
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

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-[#0862ca]/10 to-[#d01622]/10 rounded-3xl mb-6">
                        <AlertCircle className="h-12 w-12 text-[#d01622]" />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="space-y-6"
                >
                    {/* 404 Text */}
                    <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] via-[#d01622] to-[#0862ca] leading-none">
                        404
                    </h1>

                    {/* Error Message */}
                    <div className="space-y-3">
                        <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                            Oops! Page Not Found
                        </h2>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            The page you're looking for doesn't exist or has been moved. 
                            Let's get you back on track!
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <Link to="/">
                            <Button 
                                size="lg" 
                                className="group relative inline-flex items-center justify-center gap-3 px-8 py-6 text-base font-bold text-white bg-gradient-to-r from-[#0862ca] to-[#d01622] rounded-xl overflow-hidden shadow-2xl hover:shadow-[#d01622]/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <Home className="h-5 w-5" />
                                <span>Go to Homepage</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#d01622] to-[#0862ca] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Button>
                        </Link>

                        <Link to="/">
                            <Button 
                                size="lg" 
                                variant="outline"
                                className="group inline-flex items-center justify-center gap-3 px-8 py-6 text-base font-bold text-gray-900 bg-white border-2 border-gray-300 hover:border-[#0862ca] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            >
                                <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
                                <span>Go Back</span>
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Helpful Links */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="pt-12"
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3 shadow-lg">
                            <Search className="h-4 w-4 text-[#0862ca]" />
                            <span className="text-sm text-gray-600">
                                Try searching or visit our{" "}
                                <Link to="/" className="text-[#0862ca] font-semibold hover:text-[#d01622] transition-colors">
                                    homepage
                                </Link>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Decorative Elements */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="mt-16 grid grid-cols-3 gap-4 max-w-md mx-auto"
                >
                    {[1, 2, 3].map((item) => (
                        <motion.div
                            key={item}
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: item * 0.2,
                            }}
                            className="h-2 bg-gradient-to-r from-[#0862ca]/20 to-[#d01622]/20 rounded-full"
                        />
                    ))}
                </motion.div>
            </div>
        </div>
    );
}

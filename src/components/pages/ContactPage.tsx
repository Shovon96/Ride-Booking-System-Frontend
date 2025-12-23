import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone, Sparkles, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMyToast } from "../layouts/MyToast";
import { motion } from 'framer-motion';
import { PageBannerSkeleton } from "../skeletonLoading/PageBannerSkeleton";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isBannerLoading, setBannerLoading] = useState(true);

  useEffect(() => {
    // Simulate initial navbar load
    const timer = setTimeout(() => {
      setBannerLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const { showToast } = useMyToast();
  const onSubmit = (values: ContactFormValues) => {
    setIsLoading(true);
    console.log(values); // Log form values
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      setIsLoading(false);
      form.reset();
      showToast({ type: "success", message: "Message sent successfully!" })
    });
  };

  const offices = [
    {
      title: "Head Office",
      address: "123 Corporate Avenue, Dhaka 1205, Bangladesh",
      phone: "+880 1234 567 890",
      email: "headoffice@choloride.com",
    },
    {
      title: "Branch Office - Chittagong",
      address: "456 Business Street, Chittagong 4000, Bangladesh",
      phone: "+880 9876 543 210",
      email: "branch.ctg@choloride.com",
    },
    {
      title: "Branch Office - Sylhet",
      address: "789 Commercial Road, Sylhet 3100, Bangladesh",
      phone: "+880 5555 666 777",
      email: "branch.sylhet@choloride.com",
    },
  ];

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
                backgroundImage: "url('/contatct-page-banner.jpg')",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-[#0862ca]/10 to-[#d01622]/10" />

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
                  <span className="text-sm font-medium text-white tracking-wide">Get In Touch</span>
                </div>

                <h1 className="text-4xl lg:text-6xl font-black leading-tight text-white drop-shadow-2xl">
                  Contact{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] via-[#0862ca] to-[#d01622]">
                    CHOLORIDE
                  </span>
                </h1>
                <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                  Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Company Offices Section */}
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
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#0862ca]/10 to-[#d01622]/10 rounded-full text-sm font-semibold text-[#0862ca] mb-4">
                    Our Offices
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-4xl lg:text-5xl font-black text-gray-900 mb-4"
                >
                  Visit{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                    Our Locations
                  </span>
                </motion.h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-20">
                {offices.map((office, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-[#0862ca]/50">
                      <CardHeader className="bg-gradient-to-r from-[#0862ca]/5 to-[#d01622]/5">
                        <CardTitle className="text-xl font-black text-gray-900">
                          {office.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4 pt-6">
                        <div className="flex items-start gap-3 group">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0862ca]/10 to-[#0862ca]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <MapPin className="h-5 w-5 text-[#0862ca]" />
                          </div>
                          <p className="text-gray-700 leading-relaxed">{office.address}</p>
                        </div>
                        <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#d01622]/10 to-[#d01622]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Phone className="h-5 w-5 text-[#d01622]" />
                          </div>
                          <p className="text-gray-700">{office.phone}</p>
                        </div>
                        <div className="flex items-center gap-3 group">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#0862ca]/10 to-[#d01622]/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Mail className="h-5 w-5 text-[#0862ca]" />
                          </div>
                          <p className="text-gray-700">{office.email}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                <Card className="shadow-2xl border-2 border-gray-100">
                  <CardHeader className="bg-gradient-to-r from-[#0862ca]/5 to-[#d01622]/5 text-center pb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-2xl p-3 mx-auto mb-4 flex items-center justify-center shadow-lg">
                      <Send className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black text-gray-900">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-gray-600 mt-2">We'll get back to you within 24 hours</p>
                  </CardHeader>
                  <CardContent className="p-8">
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          name="name"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                                  placeholder="John Doe"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="email"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                                  placeholder="your.email@example.com"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="subject"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Subject</FormLabel>
                              <FormControl>
                                <Input
                                  className="h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                                  placeholder="How can we help you?"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          name="message"
                          control={form.control}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700 font-semibold">Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  className="min-h-[150px] border-gray-300 focus:border-[#0862ca] rounded-xl resize-none"
                                  placeholder="Write your message here..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full h-12 bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl font-bold text-base"
                        >
                          {isLoading ? "Sending..." : "Send Message"}
                          {!isLoading && <Send className="ml-2 h-5 w-5" />}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

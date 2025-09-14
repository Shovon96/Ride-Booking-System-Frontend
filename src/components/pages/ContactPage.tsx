import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMyToast } from "../layouts/MyToast";
import { motion } from 'framer-motion';

const contactSchema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  const { showToast } = useMyToast();
  const onSubmit = (values: never) => {
    setIsLoading(true);
    new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
      console.log("Form submitted:", values);
      setIsLoading(false);
      form.reset();
      showToast({ type: "info", message: "Fake submission!!" })
    });
  };

  const offices = [
    {
      title: "Head Office",
      address: "123 Corporate Avenue, Dhaka 1205, Bangladesh",
      phone: "+880 1234 567 890",
      email: "headoffice@demo.com",
    },
    {
      title: "Branch Office - Chittagong",
      address: "456 Business Street, Chittagong 4000, Bangladesh",
      phone: "+880 9876 543 210",
      email: "branch.ctg@demo.com",
    },
    {
      title: "Branch Office - Sylhet",
      address: "789 Commercial Road, Sylhet 3100, Bangladesh",
      phone: "+880 5555 666 777",
      email: "branch.sylhet@demo.com",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pb-10">
      {/* Hero Section */}
      <section
        className="relative h-[70vh] w-full bg-cover bg-center border-b border-gray-200"
        style={{
          backgroundImage: "url('/contatct-page-banner.jpg')",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left max-w-xl"
          >
            <h1 className="text-3xl lg:text-5xl font-extrabold leading-tight mb-6 text-white drop-shadow-lg">
              CONTACT WITH
              <span className="text-primary italic"> CHOLORIDE</span>
            </h1>
            <p className="text-lg lg:text-xl text-white mb-8 leading-relaxed">
              Discover the comprehensive contact that make CHOLORIDE the best choice for nothing but a project
            </p>
          </motion.div>
        </div>
      </section>


        {/* Company Offices Section */}
      <div className="w-full mx-auto mt-16 space-y-20 px-5">
        <div className="grid md:grid-cols-3 gap-6">
          {offices.map((office, index) => (
            <Card key={index} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {office.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-gray-700">
                <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-blue-600" /> {office.address}</p>
                <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-green-600" /> {office.phone}</p>
                <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-purple-600" /> {office.email}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <Card className="shadow-lg max-w-2xl mx-auto py-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">
              Send Us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField name="name" control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="email" control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl><Input placeholder="your@email.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="subject" control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl><Input placeholder="Inquiry subject" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField name="message" control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea placeholder="Write your message..." {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
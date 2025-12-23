/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMyToast } from "@/components/layouts/MyToast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/api/auth.api";
import { loginSchema } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldValue, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { Mail, Lock, ArrowRight } from "lucide-react";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loginUser, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const { showToast } = useMyToast();

  const onSubmit: SubmitHandler<FieldValue> = async (data: z.infer<typeof loginSchema>) => {
    try {
      const result = await loginUser(data).unwrap();

      showToast({
        message: result?.message || "Welcome back!",
        type: "success",
      });

      navigate("/");
    } catch (error) {
      showToast({
        message: error?.data?.message,
        type: "error",
      });

      if (error?.data?.flag) {
        navigate(`/account-status-page/${error?.data?.userId}`, { state: error?.data?.flag });
      }

      console.log(error?.data?.userId);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        "bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-10",
        className
      )}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
          <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-3 text-center">
              <div className="w-22 h-16 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl inline font-black text-gray-900">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                  CHOLORIDE
                </span>
              </h1>
            </div>
              <p className="text-gray-600">Sign in to continue your journey</p>

            {/* Form Fields */}
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          className="pl-12 h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                          placeholder="your.email@example.com"
                          {...field}
                          type="email"
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="sr-only">Enter your email address</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          className="pl-12 h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormDescription className="sr-only">Enter your password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl font-bold text-base group cursor-pointer"
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link
                  className="font-bold text-[#0862ca] hover:text-[#d01622] transition-colors underline underline-offset-4"
                  to={"/registration"}
                >
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

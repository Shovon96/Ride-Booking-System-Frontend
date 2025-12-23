import { useMyToast } from "@/components/layouts/MyToast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole } from "@/constants/userRole";
import { cn } from "@/lib/utils";
import { useRegisterMutation } from "@/redux/features/api/auth.api";
import { registrationSchema, type RegistrationSchemaType } from "@/validations/auth.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { User, Mail, Lock, UserCircle, Car, ArrowRight } from "lucide-react";

export default function RegistrationForm() {
  const location = useLocation();
  const [role, setRole] = useState<UserRole>(location?.state ?? UserRole.RIDER);

  const form = useForm<RegistrationSchemaType>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: role,
      vehicleInfo: {
        model: "",
        license: "",
        plateNumber: "",
      },
    },
    mode: "onSubmit",
  });

  const [register] = useRegisterMutation();
  const { showToast, updateToast } = useMyToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (form.watch("role") !== UserRole.DRIVER) {
      form.setValue("vehicleInfo", {
        model: "",
        license: "",
        plateNumber: "",
      });
    }
  }, [form.watch("role")]);

  const onSubmit = async (data: RegistrationSchemaType) => {
    const toastId = showToast({
      message: "Creating your account...",
      type: "loading",
      autClose: false,
    });

    try {
      const res = await register(data);

      if (res?.data?.statusCode === 201) {
        updateToast(toastId, {
          message: res?.data?.message,
          type: "success",
        });

        navigate("/login");
      }

      if (res?.data?.statusCode !== 201) {
        updateToast(toastId, {
          message: res?.error?.data?.message,
          type: "info",
        });
      }
    } catch (error: unknown) {
      console.log(error);
      updateToast(toastId, {
        message: error?.data?.message || "Something went wrong!",
        type: "error",
      });
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        "bg-white/80 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-2xl p-8 md:p-10"
      )}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-[#0862ca] to-[#d01622] rounded-2xl flex items-center justify-center shadow-lg">
          <UserCircle className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900">
          Create{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
            Account
          </span>
        </h1>
        <p className="text-gray-600">Join CHOLORIDE and start your journey</p>
      </div>

      <Form {...form}>
        <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">Full Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      className="pl-12 h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                      placeholder="John Doe"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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
                      type="email"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
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
                      placeholder="Create a strong password"
                      type="password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      className="pl-12 h-12 border-gray-300 focus:border-[#0862ca] rounded-xl"
                      placeholder="Re-enter your password"
                      type="password"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role Selector */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700 font-semibold">Select Your Role</FormLabel>
                <Select
                  onValueChange={(val: UserRole) => {
                    field.onChange(val);
                    setRole(val);
                  }}
                  value={field.value}
                >
                  <SelectTrigger className="h-12 border-gray-300 focus:border-[#0862ca] rounded-xl">
                    <SelectValue placeholder="Choose your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={UserRole.RIDER}>🚗 Rider</SelectItem>
                    <SelectItem value={UserRole.DRIVER}>🚕 Driver</SelectItem>
                    <SelectItem value={UserRole.ADMIN}>👨‍💼 Admin</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Vehicle Info - only if DRIVER */}
          {role === UserRole.DRIVER && (
            <div className="space-y-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
              <div className="flex items-center gap-2 text-[#0862ca] font-bold">
                <Car className="h-5 w-5" />
                <span>Vehicle Information</span>
              </div>
              <FormField
                control={form.control}
                name="vehicleInfo.model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Vehicle Model</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 border-gray-300 focus:border-[#0862ca] rounded-xl bg-white"
                        placeholder="e.g., Toyota Prius"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleInfo.license"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">License Number</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 border-gray-300 focus:border-[#0862ca] rounded-xl bg-white"
                        placeholder="e.g., DHA-1234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vehicleInfo.plateNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Plate Number</FormLabel>
                    <FormControl>
                      <Input
                        className="h-11 border-gray-300 focus:border-[#0862ca] rounded-xl bg-white"
                        placeholder="e.g., ABC-1234"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-lg hover:scale-105 transition-all duration-300 rounded-xl font-bold text-base group mt-2 cursor-pointer"
          >
            Create Account
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </Form>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link
            className="font-bold text-[#0862ca] hover:text-[#d01622] transition-colors underline underline-offset-4"
            to="/login"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

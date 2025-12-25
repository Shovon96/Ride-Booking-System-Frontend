import UpdateProfileModal from "@/components/dialogs/UpdateProfile";
import { VehicleEditModal } from "@/components/dialogs/VehicleInfoEditDialong";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/constants/userRole";
import { authApi, useUserDataQuery } from "@/redux/features/api/auth.api";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContinuousLocation } from "@/components/hooks/useGeolocation";
import { useEditUserByIdMutation } from "@/redux/features/api/admin.api";
import { useForm } from "react-hook-form";
import { useMyToast } from "@/components/layouts/MyToast";
import { useAppDispatch } from "@/redux/hooks";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Shield, 
  MapPin, 
  Calendar, 
  Clock, 
  Car,
  CheckCircle,
  XCircle,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";


export default function UserInfo() {
  const { data } = useUserDataQuery(undefined);
  const [editUserById, isLoading] = useEditUserByIdMutation();
  const userId = data?.data?._id || "";
  const { coords, retry } = useContinuousLocation(userId);
  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [pickupLocation, setPickupLocation] = useState("");
  const [pickupCoords, setPickupCoords] = useState<{ lat: number; lng: number } | null>(null);
  const { showToast } = useMyToast();
  const dispatch = useAppDispatch();

  // Auto-update pickup if using current location
  useEffect(() => {
    if (useCurrentLocation && coords) {
      setPickupLocation(coords.address || "");
      setPickupCoords({ lat: coords.lat, lng: coords.lng });
    }
  }, [useCurrentLocation, coords]);

  const { handleSubmit } = useForm({
    defaultValues: {
      location: {
        lat: pickupCoords?.lat || "",
        lng: pickupCoords?.lng || "",
        address: pickupLocation || "",
      },
    },
  });

  // Submit Update Location
  const onSubmit = async () => {
    try {
      const payload = {
        location: {
          type: "Point",
          coordinates: [
            pickupCoords?.lng, // ✅ longitude first
            pickupCoords?.lat, // ✅ then latitude
          ],
          address: pickupLocation,
        },
      };

      if (isLoading) {
        showToast({ message: "Location updating.....", type: "loading" });
      }
      await editUserById({ id: userId, payload }).unwrap();
      dispatch(authApi.util.resetApiState());
      showToast({ message: "Location updated successfully", type: "success" });
      // window.location.reload()
    } catch (err) {
      console.error("❌ Failed to update location:", err);
      showToast({ message: `Internel server error`, type: "error" });
    }
  };

  if (!data || !data.data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0862ca] border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading your profile...</p>
        </motion.div>
      </div>
    );
  }

  const user = data.data;

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case UserRole.DRIVER:
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case UserRole.RIDER:
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl px-6 mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-black text-gray-900">
                My{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
                  Profile
                </span>
              </h1>
              <p className="text-gray-600 mt-2">Manage your account information and settings</p>
            </div>
            <UpdateProfileModal user={user} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="overflow-hidden border-2 p-0">
              <div className="h-32 bg-gradient-to-r from-[#0862ca] to-[#d01622] relative">
                <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0862ca] to-[#d01622] flex items-center justify-center">
                      <User className="h-16 w-16 text-white" />
                    </div>
                  </div>
                </div>
              </div>
              
              <CardContent className="pt-20 text-center">
                <h2 className="text-2xl font-black text-gray-900">{user.name}</h2>
                <p className="text-gray-600 mt-1">@{user.username}</p>
                
                <div className="flex justify-center mt-4">
                  <Badge className={`${getRoleBadgeColor(user.role)} border font-semibold px-4 py-1`}>
                    {user.role}
                  </Badge>
                </div>

                <Separator className="my-6" />

                {/* Status Indicators */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Account Status</span>
                    <div className="flex items-center gap-2">
                      {user.isBlocked ? (
                        <>
                          <XCircle className="h-4 w-4 text-red-500" />
                          <span className="text-sm font-semibold text-red-600">Blocked</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-semibold text-green-600">Active</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Online Status</span>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${user.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                      <span className={`text-sm font-semibold ${user.isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                        {user.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <User className="h-5 w-5 text-[#0862ca]" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Full Name
                    </label>
                    <p className="text-gray-900 font-medium text-lg">{user.name}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </label>
                    <p className="text-gray-900 font-medium text-lg">{user.email}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Username
                    </label>
                    <p className="text-gray-900 font-medium text-lg">{user.username}</p>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Last Online
                    </label>
                    <p className="text-gray-900 font-medium">{new Date(user.lastOnlineAt).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Vehicle Information (Driver Only) */}
            {user?.role === UserRole.DRIVER && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-2 border-blue-200 bg-blue-50/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Car className="h-5 w-5 text-[#0862ca]" />
                        Vehicle Information
                      </CardTitle>
                      <VehicleEditModal userId={user?.driver?._id} vehicleData={user?.driver?.vehicleInfo} />
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg border border-blue-200">
                      <label className="text-sm font-semibold text-gray-600 block mb-2">License</label>
                      <p className="text-gray-900 font-bold text-lg">{user?.driver?.vehicleInfo?.license || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-blue-200">
                      <label className="text-sm font-semibold text-gray-600 block mb-2">Model</label>
                      <p className="text-gray-900 font-bold text-lg">{user?.driver?.vehicleInfo?.model || "N/A"}</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-blue-200">
                      <label className="text-sm font-semibold text-gray-600 block mb-2">Plate Number</label>
                      <p className="text-gray-900 font-bold text-lg">{user?.driver?.vehicleInfo?.plateNumber || "N/A"}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Location Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <MapPin className="h-5 w-5 text-[#0862ca]" />
                      Location Information
                    </CardTitle>
                    <Button
                      type="button"
                      className="gap-2 bg-gradient-to-r from-[#0862ca] to-[#d01622] hover:shadow-lg cursor-pointer"
                      onClick={() => {
                        retry();
                        setUseCurrentLocation(true);
                        handleSubmit(onSubmit)();
                      }}
                    >
                      <RefreshCw className="h-4 w-4" />
                      Update Location
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-red-50 rounded-lg border-2 border-gray-200">
                    <label className="text-sm font-semibold text-gray-600 block mb-2">Current Address</label>
                    <p className="text-gray-900 font-medium text-lg">
                      {user.location?.address || 'No address provided'}
                    </p>
                    <Input
                      value={pickupLocation || "no location found!"}
                      readOnly
                      className="bg-gray-100 w-full hidden"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Account Dates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Calendar className="h-5 w-5 text-[#0862ca]" />
                    Account Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-2">Account Created</label>
                    <p className="text-gray-900 font-medium">{new Date(user.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <label className="text-sm font-semibold text-gray-600 block mb-2">Last Updated</label>
                    <p className="text-gray-900 font-medium">{new Date(user.updatedAt).toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
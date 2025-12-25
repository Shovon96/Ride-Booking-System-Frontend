/* eslint-disable @typescript-eslint/no-explicit-any */
import Loading from "@/components/layouts/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/constants/userRole";
import { useUserDataQuery } from "@/redux/features/api/auth.api";
import { useGetDriverStatsByDriverQuery, useGetUserStatsByUserQuery } from "@/redux/features/api/stats.api";
import { motion } from "framer-motion";
import { 
  DollarSign, 
  Car, 
  TrendingUp, 
  MapPin, 
  Clock, 
  User,
  Navigation,
  CheckCircle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export const UserStatsPage = () => {
  const { data: userData, isLoading: userLoading } = useUserDataQuery(undefined);
  const role = userData?.data?.role;
  const userId = userData?.data?._id;

  // Driver stats query
  const { data: driverStats, isLoading: driverStatsLoading } = useGetDriverStatsByDriverQuery({
    skip: role !== UserRole.DRIVER || !userId,
  } );

  // User/rider stats query
  const { data: userStats, isLoading: userStatsLoading } = useGetUserStatsByUserQuery({
    skip: role !== UserRole.RIDER,
  });

  if (userLoading) return <Loading />;

  // Show loading for role-specific data
  if ((role === UserRole.DRIVER && driverStatsLoading) || (role === UserRole.RIDER && userStatsLoading)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#0862ca] border-t-transparent mx-auto"></div>
          <p className="mt-6 text-gray-600 font-medium">Loading your stats...</p>
        </motion.div>
      </div>
    );
  }

  // Show no stats available if data missing
  if ((role === UserRole.DRIVER && !driverStats) || (role === UserRole.RIDER && !userStats)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl shadow-xl text-center"
        >
          <p className="text-xl text-gray-600 font-medium">No stats available.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-red-50/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl px-6 mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-5xl font-black text-gray-900">
            {role === UserRole.DRIVER ? "Driver" : "Rider"}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0862ca] to-[#d01622]">
              Dashboard
            </span>
          </h1>
          <p className="text-gray-600 mt-2 text-lg">Track your performance and ride history</p>
        </motion.div>

        {role === UserRole.DRIVER ? (
          <>
            {/* Driver Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden border-2 p-0">
                <div className="h-24 bg-gradient-to-r from-[#0862ca] to-blue-600 relative">
                  <div className="absolute -bottom-12 left-8">
                    <div className="w-24 h-24 rounded-full bg-white p-2 shadow-xl">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0862ca] to-blue-600 flex items-center justify-center">
                        <User className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="pt-16 pb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">{driverStats.data.driver?.name}</h2>
                      <p className="text-gray-600 mt-1">{driverStats.data.driver?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200 border font-semibold px-4 py-1">
                        Driver
                      </Badge>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <div className={`h-3 w-3 rounded-full ${driverStats.data.driver?.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className={`text-sm font-semibold ${driverStats.data.driver?.isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                          {driverStats.data.driver?.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-t-4 p-0 border-t-green-500 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-600">Total Earnings</CardTitle>
                      <div className="p-3 bg-green-100 rounded-xl">
                        <DollarSign className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-gray-900">৳ {driverStats.data.totalEarnings?.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-2">From all completed rides</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-t-4 p-0 border-t-blue-500 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-600">Total Rides</CardTitle>
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-gray-900">{driverStats.data.totalRides}</p>
                    <p className="text-sm text-gray-500 mt-2">Completed successfully</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-t-4 border-t-purple-500 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-600">Distance Travelled</CardTitle>
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-gray-900">{driverStats.data.totalTravelledInKm?.toFixed(2)} km</p>
                    <p className="text-sm text-gray-500 mt-2">Total distance covered</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Rides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">Recent Rides</h2>
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 border font-semibold">
                  Last 3 Rides
                </Badge>
              </div>
              
              <div className="space-y-4">
                {driverStats.data.rides.slice(-3).reverse().map((ride: any, index: number) => (
                  <motion.div
                    key={ride._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl p-0 transition-all duration-300 border-2 hover:border-blue-200">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-100 rounded-xl">
                              <Car className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-bold">Ride #{ride.id}</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">Rider: {ride.riderUserName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${
                              ride.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200' :
                              ride.status === 'CANCELLED' ? 'bg-red-100 text-red-700 border-red-200' :
                              'bg-yellow-100 text-yellow-700 border-yellow-200'
                            } border font-semibold`}>
                              {ride.status}
                            </Badge>
                            <div className="text-right">
                              <p className="text-2xl font-black text-green-600">৳ {ride.fare.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <Separator />
                      
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Locations */}
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-green-100 rounded-lg mt-1">
                                <MapPin className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Pickup Location</p>
                                <p className="text-gray-900 font-medium">{ride.pickUpLocation.address}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-red-100 rounded-lg mt-1">
                                <Navigation className="h-5 w-5 text-red-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Drop-off Location</p>
                                <p className="text-gray-900 font-medium">{ride.dropOffLocation.address}</p>
                              </div>
                            </div>
                          </div>

                          {/* Time & Distance */}
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg mt-1">
                                <Clock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Requested At</p>
                                <p className="text-gray-900 font-medium">{new Date(ride.requestedAt).toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-purple-100 rounded-lg mt-1">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Completed At</p>
                                <p className="text-gray-900 font-medium">
                                  {ride.completedAt ? new Date(ride.completedAt).toLocaleString() : "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border-2 border-blue-100">
                              <p className="text-sm font-semibold text-gray-600 mb-1">Distance</p>
                              <p className="text-2xl font-black text-gray-900">{ride.distanceInKm} km</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <>
            {/* Rider Profile Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="overflow-hidden border-2 p-0">
                <div className="h-24 bg-gradient-to-r from-[#0862ca] to-[#d01622] relative">
                  <div className="absolute -bottom-12 left-8">
                    <div className="w-24 h-24 rounded-full bg-white p-2 shadow-xl">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#d01622] to-red-600 flex items-center justify-center">
                        <User className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardContent className="pt-16 pb-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-black text-gray-900">{userStats?.data?.user?.name}</h2>
                      <p className="text-gray-600 mt-1">{userStats?.data?.user?.email}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-100 text-red-700 border-red-200 border font-semibold px-4 py-1">
                        Rider
                      </Badge>
                      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-lg">
                        <div className={`h-3 w-3 rounded-full ${userStats?.data?.user?.isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></div>
                        <span className={`text-sm font-semibold ${userStats?.data?.user?.isOnline ? 'text-green-600' : 'text-gray-600'}`}>
                          {userStats?.data?.user?.isOnline ? 'Online' : 'Offline'}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-t-4 border-t-red-500 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-600">Total Spent</CardTitle>
                      <div className="p-3 bg-red-100 rounded-xl">
                        <DollarSign className="h-6 w-6 text-red-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-gray-900">৳ {userStats?.data?.totalSpent?.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-2">On all rides taken</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-t-4 border-t-blue-500 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-600">Total Rides</CardTitle>
                      <div className="p-3 bg-blue-100 rounded-xl">
                        <Car className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-gray-900">{userStats?.data?.totalRides}</p>
                    <p className="text-sm text-gray-500 mt-2">Completed successfully</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-t-4 border-t-purple-500 hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-semibold text-gray-600">Distance Travelled</CardTitle>
                      <div className="p-3 bg-purple-100 rounded-xl">
                        <TrendingUp className="h-6 w-6 text-purple-600" />
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-black text-gray-900">{userStats?.data?.totalTravelledInKm?.toFixed(2)} km</p>
                    <p className="text-sm text-gray-500 mt-2">Total distance covered</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Recent Rides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black text-gray-900">Recent Rides</h2>
                <Badge className="bg-red-100 text-red-700 border-red-200 border font-semibold">
                  Last 3 Rides
                </Badge>
              </div>
              
              <div className="space-y-4">
                {userStats?.data?.rides?.slice(-3).reverse().map((ride: any, index: number) => (
                  <motion.div
                    key={ride._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-red-200">
                      <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                          <div className="flex items-center gap-3">
                            <div className="p-3 bg-red-100 rounded-xl">
                              <Car className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <CardTitle className="text-lg font-bold">Ride #{ride.id}</CardTitle>
                              <p className="text-sm text-gray-600 mt-1">Driver: {ride.driverUserName}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${
                              ride.status === 'COMPLETED' ? 'bg-green-100 text-green-700 border-green-200' :
                              ride.status === 'CANCELLED' ? 'bg-red-100 text-red-700 border-red-200' :
                              'bg-yellow-100 text-yellow-700 border-yellow-200'
                            } border font-semibold`}>
                              {ride.status}
                            </Badge>
                            <div className="text-right">
                              <p className="text-2xl font-black text-red-600">৳ {ride.fare.toFixed(2)}</p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <Separator />
                      
                      <CardContent className="pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Locations */}
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-green-100 rounded-lg mt-1">
                                <MapPin className="h-5 w-5 text-green-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Pickup Location</p>
                                <p className="text-gray-900 font-medium">{ride.pickUpLocation?.address}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-red-100 rounded-lg mt-1">
                                <Navigation className="h-5 w-5 text-red-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Drop-off Location</p>
                                <p className="text-gray-900 font-medium">{ride.dropOffLocation?.address}</p>
                              </div>
                            </div>
                          </div>

                          {/* Time & Distance */}
                          <div className="space-y-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-100 rounded-lg mt-1">
                                <Clock className="h-5 w-5 text-blue-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Requested At</p>
                                <p className="text-gray-900 font-medium">{new Date(ride.requestedAt).toLocaleString()}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-purple-100 rounded-lg mt-1">
                                <CheckCircle className="h-5 w-5 text-purple-600" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-600 mb-1">Completed At</p>
                                <p className="text-gray-900 font-medium">
                                  {ride.completedAt ? new Date(ride.completedAt).toLocaleString() : "N/A"}
                                </p>
                              </div>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-red-50 to-purple-50 rounded-lg border-2 border-red-100">
                              <p className="text-sm font-semibold text-gray-600 mb-1">Distance</p>
                              <p className="text-2xl font-black text-gray-900">{ride.distanceInKm} km</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

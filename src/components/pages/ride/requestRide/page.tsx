/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContinuousLocation } from "@/components/hooks/useGeolocation";
import { useMyToast } from "@/components/layouts/MyToast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUserDataQuery } from "@/redux/features/api/auth.api";
import { useGetDirectionMutation, useGetOnlineDriversQuery } from "@/redux/features/api/locationService.api";
import { useRequestRideMutation } from "@/redux/features/api/ride.api";
import { useAppDispatch } from "@/redux/hooks";
import { calculateFare } from "@/utils/ride.util";
import { LatLng } from 'leaflet';
import { Car, CreditCard, MapPin, Navigation, User } from "lucide-react";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router";
import LocationInput from "./LocationInput";
import RideMap from "./RideMap";
import RideSummary from "./RideSummery";
import RideTypeCard from "./RideTypeCard";

const rideOptions = [
  { id: "standard", name: "standard", price: "12-15 tk", eta: "5 min", icon: <Car className="h-5 w-5" /> },
  { id: "premium", name: "premium", price: "18-22 tk", eta: "8 min", icon: <User className="h-5 w-5" /> },
];

interface RideTypesData {
  distance: number;
  duration: number;
  fare: {
    standard: number;
    premium: number;
  };
}

export default function RequestRide() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  // ✅ Explicitly typing rideType to fix implicit string error
  const [rideType, setRideType] = useState<"standard" | "premium">("standard"); // <-- fixed type

  const [paymentMethod, setPaymentMethod] = useState<"card" | "cash">("card"); // <-- explicit union type

  const { data } = useUserDataQuery(undefined);
  const userId = data?.data?._id || "";

  const { coords, error: locationError, retry } = useContinuousLocation(userId);

  const [useCurrentLocation, setUseCurrentLocation] = useState(true);
  const [pickupCoords, setPickupCoords] = useState<LatLng | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<LatLng | null>(null);
  const [routeDataState, setRouteDataState] = useState<any>();

  const mapRef = useRef<any>(null);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const destinationInputRef = useRef<HTMLInputElement>(null);
  const rideTypesDataRef = useRef<RideTypesData | null>(null);

  const dispatch = useAppDispatch();

  const [getDirection, { data: routeData, isLoading, error }] = useGetDirectionMutation();
  const { showToast, updateToast } = useMyToast();
  const { data: onlineDrivers } = useGetOnlineDriversQuery(undefined, { refetchOnMountOrArgChange: true });
  const [requestRide] = useRequestRideMutation();

  // Auto-update pickup if using current location
  useEffect(() => {
    if (useCurrentLocation && coords) {
      setPickupLocation(coords.address || "");
      // ✅ Fix: LatLng requires both lat and lng
      setPickupCoords({ lat: coords.lat, lng: coords.lng } as LatLng);
    }
  }, [useCurrentLocation, coords]);

  // Fetch route whenever pickup or destination coordinates change
  useEffect(() => {
    const fetchRoute = async () => {
      if (!pickupCoords || !destinationCoords) return;

      const coordinates = `${pickupCoords.lng},${pickupCoords.lat};${destinationCoords.lng},${destinationCoords.lat}`;

      try {
        const response = await getDirection({
          profile: "driving",
          coordinates,
          steps: true,
          overview: "full",
        }).unwrap();

        // console.log(response.data.routes[0].distance / 1000, "km");

        // console.log("Route data:", response.data.routes);
        rideTypesDataRef.current = {
          distance: response.data.routes[0].distance,
          duration: response.data.routes[0].duration,
          fare: {
            standard: calculateFare(response.data.routes[0].distance, "standard"),
            premium: calculateFare(response.data.routes[0].distance, "premium"),
          }
        };
        setRouteDataState(response);
      } catch (err) {
        console.error("Error fetching route:", err);
      }
    };

    fetchRoute();
  }, [pickupCoords, destinationCoords, getDirection]);

  const handleLocationSelect = (location: any, isPickup: boolean) => {
    if (!location) {
      if (isPickup) {
        setPickupCoords(null);
        setPickupLocation("");
      } else {
        setDestinationCoords(null);
        setDestination("");
      }
      return;
    }

    if (isPickup) {
      setPickupLocation(location.name);
      setPickupCoords(location.coords);
    } else {
      setDestination(location.name);
      setDestinationCoords(location.coords);
    }
  };

  const handleSwapLocations = () => {
    const tempLocation = pickupLocation;
    const tempCoords = pickupCoords;

    setPickupLocation(destination);
    setPickupCoords(destinationCoords);

    setDestination(tempLocation);
    setDestinationCoords(tempCoords);
  };

  const navigate = useNavigate();

  const handleRequestRide = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destinationCoords) {
      showToast({ type: "error", message: "Please select valid pickup and destination locations" });
      return;
    }

    if (!rideTypesDataRef.current) {
      alert("Route not calculated yet!");
      return;
    }

    // ✅ Safe access + fixed type error
    const selectedFare = rideTypesDataRef.current.fare[rideType];
    const payload = {
      fare: selectedFare ? Number(Number(selectedFare).toFixed(2)) : 20, 
      lat: destinationCoords.lat,
      lng: destinationCoords.lng,
      picLat: pickupCoords?.lat,
      picLng: pickupCoords?.lng,
      distanceInKm: Number((rideTypesDataRef.current.distance / 1000).toFixed(2)) || 100
    };

    const toastId = showToast({ type: "loading", message: "Requesting a ride!" });

    try {
      const res = await requestRide({ payload }).unwrap();
      updateToast(toastId, {
        type: "success",
        message: res?.message
      });
      navigate(`/ride/ride-info/${res?.data?.ride?._id}`);
    }
    catch (error: any) { // <-- added `any` to avoid unknown error type
      updateToast(toastId, {
        type: "error",
        message: error?.message || error?.data?.message || "Something went wrong"
      });
    }
    console.log(payload);
  };

  // Update map view when coordinates change
  useEffect(() => {
    if (pickupCoords && destinationCoords && mapRef.current) {
      const bounds = [pickupCoords, destinationCoords] as any;
      mapRef.current.fitBounds(bounds, { padding: [50, 50] });
    } else if (pickupCoords && mapRef.current) {
      mapRef.current.setView(pickupCoords, 13);
    } else if (destinationCoords && mapRef.current) {
      mapRef.current.setView(destinationCoords, 13);
    }
  }, [pickupCoords, destinationCoords]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-30 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Your Ride</h1>
          <p className="text-gray-600">Enter your destination location and take a ride. We'll find you a perfect ride</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="p-6 shadow-lg">
            <CardHeader className="p-0 pb-6">
              <CardTitle className="text-xl flex items-center gap-2">
                <Navigation className="h-6 w-6 text-chart-2" />
                Ride Booking Details
              </CardTitle>
              {
                !coords && useCurrentLocation && (
                  <p className="text-sm text-ring font-mono py-5 leading-tight">NOTE : You have not permitted your device location to the app! Or maybe your location is not supported for the reverse geo api!! Please allow location or give permission to the website!! for better result reload the page after permitted the location service!! else you better enter manually coord/location info at the input box!!</p>
                )
              }

            </CardHeader>
            <CardContent className="p-0">
              <form onSubmit={handleRequestRide} className="space-y-6">

                {/* Pickup Location Mode */}
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-lg">Pickup Mode:</Label>
                  <div className="flex flex-wrap items-center space-x-2">
                    <Button
                      type="button"
                      variant={useCurrentLocation ? "default" : "outline"}
                      onClick={() => {
                        retry();
                        setUseCurrentLocation(true)
                        window.location.reload()
                      }}
                    >
                      Use Current Location
                    </Button>
                    <Button
                      type="button"
                      variant={!useCurrentLocation ? "default" : "outline"}
                      onClick={() => {
                        setUseCurrentLocation(false)
                        setPickupLocation("");
                        setPickupCoords(null);
                      }}
                    >
                      Search Manually
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Pickup Location */}
                  {useCurrentLocation ? (
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-chart-1" />
                        Pickup Location (Current)
                      </Label>
                      <Input
                        value={pickupLocation}
                        readOnly
                        className="bg-gray-100 cursor-not-allowed"
                      />
                    </div>
                  ) : (
                    <LocationInput
                      id="pickup"
                      label="Pickup Location"
                      value={pickupLocation}
                      onChange={setPickupLocation}
                      onLocationSelect={(location) => handleLocationSelect(location, true)}
                      locations={[]}
                      icon={<MapPin className="h-4 w-4 text-chart-1" />}
                      inputRef={pickupInputRef}
                    />
                  )}


                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="mx-auto flex rounded-full"
                    onClick={handleSwapLocations}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </Button>

                  <LocationInput
                    id="destination"
                    label="Destination"
                    value={destination}
                    onChange={setDestination}
                    onLocationSelect={(location) => handleLocationSelect(location, false)}
                    locations={[]}
                    icon={<MapPin className="h-4 w-4 text-chart-2" />}
                    inputRef={destinationInputRef}
                  />
                </div>

                {/* Ride Type Selection */}
                <div className="space-y-4">
                  <Label className="text-lg">Choose Ride Type</Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {rideOptions.map((option) => (
                      <RideTypeCard
                        key={option.id}
                        option={option}
                        isSelected={rideType === option.id}
                        onSelect={setRideType}
                        rideTypesData={rideTypesDataRef.current}
                      />
                    ))}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="space-y-4">
                  <Label className="text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="payment-method"
                      checked={paymentMethod === "card"}
                      onCheckedChange={(checked) => setPaymentMethod(checked ? "card" : "cash")}
                    />
                    <Label htmlFor="payment-method" className="cursor-pointer">
                      {paymentMethod === "card" ? "Credit Card" : "Cash"}
                    </Label>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  size="lg"
                  disabled={!destinationCoords || !pickupCoords}
                >
                Request Ride Now
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Map Section */}
          <div className="space-y-6">
            {
              isLoading && (
                <p>Loading...</p>
              )
            }
            <RideMap
              pickupLocation={pickupLocation}
              destination={destination}
              pickupCoords={pickupCoords}
              destinationCoords={destinationCoords}
              mapRef={mapRef}
              routeData={[routeDataState?.data]}
              onlineDrivers={onlineDrivers?.data}
            />

            <RideSummary
              pickupLocation={pickupLocation}
              destination={destination}
              rideType={rideType}
              paymentMethod={paymentMethod}
              rideOptions={rideOptions}
              rideData={rideTypesDataRef.current}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BookingApi, UserApi, VehicleApi, VehicleSpecificationApi } from "../users/UsersAPI";
import SomePage from "../../back/back";
import { TVehicle, TVehicleSpec } from "../../types/alltypes";

function VehicleSlice() {
  const { data: vehicles, error: vehicleError, isLoading: vehiclesLoading, refetch: refetchVehicles } = VehicleApi.useGetVehicleQuery();
  const { data: vehicleSpec, error: specError, isLoading: specLoading, refetch: refetchVehicleSpec } = VehicleSpecificationApi.useGetVehicleSpecQuery();
  const {data:bookVehicle } = BookingApi.useGetBookingQuery();
  const { data: bookingSpec} = UserApi.useGetUserProfileQuery()

  useEffect(() => {
    refetchVehicles();
    refetchVehicleSpec();
  }, [refetchVehicles, refetchVehicleSpec]);

  const combinedData = () => {
    if (!vehicles || !vehicleSpec || bookingSpec || bookVehicle) return [];

    return vehicles.map((vehicle: TVehicle) => {
      const Specs = vehicleSpec.find((spec: TVehicleSpec) => spec.vehicleId === vehicle.id);
      return { ...Specs, ...vehicle };
    });
  };

  const combine = combinedData();

  if (vehiclesLoading || specLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="loading loading-bars loading-lg"></span>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );

  if (vehicleError || specError) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <p className="text-red-500">Error fetching vehicles: No data</p>
      <button className="btn btn-primary mt-4" onClick={() => { refetchVehicles(); refetchVehicleSpec(); }}>
        Retry
      </button>
    </div>
  );

  return (
    <div className='bg-amber-100 min-h-screen'>
      <SomePage />
      <h1 className='text-center text-black font-bold font-serif my-4'>Vehicles</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {combine && combine.map((vehicle) => (
          <div key={vehicle.id} className="border p-4 rounded-lg shadow-lg bg-white">
            <img src={vehicle.image} alt={`${vehicle.model}`} className="w-full h-48 object-cover rounded-md" />
            <p className="mt-2"><b>Model:</b> {vehicle.model}</p>
            <p><b>Company:</b> {vehicle.manufacturer}</p>
            <p><b>Availability:</b> {vehicle.availability}</p>
            <p><b>Rate:</b> {vehicle.rental_rate}</p>
            <Link to={`/vehicle/${vehicle.id}`}>
              <button className="btn btn-secondary mt-2">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VehicleSlice;

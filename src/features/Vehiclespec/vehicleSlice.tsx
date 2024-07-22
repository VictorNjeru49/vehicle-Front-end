import { Link } from "react-router-dom"
import { VehicleApi, VehicleSpecificationApi } from "../users/UsersAPI"
import SomePage from "../../back/back";
import { TVehicle, TVehicleSpec } from "../../types/alltypes";

 
 function VehicleSlice() {
    const {data:vehicles, error, isLoading} =VehicleApi.useGetVehicleQuery()
    const {data:vehicleSpec} = VehicleSpecificationApi.useGetVehicleSpecQuery();


      const combinedData = ()=>{
        if(!vehicles && !vehicleSpec) return [];

        return vehicles?.map((vehicle:TVehicle) => {
          const Specs = vehicleSpec?.find((spec:TVehicleSpec) => spec.vehicleId === vehicle.id);
          return { ...Specs, ...vehicle};
        });
      }

      const combine = combinedData();
  
    if (isLoading) return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    );
  
    if (error) return (
      <div>Error fetching vehicles: <p>No data</p></div>
    );
   return (
     <div className='bg-amber-100 min-h-screen'>
      
      <SomePage />
      <h1 className='text-center text-black font-bold font-serif my-4'>Vehicles</h1>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {combine && combine.map((vehicle)=>(
            <div key={vehicle.id}>
                <img src={vehicle.image}/>
                <p><b>Model:</b> {vehicle.model}</p>
                <p><b>Company:</b> {vehicle.manufacturer}</p>
                <p><b>Availability:</b> {vehicle.availability}</p>
                <p><b>Rate:</b> {vehicle.rental_rate}</p>
                <Link to={`/vehicle/${vehicle.id}`}>
                <button className="btn btn-secondary">View Details</button>
                </Link>
        
            </div>
            
        ))}
        </div>
     </div>
   )
 }
 
 export default VehicleSlice
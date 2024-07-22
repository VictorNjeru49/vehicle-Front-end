import SomePage from '../back/back';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AvailableVehicleApi } from '../features/users/UsersAPI';

const VehicleList = () => {
  const { data, error, isLoading } = AvailableVehicleApi.useGetAvailableVehicleQuery();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter vehicles based on name and model
  const filteredVehicles = data?.filter(vehicle =>
    vehicle.name.toLowerCase().includes(searchQuery) ||
    vehicle.model.toLowerCase().includes(searchQuery)
  );

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center h-screen">
      <span className="loading loading-bars loading-lg"></span>
      <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
    </div>
  );

  if (error) return (
    <div>
      Error fetching vehicles: <p>No data</p>
      </div>
  );

  return (
    <div className='bg-amber-100 min-h-screen'>
      <SomePage />
      <h1 className='text-center text-black font-bold font-serif my-4'>Vehicles</h1>
      <div className='flex flex-col items-center gap-10 m-6'>
        
        <input
          type="search"
          placeholder='Search by vehicle name or model'
          value={searchQuery}
          onChange={handleSearchChange}
          className="bg-white border border-gray-300 rounded-lg py-2 px-4 text-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-primary-600 focus:border-primary-600 block w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
        />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {filteredVehicles?.length ? (
            filteredVehicles.map(vehicle => (
              <div key={vehicle.id} className="flex flex-col items-center text-center max-w-xl p-4 bg-white rounded-lg shadow-lg">
                <img
                  src={vehicle.link}
                  alt={`${vehicle.name}`}
                  className='w-full h-auto object-cover rounded-t-lg'
                />
                <div className='p-4 text-start'>
                  <h2 className='text-xl font-semibold'>{vehicle.name} {vehicle.model} ({vehicle.year})</h2>
                  <p><b>Price:</b> ${vehicle.price}</p>
                  <p><b>Mileage:</b> {vehicle.mileage} miles</p>
                  <p><b>Color:</b> {vehicle.color}</p>
                  <p><b>Transmission:</b> {vehicle.transmission}</p>
                  <p><b>Engine:</b> {vehicle.engine}</p>
                  <Link to={`/blogs/${vehicle.id}`} className='text-blue-500 hover:underline'>View Details</Link>
                  <Link to="/bookform">
                    <button className='btn btn-primary hover:btn-secondary ml-7 mt-2'>Book now</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No vehicles found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VehicleList;

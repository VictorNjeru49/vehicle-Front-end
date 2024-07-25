import { VehicleApi } from '../users/UsersAPI';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { TVehicle } from '../../types/alltypes';
import { Availability } from '../../utils/utils';
import { useState } from 'react';

const VehicleList = () => {
  const { data: vehicles, error, isLoading } = VehicleApi.useGetVehicleQuery();
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');

  if (error) {
    toast.error('Error: No data available');
    return <div>Error: No data available</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading vehicles...</p>
      </div>
    );
  }

  if (!vehicles || vehicles.length === 0) {
    return <div>No vehicles found</div>;
  }

  // Filter vehicles based on search term, availability, and rental rate
  const filteredVehicles = vehicles.filter(vehicle => {
    const specs = vehicle.specifications[0];
    const matchesSearchTerm =
      specs?.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specs?.model.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAvailability = availabilityFilter
      ? (vehicle.availability ? 'Available' : 'Unavailable') === availabilityFilter
      : true;

    const rentalRate = vehicle.rental_rate;
    const matchesRate =
      (minRate === '' || rentalRate >= Number(minRate)) &&
      (maxRate === '' || rentalRate <= Number(maxRate));

    return matchesSearchTerm && matchesAvailability && matchesRate;
  });

  // Validate rates
  const handleMinRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinRate(value);
    if (maxRate && Number(value) > Number(maxRate)) {
      toast.error('Minimum rate cannot be greater than maximum rate.');
    }
  };

  const handleMaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxRate(value);
    if (minRate && Number(value) < Number(minRate)) {
      toast.error('Maximum rate cannot be less than minimum rate.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Manufacturer or Model"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full mb-2"
        />
        <select
          value={availabilityFilter}
          onChange={(e) => setAvailabilityFilter(e.target.value)}
          className="select select-bordered w-full mb-2"
        >
          <option value="">All Availability</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
        <div className="flex space-x-2 mb-2">
          <input
            type="number"
            placeholder="Min Rental Rate"
            value={minRate}
            onChange={handleMinRateChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            placeholder="Max Rental Rate"
            value={maxRate}
            onChange={handleMaxRateChange}
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVehicles.map((vehicle: TVehicle) => {
          const specs = vehicle.specifications[0];

          return (
            <div key={vehicle.id} className="border rounded-lg shadow-lg bg-white p-4">
              <img 
                src={vehicle.image} 
                alt={specs?.model} 
                className="w-full h-48 object-cover rounded-md mb-4" 
              />
              <h1><b>Rental Rate:</b> ${vehicle.rental_rate}</h1>
              <h2 className="text-xl font-bold"><b>Company:</b> {specs?.manufacturer} </h2>
              <h3><b>Model:</b> {specs?.model}</h3>
              <h3 className="text-gray-500"><b>Availability:</b> {Availability(vehicle.availability)}</h3>
              <h4 className="text-lg"><b>Color:</b> {specs?.color}</h4>
              <Link to={`/vehicle/${vehicle.id}`} className="btn btn-primary mt-4">Book Now</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VehicleList;

import { useState } from 'react';
import { LocationApi } from '../users/UsersAPI';
import { toast } from 'sonner';
import { TLocations } from '../../types/alltypes';

const ManageLocations = () => {
  const { data: locations, error, isLoading } = LocationApi.useGetLocationsQuery();
  const [newLocation, setNewLocation] = useState<Partial<TLocations>>({
    locationName: '',
    address: '',
    contactNumber: 0, // Initialize as number
  });

  const [createLocation, { isLoading: isCreating }] = LocationApi.useCreateLocationsMutation();

  const handleCreateLocation = async () => {
    if (!newLocation.locationName || !newLocation.address || newLocation.contactNumber) {
      toast.error('Please fill in all fields correctly');
      return;
    }

    try {
      await createLocation(newLocation).unwrap();
      toast.success('Location created successfully');
      setNewLocation({ locationName: '', address: '', contactNumber: 0 }); // Reset form
    } catch (err) {
      console.error(err); // Log the error for debugging
      toast.error('Failed to create location');
    }
  };

  if (error) {
    toast.error('Error fetching locations');
    return <div>Error fetching locations</div>;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <span className="loading loading-bars loading-lg"></span>
        <p className="mt-4 text-gray-500 dark:text-gray-400">Loading locations...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Locations</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Create New Location</h2>
        <input
          type="text"
          placeholder="Location Name"
          value={newLocation.locationName}
          onChange={(e) => setNewLocation({ ...newLocation, locationName: e.target.value })}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={newLocation.address}
          onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
          className="input input-bordered w-full mb-2"
        />
        <input
          type="number"
          placeholder="Contact Number"
          value={newLocation.contactNumber || ''} // Display as empty string if 0
          onChange={(e) => setNewLocation({ ...newLocation, contactNumber: Number(e.target.value) })}
          className="input input-bordered w-full mb-2"
        />
        <button onClick={handleCreateLocation} className="btn btn-primary" disabled={isCreating}>
          {isCreating ? 'Creating...' : 'Create Location'}
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-2">All Locations</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations && locations.length > 0 ? (
          locations.map((location: TLocations) => (
            <div key={location.id} className="border rounded-lg shadow-lg bg-white p-4">
              <h3 className="font-bold">{location.locationName}</h3>
              <p><b>Address:</b> {location.address}</p>
              <p><b>Contact Number:</b> {location.contactNumber}</p>
            </div>
          ))
        ) : (
          <p>No locations available.</p>
        )}
      </div>
    </div>
  );
};

export default ManageLocations;

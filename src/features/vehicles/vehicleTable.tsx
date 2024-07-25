import { Toaster, toast } from 'sonner';
import { useEffect, useState } from 'react';
import { VehicleApi, VehicleSpecificationApi } from '../users/UsersAPI';

function VehicleTable() {
  const { data: vehicleData, isLoading, isError, refetch } = VehicleApi.useGetVehicleQuery(undefined, {
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
    refetchOnReconnect: true,
  });

  const [deleteVehicleProfile, { isLoading: isDeleting, data: deletemsg }] = VehicleApi.useDeleteVehicleMutation();
  const [createVehicle] = VehicleApi.useCreateVehicleMutation();
  const [createVehicleSpec] = VehicleSpecificationApi.useCreateVehicleSpecificationMutation();

  const [showModal, setShowModal] = useState(false);
  const [newVehicle, setNewVehicle] = useState({
    image: '',
    userId: 0,
    rental_rate: 0,
    availability: false, // Set default to false
    specifications: [],
  });

  const [newSpec, setNewSpec] = useState({
    vehicleId: 0,
    manufacturer: '',
    imageLink: '',
    model: '',
    color: '',
    fuelType: '',
    seatingCapacity: 0,
    features: '',
    engineCapacity: 0,
    transmission: '',
    vehicleYear: 0,
  });

  useEffect(() => {
    if (!isDeleting && !deletemsg) {
      refetch();
    }
  }, [isDeleting, deletemsg, refetch]);

  const handleDelete = async (id: number) => {
    try {
      await deleteVehicleProfile(id);
      toast.success('Vehicle deleted successfully');
    } catch (error) {
      toast.error('Failed to delete vehicle');
    }
  };

  const handleCreateVehicle = async () => {
    try {
      const vehicleResponse = await createVehicle(newVehicle).unwrap();
      if (newSpec) {
        newSpec.vehicleId = vehicleResponse.id; // Associate the spec with the new vehicle
        await createVehicleSpec(newSpec).unwrap();
      }
      toast.success('Vehicle created successfully');
      setShowModal(false);
      setNewVehicle({ image: '', userId: 0, rental_rate: 0, availability: false, specifications: [] });
      setNewSpec({vehicleId: 0, manufacturer: '', imageLink: '', model: '', color: '', fuelType: '', seatingCapacity: 0, features: '', engineCapacity: 0, transmission: '', vehicleYear: 0 });
    } catch (error) {
      toast.error('Failed to create vehicle');
    }
  };

  return (
    <>
      <Toaster />
      <div className='overflow-x-auto text-base-content bg-gray-700 rounded-lg'>
        <button onClick={() => setShowModal(true)} className='btn btn-primary mb-4'>Add Vehicle</button>
        <div className="overflow-x-auto">
          <table className="table table-xs text-white py-6">
            <thead>
              <tr className='text-red-400'>
                <th>Id</th>
                <th>Full Name</th>
                <th>Engine Capacity</th>
                <th>Rental Rate</th>
                <th>Availability</th>
                <th>Manufacturer</th>
                <th>Fuel Type</th>
                <th>Seating Capacity</th>
                <th>Features</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={10} className="loading loading-spinner place-content-center">
                    Loading...
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={10}><p>No data</p></td>
                </tr>
              ) : (
                vehicleData?.map((vehicle) => (
                  <tr key={vehicle.id}>
                    <td>{vehicle.id}</td>
                    <td>{vehicle.user.fullname}</td>
                    <td>{vehicle.specifications[0]?.engineCapacity}</td>
                    <td>{vehicle.rental_rate}</td>
                    <td>{vehicle.availability ? 'Available' : 'Not Available'}</td>
                    <td>{vehicle.specifications[0]?.manufacturer}</td>
                    <td>{vehicle.specifications[0]?.fuelType}</td>
                    <td>{vehicle.specifications[0]?.seatingCapacity}</td>
                    <td>{vehicle.specifications[0]?.features}</td>
                    <td>
                      <button className='btn btn-sm btn-outline btn-info'>Update</button>
                      <button onClick={() => handleDelete(vehicle.id)} className='btn btn-sm btn-outline btn-warning'>Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr className='text-yellow-600'>
                <th>Id</th>
                <th>Full Name</th>
                <th>Engine Capacity</th>
                <th>Rental Rate</th>
                <th>Availability</th>
                <th>Manufacturer</th>
                <th>Fuel Type</th>
                <th>Seating Capacity</th>
                <th>Features</th>
              </tr>
              <tr className='text-white'>
                <td colSpan={10}>{vehicleData ? `${vehicleData.length} records` : '0 records'}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h2 className="font-bold text-lg">Add New Vehicle</h2>
            <input type="text" placeholder="Image URL" className="input" onChange={(e) => setNewVehicle({ ...newVehicle, image: e.target.value })} />
            <input type="number" placeholder="User ID" className="input" onChange={(e) => setNewVehicle({ ...newVehicle, userId: Number(e.target.value) })} />
            <input type="number" placeholder="Rental Rate" className="input" onChange={(e) => setNewVehicle({ ...newVehicle, rental_rate: Number(e.target.value) })} />
            <select onChange={(e) => setNewVehicle({ ...newVehicle, availability: e.target.value === 'true' })} className="input">
              <option value="">Select Availability</option>
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
            
            <h3 className="font-bold text-md mt-4">Specifications</h3>
            <input type="text" placeholder="Manufacturer" className="input" onChange={(e) => setNewSpec({ ...newSpec, manufacturer: e.target.value })} />
            <input type="text" placeholder="Model" className="input" onChange={(e) => setNewSpec({ ...newSpec, model: e.target.value })} />
            <input type="text" placeholder="Color" className="input" onChange={(e) => setNewSpec({ ...newSpec, color: e.target.value })} />
            <input type="text" placeholder="Fuel Type" className="input" onChange={(e) => setNewSpec({ ...newSpec, fuelType: e.target.value })} />
            <input type="number" placeholder="Seating Capacity" className="input" onChange={(e) => setNewSpec({ ...newSpec, seatingCapacity: Number(e.target.value) })} />
            <input type="text" placeholder="Features" className="input" onChange={(e) => setNewSpec({ ...newSpec, features: e.target.value })} />
            <input type="number" placeholder="Engine Capacity" className="input" onChange={(e) => setNewSpec({ ...newSpec, engineCapacity: Number(e.target.value) })} />
            <input type="text" placeholder="Transmission" className="input" onChange={(e) => setNewSpec({ ...newSpec, transmission: e.target.value })} />
            <input type="number" placeholder="Vehicle Year" className="input" onChange={(e) => setNewSpec({ ...newSpec, vehicleYear: Number(e.target.value) })} />

            <div className="modal-action">
              <button className="btn" onClick={handleCreateVehicle}>Create Vehicle</button>
              <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default VehicleTable;

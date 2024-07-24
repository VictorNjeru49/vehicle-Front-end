import{ useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FleetManagmentApi } from '../users/UsersAPI';
import { TFleet } from '../../types/alltypes';

const FleetManagement = () => {
  const { data: fleetData, refetch } = FleetManagmentApi.useGetFleetManagementQuery(undefined, {
    pollingInterval: 3000,
    skipPollingIfUnfocused: true,
    refetchOnReconnect: true,
  });

  const [updateFleet] = FleetManagmentApi.useUpdateFleetManagmentMutation();
  const [deleteFleet] = FleetManagmentApi.useDeleteFleetManagmentMutation();
  const [createFleet] = FleetManagmentApi.useCreateFleetManagmentMutation();

  const [formData, setFormData] = useState({
    vehicleId: 0,
    acquisitionId: '',
    depreciationRate: 0,
    currentValue: 0,
    maintenanceCost: 0,
    status: true,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFleetId, setCurrentFleetId] = useState<number | null>(null);

  useEffect(() => {
    if (fleetData) {
      console.log('Fleet Data:', fleetData);
    }
  }, [fleetData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Convert numeric inputs to numbers
    const parsedValue = name === 'status' ? value === 'true' : (name === 'vehicleId' || name === 'depreciationRate' || name === 'currentValue' || name === 'maintenanceCost') ? Number(value) : value;

    setFormData((prev) => ({
      ...prev,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting form data:', formData); // Log the form data

    try {
      if (currentFleetId) {
        await updateFleet({ id: currentFleetId, ...formData }).unwrap();
        toast.success('Fleet updated successfully');
      } else {
        await createFleet(formData).unwrap();
        toast.success('Fleet created successfully');
      }
    } catch (error) {
      console.error('Error details:', error); // Log the error details
      toast.error(currentFleetId ? 'Failed to update fleet' : 'Failed to create fleet');
    } finally {
      setIsModalOpen(false);
      refetch();
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteFleet(id).unwrap();
      toast.success('Fleet deleted successfully');
      refetch();
    } catch (error) {
      console.error('Error deleting fleet:', error);
      toast.error('Failed to delete fleet');
    }
  };

  const openModal = (fleet?: TFleet) => {
    if (fleet) {
      setCurrentFleetId(fleet.id);
      setFormData({
        vehicleId: fleet.vehicleId,
        acquisitionId: fleet.acquisitionId,
        depreciationRate: fleet.depreciationRate,
        currentValue: fleet.currentValue,
        maintenanceCost: fleet.maintenanceCost,
        status: fleet.status,
      });
    } else {
      setCurrentFleetId(null);
      setFormData({
        vehicleId: 0,
        acquisitionId: '',
        depreciationRate: 0,
        currentValue: 0,
        maintenanceCost: 0,
        status: true,
      });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Fleet Management</h1>
      <button className="btn btn-primary mb-4" onClick={() => openModal()}>Add New Fleet</button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleetData?.map((fleet) => (
          <div key={fleet.id} className="border rounded-lg shadow-lg bg-white p-4">
            <h2 className="text-xl font-bold">{fleet.acquisitionId}</h2>
            <p><b>Vehicle ID:</b> {fleet.vehicleId}</p>
            <p><b>Depreciation Rate:</b> {fleet.depreciationRate}</p>
            <p><b>Current Value:</b> {fleet.currentValue}</p>
            <p><b>Maintenance Cost:</b> {fleet.maintenanceCost}</p>
            <p><b>Status:</b> {fleet.status ? 'Active' : 'Inactive'}</p>
            <button className="btn btn-secondary mt-2" onClick={() => openModal(fleet)}>Edit</button>
            <button className="btn btn-danger mt-2" onClick={() => handleDelete(fleet.id)}>Delete</button>
          </div>
        ))}
      </div>

      {/* Modal for Add/Edit Fleet */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="vehicleId">Vehicle ID</label>
                <input
                  type="number"
                  id="vehicleId"
                  name="vehicleId"
                  value={formData.vehicleId}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="acquisitionId">Acquisition ID</label>
                <input
                  type="text"
                  id="acquisitionId"
                  name="acquisitionId"
                  value={formData.acquisitionId}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="depreciationRate">Depreciation Rate</label>
                <input
                  type="number"
                  id="depreciationRate"
                  name="depreciationRate"
                  value={formData.depreciationRate}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="currentValue">Current Value</label>
                <input
                  type="number"
                  id="currentValue"
                  name="currentValue"
                  value={formData.currentValue}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="maintenanceCost">Maintenance Cost</label>
                <input
                  type="number"
                  id="maintenanceCost"
                  name="maintenanceCost"
                  value={formData.maintenanceCost}
                  onChange={handleInputChange}
                  required
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status ? "true" : "false"}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-4">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetManagement;

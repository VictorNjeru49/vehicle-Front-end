import { useEffect, useState } from "react";
import { toast, Toaster } from "sonner";
import { TAvailabilityVehicle } from "../../types/alltypes";
import VehicleAvailability from "./vehicleAvailable";
import { Plus } from "lucide-react";
import { AvailableVehicleApi } from "../users/UsersAPI";

function ShowTableVehicle() {
    const { data: vehicleData, isLoading, isError, refetch } = AvailableVehicleApi.useGetAvailableVehicleQuery(undefined, {
        pollingInterval: 3000,
        skipPollingIfUnfocused: true,
        refetchOnReconnect: true
    });

    const [deleteVehicle, { isLoading: isDeleting, error: deleteError }] = AvailableVehicleApi.useDeleteAvailableVehicleMutation();
    const [updateVehicle, { isLoading: isUpdating, error: updateError }] = AvailableVehicleApi.useUpdateAvailableVehicleMutation();
    const [editingVehicle, setEditingVehicle] = useState<TAvailabilityVehicle | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    useEffect(() => {
        if (!isDeleting && !deleteError) {
            refetch();
        }
    }, [isDeleting, deleteError, refetch]);

    useEffect(() => {
        if (!isUpdating && !updateError) {
            refetch();
        }
    }, [isUpdating, updateError, refetch]);

    const handleDelete = async (id: number) => {
        try {
            await deleteVehicle(id).unwrap();
            toast.success('Vehicle deleted successfully');
            refetch();
        } catch (error) {
            toast.error('Failed to delete vehicle');
        }
    };

    const handleUpdate = async (vehicle: TAvailabilityVehicle) => {
        try {
            await updateVehicle(vehicle).unwrap();
            toast.success('Vehicle updated successfully');
            setEditingVehicle(null);
            setShowForm(false);
            refetch();
        } catch (error) {
            toast.error('Error updating vehicle');
        }
    };

    const handleEditClick = (vehicle: TAvailabilityVehicle) => {
        setEditingVehicle(vehicle);
        setShowForm(true);
    };

    return (
        <div>
            <Toaster />
            <button 
                className="btn btn-primary mb-4"
                onClick={() => setShowRegisterForm(true)}
                onChange={() => setShowRegisterForm(false)}>
                
                <Plus/>
            </button>
            {showRegisterForm &&(
                <div>
                    <VehicleAvailability/>
                    <div className="flex flex-row justify-around my-4">
                    <button
                        className="bg-blue-400 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded-lg"
                        onClick={() => setShowRegisterForm(false)}
                        
                    >Ok</button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                        onClick={() => setShowRegisterForm(false)}
                        
                    >Cancel</button>

                    </div>

                </div>
            ) }
            {showForm && editingVehicle && (
                <form
                    className="w-1/2 m-auto border-black my-6 justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editingVehicle);
                    }}
                >
                    <div className="flex flex-col gap-6">
                        <label htmlFor="link">Link</label>
                        <input
                            type="text"
                            id="link"
                            value={editingVehicle.link}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, link: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={editingVehicle.name}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, name: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <label htmlFor="model">Model</label>
                        <input
                            type="text"
                            id="model"
                            value={editingVehicle.model}
                            onChange={(e) =>
                                setEditingVehicle({...editingVehicle, model: e.target.value })
                            }/>

                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            value={editingVehicle.price}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, price: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <label htmlFor="year">Year</label>
                        <input
                            type="text"
                            id="year"
                            value={editingVehicle.year}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, year: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="mileage">Mileage</label>
                        <input
                            type="text"
                            id="mileage"
                            value={editingVehicle.mileage}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, mileage: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="color">Color</label>
                        <input
                            type="text"
                            id="color"
                            value={editingVehicle.color}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, color: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="transmission">Transmission</label>
                        <input
                            type="text"
                            id="transmission"
                            value={editingVehicle.transmission}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, transmission: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="engine">Engine</label>
                        <input
                            type="text"
                            id="engine"
                            value={editingVehicle.engine}
                            onChange={(e) =>
                                setEditingVehicle({ ...editingVehicle, engine: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <button type="submit" className="m-auto btn btn-primary w-fit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Save"}
                        </button>
                        <button type="button" className="m-auto btn btn-secondary w-fit" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            <div className='overflow-x-auto text-base-content bg-gray-700 rounded-lg'>
                <button onClick={refetch} className="btn btn-sm btn-primary">
                    Refresh data
                </button>
                <div className="overflow-x-auto">
                    <table className="table table-xs text-white py-6">
                        <thead>
                            <tr className='text-red-400'>
                                <th>Id</th>
                                <th>Link</th>
                                <th>Name</th>
                                <th>model</th>
                                <th>Price</th>
                                <th>Year</th>
                                <th>Mileage</th>
                                <th>Color</th>
                                <th>Transmission</th>
                                <th>Engine</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isLoading ? (<tr><td className="loading loading-spinner" colSpan={9}>loading</td></tr>) : (
                                    isError ? (
                                        <tr>
                                            <td colSpan={9}>
                                                <p>No data</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        vehicleData && vehicleData.map((vehicle, index) => (
                                            <tr key={index}>
                                                <td>{vehicle.id}</td>
                                                <td><img src={vehicle.link}/></td>
                                                <td>{vehicle.name}</td>
                                                <td>{vehicle.model}</td>
                                                <td>{vehicle.price}</td>
                                                <td>{vehicle.year}</td>
                                                <td>{vehicle.mileage}</td>
                                                <td>{vehicle.color}</td>
                                                <td>{vehicle.transmission}</td>
                                                <td>{vehicle.engine}</td>
                                                <td>
                                                    <button onClick={() => handleEditClick(vehicle)} className='btn btn-sm btn-outline btn-info my-4'>Update</button>
                                                    <button onClick={() => handleDelete(vehicle.id)} className='btn btn-sm btn-outline btn-warning'>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    )
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr className='text-yellow-600'>
                                <th>Id</th>
                                <th>Link</th>
                                <th>Name</th>
                                <th>model</th>
                                <th>Price</th>
                                <th>Year</th>
                                <th>Mileage</th>
                                <th>Color</th>
                                <th>Transmission</th>
                                <th>Engine</th>
                                <th>Actions</th>
                            </tr>
                            <tr className='text-white'>
                                <td colSpan={9}>{vehicleData ? `${vehicleData.length} records` : '0 records'}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ShowTableVehicle;

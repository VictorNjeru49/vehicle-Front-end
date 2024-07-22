import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SomePage from "../../back/back";
import { VehicleApi, VehicleSpecificationApi } from "../users/UsersAPI";

function VehicleDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: vehicleSpec, isLoading: specLoading } = VehicleSpecificationApi.useGetVehicleSpecQuery();
    const { data: vehicles, isLoading: vehiclesLoading } = VehicleApi.useGetVehicleQuery();
    const [bookVehicle, { isLoading: bookingLoading }] = VehicleApi.useBookVehicleMutation();

    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        if (vehicleSpec && id) {
            const foundVehicle = vehicleSpec.find(v => v.id === Number(id));
            setVehicle(foundVehicle);
        }
    }, [vehicleSpec, id]);

    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [totalCost, setTotalCost] = useState<number>(0);

    const handleDateChange = () => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            const timeDiff = end.getTime() - start.getTime();
            const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
            const costPerDay = 60;
            setTotalCost(dayDiff * costPerDay);
        }
    };

    const handleBooking = async () => {
        try {
            await bookVehicle({ vehicleId: vehicle.id, userId: 1, startDate, endDate }).unwrap(); // userId should be dynamically set based on the logged-in user
            alert("Booking successful!");
            navigate("/bookform");
        } catch (error) {
            console.error("Failed to book vehicle:", error);
            alert("Booking failed. Please try again.");
        }
    };

    if (specLoading || vehiclesLoading || bookingLoading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <SomePage />
            {vehicle ? (
                <div className="w-1/2 border-8 m-auto text-center">
                    <div className="my-3">
                        <img
                            src={vehicle.imageLink}
                            alt={`${vehicle.model}`}
                            className="w-full h-auto object-cover rounded-t-lg"
                        />
                        <h2 className="text-xl font-semibold">
                            {vehicle.manufacturer} {vehicle.model} ({vehicle.vehicleYear})
                        </h2>
                        <p>
                            <b>Features:</b> {vehicle.features}
                        </p>
                        <p>
                            <b>Seating Capacity:</b> {vehicle.seatingCapacity} People
                        </p>
                        <p>
                            <b>Color:</b> {vehicle.color}
                        </p>
                        <p>
                            <b>Transmission:</b> {vehicle.transmission}
                        </p>
                        <p>
                            <b>Engine:</b> {vehicle.engineCapacity}
                        </p>
                        <p>
                            <b>Fuel Type:</b> {vehicle.fuelType}
                        </p>

                        {/* Date Picker and Cost Calculation */}
                        <div className="my-4">
                            <label htmlFor="startDate" className="block text-gray-700 dark:text-gray-300">
                                Start Date
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2 m-auto"
                            />

                            <label htmlFor="endDate" className="block mt-4 text-gray-700 dark:text-gray-300">
                                End Date
                            </label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-1/2 m-auto"
                            />

                            <button
                                onClick={handleDateChange}
                                className="btn btn-primary mt-4"
                            >
                                Calculate Cost
                            </button>

                            {totalCost > 0 && (
                                <p className="mt-4 text-lg font-bold">
                                    Total Cost: ${totalCost}
                                </p>
                            )}
                        </div>

                        <button onClick={handleBooking} className="btn btn-primary hover:btn-secondary ml-7 mt-2">
                            Book now
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-700 dark:text-gray-300">Vehicle not found</p>
            )}
        </div>
    );
}

export default VehicleDetails;

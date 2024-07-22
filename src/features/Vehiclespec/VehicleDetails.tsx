import { useState } from "react";
import SomePage from "../../back/back"
import {  VehicleSpecificationApi } from "../users/UsersAPI";
import { Link, useParams } from "react-router-dom";



function VehicleDetails() {
    const { id } = useParams();
    const {data:vehicleSpec} = VehicleSpecificationApi.useGetVehicleSpecQuery();
    // const { data:vehicles } = VehicleApi.useGetVehicleQuery();

    console.log(vehicleSpec)
    const vehiclespecs = vehicleSpec?.find( v => v.id === Number(id));
    // console.log(vehicle)



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
    }

  return (
    <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <SomePage />
            {/* {vehicleSpec && vehicleSpec.map(vehicle =>  */}
                <div className="w-1/2 border-8 m-auto text-center">
                    <div className="my-3">
                        <img
                            src={vehiclespecs?.imageLink}
                            alt={`${vehiclespecs?.model}`}
                            className='w-full h-auto object-cover rounded-t-lg'
                        />
                        <h2 className='text-xl font-semibold'>{vehiclespecs?.manufacturer} {vehiclespecs?.model} ({vehiclespecs?.vehicleYear})</h2>
                        <p><b>Features:</b> ${vehiclespecs?.features}</p>
                        <p><b>Seating Capacity:</b> {vehiclespecs?.seatingCapacity} People</p>
                        <p><b>Color:</b> {vehiclespecs?.color}</p>
                        <p><b>Transmission:</b> {vehiclespecs?.transmission}</p>
                        <p><b>Engine:</b> {vehiclespecs?.engineCapacity}</p>
                        <p><b>Fuel Type:</b> {vehiclespecs?.fuelType}</p>

                        {/* Date Picker and Cost Calculation */}
                        <div className="my-4">
                            <label htmlFor="startDate" className="block text-gray-700 dark:text-gray-300">Start Date</label>
                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="bg-white border border-gray-300 w-1/2 m-auto text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />

                            <label htmlFor="endDate" className="block mt-4 text-gray-700 dark:text-gray-300">End Date</label>
                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="bg-white border border-gray-300 text-gray-900 w-1/2 m-auto text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                        <Link to="/bookform">
                            <button className='btn btn-primary hover:btn-secondary ml-7 mt-2'>Book now</button>
                        </Link>
                    </div>
                </div>
           {/* )} */}
        </div>
    </div>
   
  )
}


export default VehicleDetails
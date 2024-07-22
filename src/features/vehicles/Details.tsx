import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SomePage from '../../back/back';
import { AvailableVehicleApi } from '../users/UsersAPI';

const Details = () => {
    const { id } = useParams();
    const { data, isSuccess } = AvailableVehicleApi.useGetAvailableVehicleByIdQuery(Number(id));

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

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
            <SomePage />
            {isSuccess ? (
                <div className="w-1/2 border-8 m-auto text-center">
                    <div className="my-3">
                        <img
                            src={data.link}
                            alt={`${data.name}`}
                            className='w-full h-auto object-cover rounded-t-lg'
                        />
                        <h2 className='text-xl font-semibold'>{data.name} {data.model} ({data.year})</h2>
                        <p><b>Price:</b> ${data.price}</p>
                        <p><b>Mileage:</b> {data.mileage} miles</p>
                        <p><b>Color:</b> {data.color}</p>
                        <p><b>Transmission:</b> {data.transmission}</p>
                        <p><b>Engine:</b> {data.engine}</p>

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
            ) : (
                <div className="flex flex-col items-center justify-center h-screen">
                    <span className="loading loading-bars loading-lg"></span>
                    <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
                </div>
            )}
        </div>
    );
};

export default Details;

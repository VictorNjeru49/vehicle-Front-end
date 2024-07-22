import { useState } from "react";
import SomePage from "../../back/back";
import { VehicleSpecificationApi } from "../users/UsersAPI";
import { useParams, useNavigate } from "react-router-dom";

function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: vehicleSpec } = VehicleSpecificationApi.useGetVehicleSpecQuery();
  const vehiclespecs = vehicleSpec?.find((v) => v.id === Number(id));
  const [startDate, setStartDate] = useState<string | undefined>(undefined);
  const [endDate, setEndDate] = useState<string | undefined>(undefined);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [location, setLocation] = useState<string>("");
  const [contactPhone, setContactPhone] = useState<string>("");
  const navigate = useNavigate();

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

  const handleBookNow = () => {
    setShowModal(true);
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/bookform");
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <SomePage />
        <div className="w-1/2 border-8 m-auto text-center">
          <div className="my-3">
            <img
              src={vehiclespecs?.imageLink}
              alt={`${vehiclespecs?.model}`}
              className="w-full h-auto object-cover rounded-t-lg"
            />
            <h2 className="text-xl font-semibold">
              {vehiclespecs?.manufacturer} {vehiclespecs?.model} ({vehiclespecs?.vehicleYear})
            </h2>
            <p>
              <b>Features:</b> {vehiclespecs?.features}
            </p>
            <p>
              <b>Seating Capacity:</b> {vehiclespecs?.seatingCapacity} People
            </p>
            <p>
              <b>Color:</b> {vehiclespecs?.color}
            </p>
            <p>
              <b>Transmission:</b> {vehiclespecs?.transmission}
            </p>
            <p>
              <b>Engine:</b> {vehiclespecs?.engineCapacity}
            </p>
            <p>
              <b>Fuel Type:</b> {vehiclespecs?.fuelType}
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
                className="bg-white border border-gray-300 w-1/2 m-auto text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <label htmlFor="endDate" className="block mt-4 text-gray-700 dark:text-gray-300">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white border border-gray-300 text-gray-900 w-1/2 m-auto text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />

              <button onClick={handleDateChange} className="btn btn-primary mt-4">
                Calculate Cost
              </button>

              {totalCost > 0 && (
                <p className="mt-4 text-lg font-bold">Total Cost: ${totalCost}</p>
              )}
            </div>

            <button onClick={handleBookNow} className="btn btn-primary hover:btn-secondary ml-7 mt-2">
              Book now
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter Your Booking Details</h2>
            
            {/* Location Selection */}
            <label htmlFor="location" className="block text-gray-700 dark:text-gray-300">
              Select Location
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">Select a location</option>
              <option value="NAIROBI">NAIROBI</option>
              <option value="THIKA">THIKA</option>
              <option value="MOMBASA">MOMBASA</option>
              <option value="KERUGOYA">KERUGOYA</option>
              <option value="EMBU">EMBU</option>
              <option value="NYERI">NYERI</option>
            </select>
            
            {/* Contact Phone */}
            <label htmlFor="contactPhone" className="block mt-4 text-gray-700 dark:text-gray-300">
              Contact Phone
            </label>
            <input
              id="contactPhone"
              type="text"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Enter your contact phone"
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <p className="text-sm text-gray-500 mt-2">
              We will use this location and contact phone to calculate the distance and duration of your booking.
            </p>

            <div className="mt-4 flex justify-end space-x-4">
              <button onClick={handleCancel} className="btn btn-secondary">
                Cancel
              </button>
              <button onClick={handleConfirm} className="btn btn-primary">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VehicleDetails;

import { useEffect, useState } from "react";
import { BookingApi, LocationApi, PaymentApi, UserApi, VehicleApi, VehicleSpecificationApi } from "../users/UsersAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toast } from "sonner";

const VehicleDetails = () => {
  const { id } = useParams();
  const currentUser = useSelector((state: RootState) => state.auth);
  const userId = currentUser.user?.id;

  const { data: user } = UserApi.useGetUserProfileByIdQuery(Number(userId));
  const { data: vehicle, isLoading: isLoadingVehicle } = VehicleApi.useGetVehicleByIdQuery(Number(id));
  const { data: vehicleDatas } = BookingApi.useGetBookingByIdQuery(Number(id));
  const { data: locations } = LocationApi.useGetLocationsQuery();
  const [bookVehicle] = BookingApi.useCreateBookingMutation();
  const [createCheckoutSession] = PaymentApi.useCreatePaymentMutation();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [availability, setAvailability] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>(undefined);
  const { data: availabilityStatus } = VehicleSpecificationApi.useGetVehicleSpecificationsByIdQuery(Number(id));

  useEffect(() => {
    if (vehicle && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start < end) {
        const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
        setTotalAmount(vehicle.rental_rate * numberOfDays);
      } else {
        setError('End date must be after start date.');
      }
    }
    if (availabilityStatus !== undefined) {
      setAvailability(availabilityStatus);
    }
  }, [vehicle, startDate, endDate, availabilityStatus]);

  const handleBooking = async () => {
    if (availability === 'booked') {
      toast.error('The vehicle is already booked for the selected dates.');
      return;
    }

    if (selectedLocationId === undefined) {
      toast.error('Please select a location.');
      return;
    }

    if (!user || !userId) {
      toast.warning('User not logged in. Please log in to book a vehicle.');
      return;
    }

    const bookingPayload = {
      id: Number(vehicleDatas?.id),
      userId: userId,
      vehicleId: Number(id),
      locationId: selectedLocationId,
      bookingDate: startDate,
      returnDate: endDate,
      totalAmount: totalAmount,
      bookingStatus: 'pending',
    };

    
    try {
      await bookVehicle(bookingPayload).unwrap();
      const newBookingId = bookingPayload.id;
      
      console.log(bookingPayload.id)
      if (newBookingId === undefined) {
        throw new Error('Booking ID not returned');
      }

      localStorage.setItem('bookingId', newBookingId.toString());

      const paymentPayload = {
        bookingId: newBookingId,
        Amount: totalAmount * 100, // Convert to cents for payment processing
        checkoutUrl: '',
        paymentStatus: 'pending',
        paymentMethod: 'card',
        transactionId: ''
      };

      const checkoutResponse = await createCheckoutSession(paymentPayload).unwrap();
      paymentPayload.checkoutUrl = checkoutResponse.checkoutUrl;

      window.location.href = checkoutResponse.checkoutUrl;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      setError(`Failed to create checkout session: ${error || 'Please try again later.'}`);
    }
  };

  const specs = vehicle?.specifications[0];

  return (
    <div className="p-6">
      <main className="container mx-auto bg-white rounded shadow-md p-6">
        <button 
          onClick={() => navigate(-1)} 
          className="text-blue-500 hover:underline mb-4"
        >
          Back
        </button>
        {isLoadingVehicle ? (
          <p>Loading vehicle details...</p>
        ) : (
          <>
            {vehicle?.image && (
              <img 
                src={vehicle.image} 
                alt={specs?.model} 
                className="w-full h-64 object-cover rounded-md mb-6 shadow-md" 
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-lg text-gray-800 mb-2"><strong>Manufacturer:</strong> {specs?.manufacturer}</p>
                <p className="text-lg text-gray-800 mb-2"><strong>Seating Capacity:</strong> {specs?.seatingCapacity}</p>
                <p className="text-lg text-gray-800 mb-2"><strong>Engine Capacity:</strong> {specs?.engineCapacity}</p>
                <p className="text-lg text-gray-800 mb-2"><strong>Year:</strong> {specs?.vehicleYear}</p>
                <p className="text-lg text-gray-800 mb-2"><strong>Fuel Type:</strong> {specs?.fuelType}</p>
                <p className="text-lg text-gray-800 mb-2"><strong>Features:</strong> {specs?.features}</p>
              </div>
              <div>
                <p className="text-lg text-gray-800 mb-2"><strong>Availability:</strong> {vehicle?.availability ? 'Available' : 'Not Available'}</p>
                <p className="text-lg text-gray-800 mb-2"><strong>Rental Rate:</strong> ${vehicle?.rental_rate}/day</p>
                
                <label className="block mb-2 text-lg text-gray-800">Select Location:</label>
                <select
                  className="block w-full p-2 mb-3 border rounded"
                  value={selectedLocationId || ''}
                  onChange={(e) => setSelectedLocationId(Number(e.target.value))}
                  required
                >
                  <option value="" disabled>Select a location</option>
                  {locations?.map(location => (
                    <option key={location.id} value={location.id}>
                      {location.locationName} - {location.address} - {location.contactNumber}
                    </option>
                  ))}
                </select>

                <label className="block mb-2 text-lg text-gray-800">Select Start Date:</label>
                <input
                  type="date"
                  className="block w-full p-2 mb-3 border rounded"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  min={new Date().toISOString().split("T")[0]} // Prevent past dates
                  disabled={vehicle?.availability === false}
                />
                <label className="block mb-2 text-lg text-gray-800">Select End Date:</label>
                <input
                  type="date"
                  className="block w-full p-2 mb-3 border rounded"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  min={startDate} // Prevent end date before start date
                  disabled={vehicle?.availability === false}
                />
                <p className="text-lg text-gray-800 mb-4"><strong>Total Amount:</strong> ${totalAmount}</p>
                {availability === 'booked' && (
                  <p className="text-red-500 mb-4">The vehicle is not available for the selected dates.</p>
                )}
                <button
                  onClick={handleBooking}
                  className={`w-full py-2 rounded-md transition duration-300 ${vehicle?.availability === false ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                  disabled={vehicle?.availability === false}
                >
                  Book
                </button>

                {error && <p className="text-red-500 mt-4">{error}</p>}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default VehicleDetails;

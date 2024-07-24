import { useEffect, useState } from "react";
import { BookingApi, LocationApi, PaymentApi, UserApi, VehicleApi, VehicleSpecificationApi } from "../users/UsersAPI";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { toast } from "sonner";
import { PaymentForm } from "../../types/alltypes";


function VehicleDetails() {
  const { id } = useParams<{ id: string }>();
  const currentUser = useSelector((state: RootState) => state.auth);
  const user_id = currentUser.user?.id;
  const { data: user } = UserApi.useGetUserProfileByIdQuery(Number(user_id));
  const vehicleId = Number(id);
  const navigate = useNavigate();

  const { data: vehicle } = VehicleApi.useGetVehicleByIdQuery(vehicleId);
  const { data: locations } = LocationApi.useGetLocationsQuery();
  const [bookVehicle] = BookingApi.useCreateBookingMutation();
  const [createCheckoutSession] = PaymentApi.useCreatePaymentMutation();

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [availability, setAvailability] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocationId, setSelectedLocationId] = useState<number | undefined>(undefined);

  const { data: availabilityStatus } = VehicleSpecificationApi.useGetVehicleSpecificationsByIdQuery(vehicleId);

  useEffect(() => {
    if (vehicle && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const numberOfDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      setTotalAmount(vehicle.rental_rate * numberOfDays);
    }
    if (availabilityStatus !== undefined) {
      setAvailability(availabilityStatus);
    }
  }, [vehicle, startDate, endDate, availabilityStatus]);

  const handleBooking = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (availability === 'booked') {
      toast.error('The vehicle is already booked for the selected dates.');
      return;
    }

    if (selectedLocationId === undefined) {
      toast.error('Please select a location.');
      return;
    }

    if (!user || !user_id) {
      toast.warning('User not logged in. Please log in to book a vehicle.');
      return;
    }

    const bookingPayload = {
      userId: user_id,
      vehicleId: vehicleId,
      locationId: selectedLocationId,
      bookingDate: startDate,
      returnDate: endDate,
      totalAmount: totalAmount,
      bookingStatus: 'pending'
    };

    try {
      const bookingResponse = await bookVehicle(bookingPayload).unwrap();
      console.log('Booking Response:', bookingResponse);

      const bookingId = bookingResponse.id; // Expecting bookingId to be a number

      if (bookingId === undefined) {
        throw new Error('Booking ID not returned');
      }

      // Save the booking ID in local storage as a number
      localStorage.setItem('bookingId', bookingId.toString());

      const paymentPayload: PaymentForm = {
        id: 0, // This should be assigned based on your API response or logic
        bookingId: bookingId,
        Amount: totalAmount * 100, // Stripe expects amount in cents
        checkoutUrl: '', // This will be filled after creating the checkout session
        paymentStatus: 'pending',
        paymentMethod: 'card',
        transactionId: '' // This can be filled after payment processing
      };

      const checkoutResponse = await createCheckoutSession(paymentPayload).unwrap();
      paymentPayload.checkoutUrl = checkoutResponse.checkoutUrl; // Set the checkout URL

      window.location.href = `${checkoutResponse.checkoutUrl}`;
    } catch (error: any) {
      console.error('Error creating checkout session:', error);
      setError(`Failed to create checkout session: ${error.message || 'Please try again later.'}`);
    }
  };

  const specs = vehicle?.specifications[0];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-1 flex items-center justify-center p-6 bg-fixed bg-center bg-cover">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg w-full max-w-3xl backdrop-blur-md">
          <button 
            onClick={() => navigate(-1)} 
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-md hover:from-green-500 hover:to-blue-600 shadow-lg mb-4 transition duration-300"
          >
            Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{specs?.model}</h1>
          
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
              <p className="text-lg text-gray-800 mb-2"><strong>Availability:</strong> {vehicle?.availability}</p>
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
                disabled={vehicle?.availability === 'booked'}
              />
              <label className="block mb-2 text-lg text-gray-800">Select End Date:</label>
              <input
                type="date"
                className="block w-full p-2 mb-3 border rounded"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                disabled={vehicle?.availability === 'booked'}
              />
              <p className="text-lg text-gray-800 mb-4"><strong>Total Amount:</strong> ${totalAmount}</p>
              {availability === 'booked' && (
                <p className="text-red-500 mb-4">The vehicle is not available for the selected dates.</p>
              )}
              <button
                onClick={handleBooking}
                className={`w-full py-2 rounded-md transition duration-300 ${vehicle?.availability === 'booked' ? 'bg-gray-500 text-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
                disabled={vehicle?.availability === 'booked'}
              >
                Book
              </button>

              {error && <p className="text-red-500 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VehicleDetails;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import carImage from '../assets/car5.jpg'; // Import the image correctly
import { BookingApi, LocationApi, VehicleApi } from '../users/UsersAPI';

interface BookingDetailsPageProps {
  bookingId: number;
  imageUrl?: string; 
}

const BookingDetailsPage: React.FC<BookingDetailsPageProps> = ({ bookingId, imageUrl = carImage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { data: bookings, isLoading: bookingsLoading, isError: bookingsError } = BookingApi.useGetBookingQuery();
  const { data: vehicles, isLoading: vehiclesLoading, isError: vehiclesError } = VehicleApi.useGetVehicleQuery();
  const { data: locations, isLoading: locationsLoading, isError: locationsError } = LocationApi.useGetLocationsQuery();
  
  const [createBookingMutation] = BookingApi.useCreateBookingMutation();
  const [deleteBookingMutation] = BookingApi.useDeleteBookingMutation();

  const booking = bookings?.find((booking) => booking.id === bookingId);
  const vehicle = vehicles?.find((vehicle) => vehicle.vehicleId === booking?.vehicleId);

  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<number | ''>('');

  useEffect(() => {
    if (booking) {
      setBookingDate(new Date(booking.bookingDate));
      setReturnDate(new Date(booking.returnDate));
      setSelectedLocation(Number(booking.locationId));
    }
  }, [booking]);

  useEffect(() => {
    if (bookingDate && returnDate) {
      calculateTotalAmount(bookingDate, returnDate);
    }
  }, [bookingDate, returnDate]);

  const handleBookingDateChange = (date: Date | null) => {
    setBookingDate(date);
    if (date && returnDate) {
      calculateTotalAmount(date, returnDate);
    }
  };

  const handleReturnDateChange = (date: Date | null) => {
    setReturnDate(date);
    if (bookingDate && date) {
      calculateTotalAmount(bookingDate, date);
    }
  };

  const calculateTotalAmount = (start: Date, end: Date) => {
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const rentalRate = typeof vehicle?.rental_rate === 'string' ? parseFloat(vehicle.rental_rate) : vehicle?.rental_rate || 0;
    const total = days * (isNaN(rentalRate) ? 0 : rentalRate);
    setTotalAmount(total);
  };

  const handleBookNow = async () => {
    try {
      const newBooking = await createBookingMutation({
        bookingDate: bookingDate?.toISOString() || '',
        returnDate: returnDate?.toISOString() || '',
        booking_status: 'pending',
        totalAmount: totalAmount?.toFixed(2) || '0',
        locationId: selectedLocation,
        vehicleId: booking?.vehicleId,
        userId: booking?.userId,
      }).unwrap();

      dispatch({ type: 'bookings/addBooking', payload: newBooking });
      navigate('/bookings');
      setMessage('Booking successful and status updated to pending.');
    } catch (error) {
      setMessage('Failed to book.');
      console.error('Failed to book:', error);
    }
  };

  const handleDeleteBooking = async () => {
    try {
      await deleteBookingMutation(bookingId).unwrap();
      dispatch({ type: 'bookings/deleteBooking', payload: bookingId });
      navigate('/bookings');
      setMessage('Booking deleted successfully.');
    } catch (error) {
      setMessage('Failed to delete booking.');
      console.error('Failed to delete booking:', error);
    }
  };

  if (bookingsLoading || vehiclesLoading || locationsLoading) {
    return <p>Loading...</p>;
  }

  if (bookingsError || vehiclesError || locationsError || !booking || !vehicle) {
    return <p>Error fetching booking details.</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">Booking Details</h1>
        <div className="flex items-center mb-4">
          <img src={imageUrl} alt="Car" className="w-24 h-24 object-cover mr-4" />
          <div>
            <p><strong>Model:</strong> {vehicle.specifications.model}</p>
            <p><strong>Year:</strong> {vehicle.specifications.year}</p>
            <p><strong>Rental Rate:</strong> ${vehicle.rental_rate}</p>
          </div>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Booking Date:</label>
          <input
            type="date"
            value={bookingDate ? bookingDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleBookingDateChange(e.target.valueAsDate)}
            className="border rounded px-3 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Return Date:</label>
          <input
            type="date"
            value={returnDate ? returnDate.toISOString().split('T')[0] : ''}
            onChange={(e) => handleReturnDateChange(e.target.valueAsDate)}
            className="border rounded px-3 py-1"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(Number(e.target.value))}
            className="border rounded px-3 py-1"
          >
            <option value="" disabled>Select Location</option>
            {locations?.map((location: any, index: number) => (
              <option key={index} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        {totalAmount !== null && (
          <p className="mb-4"><strong>Total Amount:</strong> ${totalAmount.toFixed(2)}</p>
        )}
        <button onClick={handleBookNow} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-4">Book Now</button>
        <button onClick={handleDeleteBooking} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded mr-4">Delete</button>
        <button onClick={() => navigate('/users/vehicles')} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded">Back</button>
        {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
      </div>
    </div>
  );
};

export default BookingDetailsPage;

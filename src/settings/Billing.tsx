// import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { BookingApi } from "../features/users/UsersAPI";

function Billing() {
  // const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { data: booking, error, isLoading, refetch } = BookingApi.useGetBookingByIdQuery(Number(userId));
  const [updateBooking, { isLoading: isUpdating }] = BookingApi.useUpdateBookingMutation();
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  const handleUpdate = async () => {
    try {
      if (booking) {
        const updatedBooking = { ...booking, status: 'updated' }; // Example update
        await updateBooking(updatedBooking).unwrap();
        toast.success('Booking updated successfully');
        setBookingStatus('Booking updated successfully');
        refetch();
      }
    } catch (error) {
      toast.error('Failed to update booking');
      setBookingStatus('Failed to update booking');
    }
  };

  if (!userId) {
    return <div>Please log in to view your booking details.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <p>Error fetching booking details: 
        no data
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Booking Details</h1>
      {booking ? (
        <div className="mt-4">
          <h2 className="text-xl">Booking ID: {booking.id}</h2>
          <p><strong>Booking Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {booking.bookingStatus}</p>
          <button
            onClick={handleUpdate}
            className="btn btn-primary"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Booking'}
          </button>

          {bookingStatus && (
            <div className="mt-4">
              <p className="text-green-600">{bookingStatus}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No booking details found.</p>
      )}
    </div>
  );
}

export default Billing;

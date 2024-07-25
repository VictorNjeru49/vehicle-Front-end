// import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { PaymentApi } from "../features/users/UsersAPI";

function Accounts() {
  // const { id } = useParams<{ id: string }>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { data: payment, error, isLoading, refetch } = PaymentApi.useGetPaymentByIdQuery(Number(userId), {
    skip: !userId,
  });
  const [updatePayment, { isLoading: isUpdating }] = PaymentApi.useUpdatePaymentMutation();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  useEffect(() => {
    if (userId) {
      refetch();
    }
  }, [userId, refetch]);

  const handleUpdate = async () => {
    try {
      if (payment) {
        const updatedPayment = { ...payment, status: 'updated' }; // Example update
        await updatePayment(updatedPayment).unwrap();
        toast.success('Payment updated successfully');
        setPaymentStatus('Payment updated successfully');
        refetch();
      }
    } catch (error) {
      toast.error('Failed to update payment');
      setPaymentStatus('Failed to update payment');
    }
  };

  if (!userId) {
    return <div>Please log in to view your payment details.</div>;
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return (
    <div>
      <p>Error fetching payment details: 
        NO data
      </p>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Payment Details</h1>
      {payment ? (
        <div className="mt-4">
          <h2 className="text-xl">Payment ID: {payment.id}</h2>
          <p><strong>Amount:</strong> ${payment.Amount}</p>
          <p><strong>Status:</strong> {payment.paymentStatus}</p>
          <button
            onClick={handleUpdate}
            className="btn btn-primary"
            disabled={isUpdating}
          >
            {isUpdating ? 'Updating...' : 'Update Payment'}
          </button>

          {paymentStatus && (
            <div className="mt-4">
              <p className="text-green-600">{paymentStatus}</p>
            </div>
          )}
        </div>
      ) : (
        <p>No payment details found.</p>
      )}
    </div>
  );
}

export default Accounts;

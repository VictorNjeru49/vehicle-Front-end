import { useEffect, useState } from "react";
import { PaymentApi } from "../users/UsersAPI";
import { toast, Toaster } from "sonner";
import { PaymentForm } from "../../types/alltypes";


function Paymentslice() {
    const { data: PaymentData, isLoading, isError, refetch }= PaymentApi.useGetPaymentQuery(undefined,{
        pollingInterval: 3000,
        skipPollingIfUnfocused: true, 
        refetchOnReconnect: true
       })
    
       const [deletePayment, { isLoading: isDeleting, data: deleteError}]= PaymentApi.useDeletePaymentMutation()
       const [updatePayment, { isLoading: isUpdating, error: updateError }] = PaymentApi.useUpdatePaymentMutation()
       const [editingUser, setEditingUser] = useState<PaymentForm | null>(null);
       const [showForm, setShowForm] = useState(false);
   
       
       
    
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

    

       const handledelete= async (id: number)=>{
         //add your delete logic here
    try{
      await deletePayment(id)
      toast.success(deleteError)
        toast.success('Payment deleted successfully')
        refetch();
    }catch(error){
      toast.error('Failed to payment vehicle')
    }
       }
       const handleUpdate = async (payment: PaymentForm) => {
        try {
            console.log(payment)
            const updatedPayment= { 
                id: payment.id,
                Amount: payment.Amount,
                paymentStatus: payment.paymentStatus
            }
            await updatePayment(updatedPayment).unwrap();
            toast.success('Payment updated successfully');
            setEditingUser(null);
            setShowForm(false);
            refetch();
        } catch (error) {
            toast.error('Error updating Payment');
            
        }
    };

    const handleEditClick = (payment: PaymentForm) => {
        setEditingUser(payment);
        setShowForm(true);
    };


  return (
    <div>
        <Toaster/>
        {showForm && editingUser && (
                <form
                    className="w-1/2 m-auto border-black my-6 justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editingUser);
                    }}
                >
                    <div className="flex flex-col gap-6">
                        <label htmlFor="Amount">Amount</label>
                        <input
                            type="number"
                            id="Amount"
                            value={editingUser.Amount}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />


                        <label htmlFor="status">Payment Status</label>
                        <input
                            type="text"
                            id="status"
                            value={editingUser.paymentStatus}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, paymentStatus: e.target.value })
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
        <th>Booking Id</th>
        <th>Amount</th>
        <th>Payment Method</th>
        <th>Payment Status</th>
        <th>Transaction Id</th>
      </tr>
    </thead>
    <tbody>
    {
        isLoading ? (<tr><td className="loading loading-spinner">loading</td></tr>):(
            isError ? (
              <tr>
              <td colSpan={6}><p>No data</p></td>
          </tr>
            ):(
                PaymentData && PaymentData?.map((payment, index)=>(
                        <tr key={index}>
                            <td>{payment.id}</td>
                            <td>{payment.bookingId}</td>
                            <td>{payment.Amount}</td>
                            <td>{payment.paymentMethod}</td>
                            <td>{payment.paymentStatus}</td>
                            <td>{payment.transactionId}</td>
                            <td>
                                <button onClick={() => handleEditClick(payment)} className='btn btn-sm btn-outline btn-info'>update</button>
                                <button onClick={()=>handledelete(payment.id)} className='btn btn-sm btn-outline btn-warning'>delete</button>
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
        <th>Booking Id</th>
        <th>Amount</th>
        <th>Payment Method</th>
        <th>Payment Status</th>
        <th>Transaction Id</th>
      </tr>
      <tr className='text-white'>
      <td colSpan={6}>{PaymentData ? `${PaymentData.length} records` : '0 records'}</td>
      </tr>
    </tfoot>
  </table>
    </div>
    </div>
    </div>
  )
}

export default Paymentslice
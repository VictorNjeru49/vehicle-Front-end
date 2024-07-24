import { useForm, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';
import { Tickets } from '../../types/alltypes';
import { TicketsApi } from '../users/UsersAPI';

const DisplayTickets = () => {
  const { data: tickets, error, isLoading, refetch } = TicketsApi.useGetTicketsQuery();
  const [updateTicket] = TicketsApi.useUpdateTicketsMutation();
  const [deleteTicket] = TicketsApi.useDeleteTicketsMutation();
  const { register, handleSubmit } = useForm<Partial<Tickets>>();

  const handleUpdate: SubmitHandler<Partial<Tickets>> = async (data: Partial<Tickets>) => {
    try {
      await updateTicket({ ...data, id: data.id }).unwrap();
      toast.success('Ticket status updated successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to update ticket');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTicket(id).unwrap();
      toast.success('Ticket deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete ticket');
    }
  };

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error loading tickets</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Full Name</th>
              <th className="p-2">Description</th>
              <th className="p-2">Status</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets?.map((ticket) => (
              <tr key={ticket.id} className="border-b">
                <td className="p-2">{ticket.user.fullname}</td>
                <td className="p-2">{ticket.description}</td>
                <td className="p-2">{ticket.status}</td>
                <td className="p-2">
                  <form onSubmit={handleSubmit((data) => handleUpdate({ ...data, id: ticket.id }))} className="inline">
                    <input
                      id={`status-${ticket.id}`}
                      defaultValue={ticket.status}
                      {...register('status')}
                      className="input input-bordered w-24 mr-2"
                    />
                    <button type="submit" className="btn btn-primary btn-sm">Update</button>
                  </form>
                  <button onClick={() => handleDelete(ticket.id)} className="btn btn-danger btn-sm ml-2">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayTickets;

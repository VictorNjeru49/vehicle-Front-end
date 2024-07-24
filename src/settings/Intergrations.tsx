import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import { TicketsApi } from '../features/users/UsersAPI';
import { RootState } from '../app/store';
import { Tickets } from '../types/alltypes';


const UserTickets = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<Omit<Tickets, 'id' | 'status' | 'userId' | 'user'>>();
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const { data: tickets, error: ticketsError, refetch } = TicketsApi.useGetTicketsByIdQuery(Number(userId));
  const [createTicket, { isLoading }] = TicketsApi.useCreateTicketsMutation();
  const [ticketStatus, setTicketStatus] = useState<string | null>(null);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onSubmit = async (data: Omit<Tickets, 'id' | 'status' | 'userId' | 'user'>) => {
    try {
      const newTicket = {
        ...data,
        userId: Number(userId), // Ensure userId is included
        status: 'pending', // Default status to 'pending'
      };
      await createTicket(newTicket).unwrap();
      
      toast.success('Ticket created successfully');
      setTicketStatus('Ticket created successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to create ticket');
      setTicketStatus('Failed to create ticket');
    }
  };

  // Ensure tickets is an array before accessing it
  const ticketList = tickets?.ticket || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Tickets</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            className="textarea textarea-bordered w-full p-2 border border-gray-300 rounded"
          />
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Ticket'}
        </button>
      </form>

      {ticketStatus && (
        <div className="mt-4">
          <p className="text-green-600">{ticketStatus}</p>
        </div>
      )}

      {ticketsError && (
        <div className="mt-4">
          <p className="text-red-500">Error fetching tickets</p>
        </div>
      )}

      <h2 className="text-xl font-semibold mt-8">My Ticket Statuses</h2>
      <div className="mt-4 space-y-4">
        {ticketList.length > 0 ? (
          ticketList.map((ticket: Tickets) => (
            <div key={ticket.id} className="border rounded-lg p-4 bg-white shadow-md">
              <p className="font-semibold"><strong>Description:</strong> {ticket.description}</p>
              <p className="mt-2"><strong>Status:</strong> {ticket.status}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No tickets found.</p>
        )}
      </div>
    </div>
  );
};

export default UserTickets;

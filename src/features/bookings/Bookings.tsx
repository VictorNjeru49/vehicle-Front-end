import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createBooking, resetBookingState } from './bookingSlice';
import { RootState } from '../../app/store';

const stripePromise = loadStripe('your-publishable-key-from-stripe');

interface BookingFormValues {
  amount: number;
  currency: string;
  bookingDetails: [];
}

function BookingForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormValues>();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const bookingState = useSelector((state: RootState) => state.booking);

  useEffect(() => {
    if (bookingState.status === 'succeeded') {
      alert('Booking and payment succeeded');
      dispatch(resetBookingState());
    } else if (bookingState.status === 'failed') {
      alert(`Booking and payment failed: ${bookingState.error}`);
    }
  }, [bookingState, dispatch]);

  const onSubmit = async (data: BookingFormValues) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const paymentMethod = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement!,
    });

    if (paymentMethod.error) {
      console.error(paymentMethod.error.message);
      return;
    }

    const bookingData = {
      ...data,
      paymentMethodId: paymentMethod.paymentMethod?.id,
    };

    dispatch(createBooking(bookingData));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          id="amount"
          type="number"
          {...register('amount', { required: 'Amount is required' })}
        />
        {errors.amount && <p>{errors.amount.message}</p>}
      </div>
      <div>
        <label htmlFor="currency">Currency</label>
        <input
          id="currency"
          {...register('currency', { required: 'Currency is required' })}
        />
        {errors.currency && <p>{errors.currency.message}</p>}
      </div>
      <div>
        <label htmlFor="bookingDetails">Booking Details</label>
        <textarea
          id="bookingDetails"
          {...register('bookingDetails', { required: 'Booking details are required' })}
        />
        {errors.bookingDetails && <p>{errors.bookingDetails.message}</p>}
      </div>
      <div>
        <CardElement />
      </div>
      <button type="submit" disabled={bookingState.status === 'loading'}>
        {bookingState.status === 'loading' ? 'Processing...' : 'Book Now'}
      </button>
      {bookingState.status === 'failed' && <p>Failed to book. Please try again.</p>}
    </form>
  );
}

function BookingPage() {
  return (
    <Elements stripe={stripePromise}>
      <BookingForm />
    </Elements>
  );
}

export default BookingPage;

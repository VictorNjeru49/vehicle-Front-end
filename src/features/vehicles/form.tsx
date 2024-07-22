import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// Replace with your Stripe public key
const stripePromise = loadStripe('your-publishable-key');

function FormBook() {
    const [amount, setAmount] = useState<number>(0);

    const handleCheckout = async () => {
        try {
            const stripe = await stripePromise;

            if (!stripe) {
                console.error('Stripe has not loaded.');
                return;
            }

            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }),
            });

            const { id: sessionId } = await response.json();

            const { error } = await stripe.redirectToCheckout({ sessionId });

            if (error) {
                console.error(error.message);
            }
        } catch (error) {
            console.error('Error initiating checkout:', error);
        }
    };

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900">
                <div className="w-full max-w-3xl mx-auto p-8">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Checkout</h1>

                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Shipping Address</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className="block font-medium text-gray-700 dark:text-white mb-1">First Name</label>
                                    <input type="text" id="first_name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                                </div>
                                <div>
                                    <label htmlFor="last_name" className="block text-gray-700 dark:text-white mb-1">Last Name</label>
                                    <input type="text" id="last_name" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                                </div>
                            </div>
                            <div className="mb-5">
                                <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">Phone Number</label>
                                <input type="text" name="phone" id="phone" placeholder="Enter your phone number" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="email" className="font-medium mb-3 block text-base text-[#07074D]">Email Address</label>
                                <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" />
                            </div>

                            <div className="mt-4">
                                <label htmlFor="address" className="font-medium block text-gray-700 dark:text-white mb-1">Address</label>
                                <input type="text" id="address" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="city" className="font-medium block text-gray-700 dark:text-white mb-1">City</label>
                                <input type="text" id="city" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="state" className="font-medium block text-gray-700 dark:text-white mb-1">State</label>
                                    <input type="text" id="state" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                                </div>
                                <div>
                                    <label htmlFor="zip" className="block text-gray-700 dark:text-white mb-1">ZIP Code</label>
                                    <input type="text" id="zip" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"/>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">Payment Information</h2>
                            <div className="mt-4">
                                <label htmlFor="card_number" className="font-medium block text-gray-700 dark:text-white mb-1">Card Number</label>
                                <input type="text" id="card_number" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" placeholder="**** **** **** 1234"/>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="exp_date" className="font-medium block text-gray-700 dark:text-white mb-1">Expiration Date</label>
                                    <input type="text" id="exp_date" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" placeholder="MM / YY"/>
                                </div>
                                <div>
                                    <label htmlFor="cvv" className="font-medium block text-gray-700 dark:text-white mb-1">CVV</label>
                                    <input type="text" id="cvv" className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none " placeholder="***"/>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button 
                                className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900"
                                onClick={handleCheckout}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default FormBook;

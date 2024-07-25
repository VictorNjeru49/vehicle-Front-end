import SomePage from "../back/back";
import { useNavigate } from "react-router-dom";

function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-red-100">
      <SomePage />
      <div className="bg-white rounded-lg shadow-lg p-8 mt-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
          Payment Failed
        </h2>
        <p className="text-gray-600 mb-2">
          Unfortunately, your payment could not be processed at this time.
        </p>
        <p className="text-gray-600 mb-4">
          Please check your payment details and try again. If the issue persists, consider using a different payment method or contacting support.
        </p>
        <p className="text-gray-600 mb-6">
          Ensure that your card information is correct and that there are no issues with your bank.
        </p>
        <button
          onClick={() => navigate('/Dashboard-Profile')} // Navigate to the Dashboard Profile
          className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default PaymentFailed;

import SomePage from "../back/back";
import { useNavigate } from "react-router-dom";

function PaymentInfo() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <SomePage />
      <div className="bg-white rounded-lg shadow-lg p-8 mt-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          Thank You for Your Patience
        </h2>
        <p className="text-gray-600 mb-2">
          Your payment has been successfully processed.
        </p>
        <p className="text-gray-600 mb-4">
          The details about your vehicle will be sent to your email. Please check your inbox for further instructions.
        </p>
        <p className="text-gray-600 mb-6">
          If you do not see an email from us, please check your spam or junk folder.
        </p>
        <button
          onClick={() => navigate('/')} // Adjust the route as necessary
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

export default PaymentInfo;

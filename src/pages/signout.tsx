import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { store } from '../app/store'; // Ensure this import points to your store configuration

const SignOutForm = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
    const navigate = useNavigate();

    const handleLogOut = () => {
        // Clear the local storage & reset the state
        store.dispatch({ type: 'persist/PURGE', result: () => null, key: 'admin-auth' });
        store.getState().auth.token = null;
        navigate('/'); // Redirect to home page after logout
    };

    if (!isLoggedIn) {
        navigate('/login'); // Redirect to login page if the user is not logged in
        return null;
    }

    return (
        <div className="bg-gray-50 dark:bg-gray-900 place-content-center my-48">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign Out
                        </h1>
                        <button
                            onClick={handleLogOut}
                            className="btn btn-primary w-full"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignOutForm;

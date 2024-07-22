import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { selectUser, signOut } from './signout';

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);

    const handleSignOut = () => {
        dispatch(signOut());
        toast.success("Signed out successfully");
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">MyApp</Link>
                <div>
                    {user ? (
                        <>
                            <span className="text-white mr-4">Welcome, {user.email}</span>
                            <button onClick={handleSignOut} className="btn btn-secondary">Sign Out</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn-primary">Login</Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

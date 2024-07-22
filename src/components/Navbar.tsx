import { AlignJustify, Bell, CircleUserRound, LogIn, UserPlus, Search, Moon, Sun, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { login, logout } from "../components/authProtected/auth";
import { AppDispatch } from "../app/store";

function Navbar() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
    const dispatch = useDispatch<AppDispatch>();

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    useEffect(() => {
        // Check for user role in localStorage to set initial login state
        const userRole = localStorage.getItem('userRole');
        if (userRole) {
            // Assuming you have an action to set the login state
            dispatch(login({ user: { role: userRole }, token: localStorage.getItem('authToken') }));
        }
    }, [dispatch]);

    return (
        <>
            <div className={`navbar w-full border-b-4 ${isDarkMode ? "bg-slate-900 text-white" : "bg-slate-500"}`}>
                <div className="navbar w-full border-b-4 bg-slate-500">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <label className="swap swap-rotate">
                                    <input type="checkbox" className="theme-controller" value="synthwave" />
                                    <AlignJustify className="swap-off h-7 w-7 fill-current cursor-pointer" />
                                    <X className="swap-on h-7 w-7 fill-current cursor-pointer" />
                                </label>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/dashboard">Dashboard</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/blogs">Vehicle blog</Link></li>
                                <li className="hidden"><Link to="/login">Login</Link></li>
                                <li className="hidden"><Link to="/settings">Settings</Link></li>
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-xl max-sm:text-xs">Versal Vehicle Services</Link>
                    </div>

                    <div className="navbar-end max-sm:hidden max-md:hidden lg:flex">
                        <button className="btn btn-ghost btn-circle">
                            <Search className="h-5 w-5" />
                        </button>

                        <button className="btn btn-ghost btn-circle">
                            <div className="indicator">
                                <Bell className="h-5 w-5" />
                                <span className="badge badge-xs badge-primary indicator-item"></span>
                            </div>
                        </button>

                        <button className="btn btn-ghost btn-circle" onClick={toggleDarkMode}>
                            {isDarkMode ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </button>

                        {isLoggedIn ? (
                          <>
                          <div className="relative group">
                              <Link to="/login" className="btn btn-ghost btn-circle">
                                  <LogIn className="h-5 w-5" />
                              </Link>
                              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2">
                                  Login
                              </span>
                          </div>

                          <div className="relative group">
                              <Link to="/register" className="btn btn-ghost btn-circle">
                                  <UserPlus className="h-5 w-5" />
                              </Link>
                              <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded py-1 px-2">
                                  Register
                              </span>
                          </div>
                      </>
                            
                        ) : (
                          <div className="dropdown dropdown-end">
                          <label tabIndex={0}>
                              <div className="w-10 rounded-full">
                                  <CircleUserRound />
                              </div>
                          </label>
                          <ul
                              tabIndex={0}
                              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10">
                              <li><Link to="/userprofile">Profile</Link></li>
                              <li><Link to="/account">Account</Link></li>
                              <li><Link to="/dashboard-profile">Dashboard</Link></li>
                              <li><button onClick={handleLogout}>Logout</button></li>
                          </ul>
                      </div> 
                        )}
                    </div>
                </div>

                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle dropdown hidden max-sm:flex">
                    <AlignJustify className="dropdown dropdown-title h-7 w-7 fill-current cursor-pointer" />
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to="/userprofile">Profile</Link></li>
                        <li><Link to="/account">Account</Link></li>
                        <li><Link to="/dashboard-profile">Dashboard</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;

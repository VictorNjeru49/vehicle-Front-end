import { AlignJustify, Bell, LogIn, UserPlus, Search, X, CircleUserIcon } from "lucide-react";

import { Link } from "react-router-dom";

function Navbar() {

    return (
        <>
            <div className={`navbar w-full border-b-4 `}>
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
                                <li><Link to="/Dashboard-Profile">Dashboard</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                                <li><Link to="/register">Register</Link></li>
                                <li><Link to="/vehicles">Vehicle blog</Link></li>
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
</div>

                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle dropdown  max-sm:flex">
                    <CircleUserIcon className="dropdown dropdown-title h-7 w-7 fill-current cursor-pointer" />
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to="/userprofile">Profile</Link></li>
                        <li><Link to="/account">Account</Link></li>
                        <li><Link to="/Dashboard-Profile">Dashboard</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>

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

                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle dropdown hidden max-sm:flex">
                    <AlignJustify className="dropdown dropdown-title h-7 w-7 fill-current cursor-pointer" />
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content text-black bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><Link to="/userprofile">Profile</Link></li>
                        <li><Link to="/login"><LogIn className="h-5 w-5" /></Link></li>
                        <li><Link to="/register"><UserPlus className="h-5 w-5" /></Link></li>
                        <li><Link to="/account">Account</Link></li>
                        <li><Link to="/Dashboard-Profile">Dashboard</Link></li>
                        <li><Link to="/logout">Logout</Link></li>
                    </ul>
                </div>
 </div>
            </div>
            </>
    )}

export default Navbar;

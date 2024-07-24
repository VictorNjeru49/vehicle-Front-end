import { CarRentalSharp } from "@mui/icons-material";
import { ActivityIcon, Contact2, Download, House, LogOut, SquareGanttChart } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RightNavbar() {
  const [activeLink, setActiveLink] = useState('admintable');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const handleLogout = () => {
    // Perform any logout logic here (e.g., clearing tokens)
    navigate('/signOut'); // Navigate to the sign-out route
  };

  const navLinks = [
    { to: 'admintable', icon: <House className="h-5 w-5" />, label: 'Home' },
    { to: 'vehicle', icon: <SquareGanttChart className="h-5 w-5" />, label: 'My rentals' },
    { to: 'vehiclestatus', icon: <CarRentalSharp className="h-5 w-5" />, label: 'Vehicles' },
    { to: 'payment', icon: <ActivityIcon className="h-5 w-5" />, label: 'Account' },
    { to: '#contact', icon: <Contact2 className="h-5 w-5" />, label: 'Contact us' },
    { to: 'Tickets', icon: <Contact2 className="h-5 w-5" />, label: 'Tickets' },
    { to: 'termsService', icon: <Download className="h-5 w-5" />, label: 'Terms of service' },
    { to: 'Fleets', icon: <Download className="h-5 w-5" />, label: 'Fleets' },
    { to: '/signOut', icon: <LogOut className="h-5 w-5" />, label: 'Log out', onClick: handleLogout } // Add onClick for logout
  ];

  return (
    <ul className="menu rounded-box gap-3">
      {navLinks.map((link) => (
        <li key={link.to}>
          {link.to === '/signOut' ? (
            <button onClick={handleLogout} className={`flex flex-col items-center ${
              activeLink === link.to
                ? 'bg-red-500 border-teal-800 text-teal-900 hover:bg-teal-50 hover:text-teal-700'
                : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
            }`}>
              {link.icon}
              <p>{link.label}</p>
            </button>
          ) : (
            <Link to={link.to} onClick={() => handleLinkClick(link.to)}>
              <a
                className={`flex flex-col items-center ${
                  activeLink === link.to
                    ? 'bg-red-500 border-teal-800 text-teal-900 hover:bg-teal-50 hover:text-teal-700'
                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {link.icon}
                <p>{link.label}</p>
              </a>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default RightNavbar;

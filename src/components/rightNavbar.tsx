import { TerminalSharp } from "@mui/icons-material";
import { ActivityIcon, Download, House, LocateIcon, LogOut, SquareGanttChart, TicketIcon } from "lucide-react";
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
    { to: 'vehicle', icon: <SquareGanttChart className="h-5 w-5" />, label: 'rentals' },
    { to: 'location', icon: <LocateIcon className="h-5 w-5" />, label: 'locations' },
    { to: 'payment', icon: <ActivityIcon className="h-5 w-5" />, label: 'Account' },
    { to: 'Tickets', icon: <TicketIcon className="h-5 w-5" />, label: 'Tickets' },
    { to: 'termsService', icon: <TerminalSharp className="h-5 w-5" />, label: 'Terms' },
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
                ? '  text-teal-900'
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
                    ? ' text-teal-900 '
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

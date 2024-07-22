import { CarRentalSharp } from "@mui/icons-material";
import { ActivityIcon, Contact2, Download, House, LogOut, SquareGanttChart } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function RightNavbar() {

  const [activeLink, setActiveLink] = useState('admintable');

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  const navLinks = [
    { to: 'admintable', icon: <House className="h-5 w-5" />, label: 'Home' },
    { to: 'vehicle', icon: <SquareGanttChart className="h-5 w-5" />, label: 'My rentals' },
    { to: 'vehiclestatus', icon: <CarRentalSharp className="h-5 w-5" />, label: 'Vehicles' },
    { to: 'payment', icon: <ActivityIcon className="h-5 w-5" />, label: 'Account' },
    { to: '#contact', icon: <Contact2 className="h-5 w-5" />, label: 'Contact us' },
    { to: '#terms', icon: <Download className="h-5 w-5" />, label: 'Terms of service' },
    { to: '/signOut', icon: <LogOut className="h-5 w-5" />, label: 'log out' }
  ];

  return (
    <ul className="menu rounded-box gap-3">
      {navLinks.map((link) => (
        <Link key={link.to} to={link.to} onClick={() => handleLinkClick(link.to)}>
          <li>
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
          </li>
        </Link>
      ))}
    </ul>
  );
}

export default RightNavbar;

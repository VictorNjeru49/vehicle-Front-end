import { AccountBox, IntegrationInstructions, Payment } from "@mui/icons-material";
import { Bell, CircleUserRound, KeySquare, SquareUserIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const links = [
  {
    to: "profileUser",
    label: "Profile",
    icon: <CircleUserRound className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
  {
    to: "profile",
    label: "Personal Bio",
    icon: <SquareUserIcon className="flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
  {
    to: "account",
    label: "Account",
    icon: <AccountBox className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
  {
    to: "password",
    label: "Password",
    icon: <KeySquare className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
  {
    to: "notifications",
    label: "Notifications",
    icon: <Bell className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
  {
    to: "billing",
    label: "Billing",
    icon: <Payment className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
  {
    to: "integrations",
    label: "Integrations",
    icon: <IntegrationInstructions className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6" />,
  },
];

function SidebarUser() {
  const [activeLink, setActiveLink] = useState('profileUser');

  const handleLinkClick = (link:string) => {
    setActiveLink(link);
  };

  return (
    <div>
      <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
        <aside className="py-6 lg:col-span-3">
          <nav className="space-y-1 max-sm:flex flex-row">
            {links.map((link) => (
              <Link to={link.to} key={link.to}>
                <a
                  className={`${
                    activeLink === link.to.slice(1)
                      ? 'bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                      : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900'
                  } group border-l-4 px-3 py-2 flex items-center text-sm font-medium`}
                  aria-current={activeLink === link.to.slice(1) ? 'page' : undefined}
                  onClick={() => handleLinkClick(link.to.slice(1))}
                >
                  <div
                    className={`${
                      activeLink === link.to.slice(1)
                        ? 'text-teal-500 group-hover:text-teal-500'
                        : 'text-gray-400 group-hover:text-gray-500'
                    } flex-shrink-0 -ml-1 mr-3 h-6 w-6`}
                  >
                    {link.icon}
                  </div>
                  <span className="truncate max-sm:hidden">{link.label}</span>
                </a>
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </div>
  );
}

export default SidebarUser;

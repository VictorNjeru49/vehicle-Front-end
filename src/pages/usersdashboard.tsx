import { useState } from 'react';
import { Menu } from 'lucide-react';

const SidebarDrawer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" h-screen flex overflow-hidden bg-gray-200">
      {/* Sidebar */}
      <div
        className={`drawer drawer-mobile ${isSidebarOpen ? 'drawer-open' : ''}`}
      >
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <div className="bg-white shadow">
            <div className="container mx-auto">
              <div className="flex justify-between items-center py-4 px-2">
                <h1 className="text-xl font-semibold">Animated Drawer</h1>
                <button
                  className="btn btn-ghost drawer-button lg:hidden"
                  onClick={toggleSidebar}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 overflow-auto p-4">
            <h1 className="text-2xl font-semibold">Welcome to our website</h1>
            <p>... Content goes here ...</p>
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={toggleSidebar}
          ></label>
          <ul className="menu p-4 w-80 bg-gray-800 text-white">
            <li className="mb-2">
              <a href="#" className="hover:text-indigo-400">
                Home
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-indigo-400">
                About
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-indigo-400">
                Services
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:text-indigo-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SidebarDrawer;

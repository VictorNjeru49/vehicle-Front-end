import { useState } from 'react';
import Profile from '../settings/profile';
import { Link } from 'react-router-dom';



const SettingsPage = ()=> {
  const [open, setOpen] = useState(false);
  return (
    <>
    <img src=""/>
    <div className="bg-gray-100">

        <div>
            
    <div className="relative overflow-hidden bg-sky-700 pb-32">
    <nav
      className={`relative z-10 border-b border-teal-500 border-opacity-25 ${
        open ? 'bg-sky-900' : 'bg-transparent'
      } lg:bg-transparent`}
    >
        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
          <div className="relative flex h-16 items-center justify-between lg:border-b lg:border-sky-800">
            <div className="flex items-center px-2 lg:px-0">
              <div className="flex-shrink-0">
                <Link to="/">
                <img className="block h-8 w-auto" src="https://th.bing.com/th/id/OIP.HHVUf3TYqncgpJXyCMmxyAHaHa?rs=1&pid=ImgDetMain" alt="House in Umbria" />
                </Link>
              </div>
              <div className="hidden lg:ml-6 lg:block lg:space-x-4">
                <div className="flex">
                  <a href="#" className="bg-black bg-opacity-25 rounded-md py-2 px-3 text-sm font-medium text-white hover:bg-sky-800">Dashboard</a>
                  <Link to="/vehicles"><a href="#" className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">Vehicle</a></Link>
                </div>
              </div>
            </div>
            <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="w-full max-w-lg lg:max-w-xs">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative text-sky-100 focus-within:text-gray-400">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="h-5 w-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <input id="search" name="search" className="block w-full rounded-md border border-transparent bg-sky-700 bg-opacity-50 py-2 pl-10 pr-3 leading-5 placeholder-sky-100 focus:border-white focus:bg-white focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white sm:text-sm" placeholder="Search" type="search" />
                </div>
              </div>
            </div>
            <div className="flex lg:hidden">
              <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-sky-200 hover:bg-sky-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" onClick={() => setOpen(!open)} aria-expanded={open}>
                <span className="sr-only">Open main menu</span>
                <svg className={`${open ? 'hidden' : 'block'} h-6 w-6 flex-shrink-0`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                </svg>
                <svg className={`${open ? 'block' : 'hidden'} h-6 w-6 flex-shrink-0`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="hidden lg:ml-4 lg:block">
              <div className="flex items-center">
                <button type="button" className="flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
                  <span className="sr-only">View notifications</span>
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                  </svg>
                </button>

                <div className="relative ml-4 flex-shrink-0">
                  <div>
                    <button type="button" className="flex rounded-full text-sm text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900" id="user-menu-button" aria-expanded="false" aria-haspopup="true" onClick={() => setOpen(!open)}>
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full object-fill" src="https://th.bing.com/th/id/OIP.dsiC7a1xQd-CPZpBuMeCDgHaE8?rs=1&pid=ImgDetMain" />
                    </button>
                  </div>

                  <div className={`${open ? 'block' : 'hidden'} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex={-1}>
                    <Link to="/userprofile"> <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabIndex={-1}>Your Profile</a></Link>
                    <a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabIndex={-1}>Settings</a>
                    <Link to="/signOut"><a href="#" className="block py-2 px-4 text-sm text-gray-700" role="menuitem" tabIndex={-1}>Sign out</a></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${open ? 'block' : 'hidden'} bg-sky-900 lg:hidden`} id="mobile-menu">
          <div className="space-y-1 px-2 pt-2 pb-3">
            <a href="#" className="bg-black bg-opacity-25 block rounded-md py-2 px-3 text-base font-medium text-white">Dashboard</a>
            <Link to="/vehicles"><a href="#" className="hover:bg-sky-800 rounded-md py-2 px-3 text-sm font-medium text-white">Vehicle</a></Link>
            
          </div>
          <div className="border-t border-sky-800 pt-4 pb-3">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <img className="h-10 w-10 rounded-full" src="https://th.bing.com/th/id/OIP.dsiC7a1xQd-CPZpBuMeCDgHaE8?rs=1&pid=ImgDetMain" alt="" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-white">Tom Cook</div>
                <div className="text-sm font-medium text-sky-200">tom@example.com</div>
              </div>
              <button type="button" className="ml-auto flex-shrink-0 rounded-full p-1 text-sky-200 hover:bg-sky-800 hover:text-white focus:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-sky-900">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                </svg>
              </button>
            </div>
            <div className="mt-3 space-y-1 px-2">
            <Link to="/user profile"><a className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white">Your Profile</a></Link>
              <a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white">Settings</a>
              <Link to="/signOut"><a href="#" className="block rounded-md py-2 px-3 text-base font-medium text-sky-200 hover:bg-sky-800 hover:text-white">Sign out</a></Link>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <Profile/>



        </div>

     </div>
    </>

  );
};

export default SettingsPage;

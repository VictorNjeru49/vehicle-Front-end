import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Error from './pages/Error'
import Register from './pages/Register'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import { Provider } from 'react-redux'
import { store } from './app/store'
import UserTable from './features/users/UserTable'
import SettingsPage from './pages/settings'
import VehicleTable from './features/vehicles/vehicleTable'
import VehicleList from './components/blog'
import ProfileSectioning from './settings/mainsection/bio'
import ProfileUser from './settings/mainsection/profile'
import Accounts from './settings/Accounts'
import Password from './settings/Password'
import Notifications from './settings/Notifications'
import Billing from './settings/Billing'
import Intergrations from './settings/Intergrations'
import LoginForm from './pages/login'
import Paymentslice from './features/payment/paymentslice'
import ShowTableVehicle from './features/vehicles/Showtablevehicle'
import Details from './features/vehicles/Details'
import Userbio from './settings/mainsection/userbio'
import SignOutForm from './pages/signout'
import Review from './pages/Review'
import VehicleSlice from './features/Vehiclespec/vehicleSlice'
import VehicleDetails from './features/Vehiclespec/VehicleDetails'
import ProtectedRoute from './components/authProtected/Protectedroute'
import DisplayTickets from './features/Tickets/AdminTickets'
import FleetManagement from './features/fleetmanagement/fleetSlice'
import TermsService from './features/termsSerives/TermsService'
import ManageLocations from './features/locations/location'
import PaymentInfo from './pages/paymentInfo'
import PaymentFailed from './pages/PaymentFailed'






function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element:<Home/> ,
      errorElement:<Error/> 
    },
    {
      path:'signOut',
      element:<SignOutForm/> ,
      errorElement:<Error/>
    },
    {
      path:'PaymentSucessful',
      element:<PaymentInfo/>,
      errorElement:<Error/>
    },
    {
      path: 'PaymentFailed',
      element:<PaymentFailed />,
      errorElement:<Error/>  // custom error page for 404 not found
    },
    {
      path: 'register',
      element:<Register/>,
      errorElement:<Error/>
    },
    {
      path: 'contact',
      element:<Contact/>,
      errorElement:<Error/>
    },
    {
      path:'review',
      element:<Review/>,
      errorElement:<Error/>
    },
    {
      path: 'login',
      element:<LoginForm/>, // custom login page
      errorElement:<Error/>  // custom error page
    },
    {
      path: 'blogs/:id',
      element: <Details/>
    },
    {
      path: 'blogs',
      element:<VehicleList/>,
      errorElement:<Error/>  // custom error page
    },  
    {
      path: 'userprofile',
      element:<ProtectedRoute><ProfileSectioning/></ProtectedRoute>,
      errorElement:<Error/>,  // custom error page for 404 not found
    },
    {
      path: 'vehicles',
      element:<VehicleSlice/>,
      errorElement:<Error/>  // custom error page for 404 not found
    },
    {
      path: '/vehicle/:id',
      element: <VehicleDetails />,
      errorElement:<Error/>,  // custom error page for 404 not found
    },
    {
      path: 'service',
      element:<TermsService/>,
      errorElement:<Error/>,  // custom error page for 404 not found
    },            
    {
      path: 'dashboard',
      element:<Dashboard/>,
      errorElement:<Error/>,  // custom error page

      children:[
        {
          path: 'admintable',
          element:<UserTable/>
        },
        {
          path: 'vehicle',
          element:<VehicleTable/>
        },
        {
          path: 'location',
          element:<ManageLocations/>
        },
        {
          path: 'payment',
          element:<Paymentslice/>
        },
        {
          path: 'vehiclestatus',
          element:<ShowTableVehicle/>,
        },
        {
          path: 'termsService',
          element:<TermsService/>,
        },
        {
          path: 'Tickets',
          element:<DisplayTickets/>
        },
        {
          path: 'Fleets',
          element:<FleetManagement/>,
        }
      ]
    },
  {
    path: 'Dashboard-Profile',
    element:<SettingsPage id={0} fullname={''} link={''} email={''} role={''} password={''} contact_phone={''} address={''}/>,
    errorElement:<Error/>,  // custom error page for 404 not found
      
    children:[
      {
      path: 'profile',
      element:<Userbio/>, 
    },
    {
      path: 'profileUser',
      element:<ProfileUser/>,
    },
    {
      path: 'account',
      element:<Accounts/>,
    },
    {
      path: 'password',
      element:<Password/>,
    },
    {
      path: 'notifications',
      element:<Notifications/>,
    },
    {
      path: 'billing',
      element:<Billing/>,
    },
    {
      path: 'integrations',
      element:<Intergrations/>,
    }
  ]
  }

  ])

  return (
    <>
    <Provider store={store}>
      <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App

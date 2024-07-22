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
import FormBook from './features/vehicles/form'
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
      element:<ProfileSectioning/>,
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
      path: 'bookform',
      element:<FormBook/>,
      errorElement:<Error/>,  // custom error page for 404 not found
       // custom error title for 404 not found
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
          path: 'payment',
          element:<Paymentslice/>
        },
        {
          path: 'vehiclestatus',
          element:<ShowTableVehicle/>,
        }
      ]
    },
  {
    path: 'Dashboard-Profile',
    element:<SettingsPage/>,
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

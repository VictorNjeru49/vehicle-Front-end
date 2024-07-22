import { Outlet } from "react-router-dom"
import SidebarUser from "./asidebar/sidebar"

function Profile() {
  return (
    <div>
    
    <div className="relative -mt-32">
      
  <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
    <div className="overflow-hidden rounded-lg bg-white shadow">

      <div className="flex flex-row left h-full bg-base-200 max-sm:flex-col">
        <SidebarUser/>
        

          <main>
            <Outlet/>
          </main>

          </div>
</div>
  </div>
    </div>
  
  </div>
  )
}

export default Profile
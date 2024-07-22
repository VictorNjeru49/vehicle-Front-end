import { Toaster, toast } from 'sonner'
import { useEffect } from 'react';
import { VehicleApi } from '../users/UsersAPI';


function VehicleTable() {


   const { data: vehicleData, isLoading, isError, refetch }= VehicleApi.useGetVehicleQuery(undefined,{
    pollingInterval: 3000,
    skipPollingIfUnfocused: true, 
    refetchOnReconnect: true
   })

   const [deleteVehicleProfile, { isLoading: isDeleting, data: deletemsg }]= VehicleApi.useDeleteVehicleMutation()
   
   
   useEffect(() => {
    if (!isDeleting && !deletemsg) {
        refetch();
    }
}, [isDeleting, deletemsg, refetch]);


   const handledelete= async (id: number)=>{
     //add your delete logic here
try{
  await deleteVehicleProfile(id)
  toast.success('thank you for deleting')

}catch(error){
  toast.error('Failed to delete vehicle')
}
   }
   
  return (
    <>
    <Toaster/>
    <div className='overflow-x-auto text-base-content bg-gray-700 rounded-lg'>
    <div className="overflow-x-auto">
  <table className="table table-xs text-white py-6">
    <thead>
      <tr className='text-red-400'>
        <th>Id</th>
        <th>Name</th>
        <th>rental rate</th>
        <th>availability</th>
      </tr>
    </thead>
    <tbody>
    {
        isLoading ? (<tr><td className="loading loading-spinner place-content-center">
         <div className="flex flex-col items-center justify-center h-screen">
              <span className="loading loading-bars loading-lg"></span>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading...</p>
          </div></td></tr>):(
            isError ? (
              <tr>
              <td colSpan={6}><p>No data</p>
              </td>
          </tr>
            ):(
                vehicleData && vehicleData?.map((vehicle, index)=>(
                        <tr key={index}>
                            <td>{vehicle.id}</td>
                            <td>{vehicle.userId}</td>
                            <td>{vehicle.rental_rate}</td>
                            <td>{vehicle.availability}</td>
                            <td>
                                <button className='btn btn-sm btn-outline btn-info'>update</button>
                                <button onClick={()=>handledelete(vehicle.id)} className='btn btn-sm btn-outline btn-warning'>delete</button>
                            </td>
                        </tr>
                        
                    ))
                
            )
        )
    }

    </tbody>
    <tfoot>
      <tr className='text-yellow-600'>
        <th>Id</th>
        <th>Name</th>
        <th>rental rate</th>
        <th>availability</th>
      </tr>
      <tr className='text-white'>
      <td colSpan={6}>{vehicleData ? `${vehicleData.length} records` : '0 records'}</td>
      </tr>
    </tfoot>
  </table>
    </div>
    </div>
    </>
  )
}

export default VehicleTable
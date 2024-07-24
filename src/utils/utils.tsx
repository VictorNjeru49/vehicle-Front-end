
const Rate = ((ratings: number) =>{
    if(ratings === 5){
        return <span>★★★★★</span>
    }else if(ratings === 4){
        return <span>★★★★☆</span>
    }else if(ratings === 3){
        return <span>★★★☆☆</span>
    }else if(ratings === 2){
        return <span>★★☆☆☆</span>
    }else if(ratings === 1){
        return <span>★☆☆☆☆</span>
    }else{
    return <span>☆☆☆☆☆</span>
    }})
    
    export default Rate

export const StatusVehicle=((status: string | undefined) =>{
    if(status === 'available'){
        return <span className="bg-green-600 p-1 rounded-full">Available</span>
    } else if(status === 'rented'){
        return <span className="bg-red-600 p-1 rounded-full">Rented</span>
    }else if(status === 'confirmed'){
        return <span className="bg-yellow-600 p-1 rounded-full">Confirmed</span>
    }else if(status === 'maintance'){
        return <span className="bg-blue-600 p-1 rounded-full">maintance</span>
    }
    else{
    return <span className="bg-gray-700 p-1 rounded-full dark:text-gray-300 text-white">Unknown</span>
    }})
    
export const  Availability =((state: boolean| string) => {
    if(state === true){
        return <span className="bg-green-600 p-1 rounded-full text-white">Available</span>
    } else if(state === false){
        return <span className="bg-red-600 p-1 rounded-full text-white">Unavailable</span>
    }
    else{
    return <span className="bg-gray-700 p-1 rounded-full dark:text-gray-300 text-white">Unknown</span>
    }
})
   
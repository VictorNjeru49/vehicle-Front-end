import { useForm } from "react-hook-form";
import { RegisterVehicleFormValues } from "../../types/alltypes";
import { toast } from "sonner";
import { AvailableVehicleApi } from "../users/UsersAPI";

function VehicleAvailability() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RegisterVehicleFormValues>();
  const [createAvailableVehicle, { isLoading, isError, isSuccess }] = AvailableVehicleApi.useCreateAvailableVehicleMutation();

  const onSubmit = async (data: RegisterVehicleFormValues) => {
    try {
      const response = await createAvailableVehicle(data).unwrap();
      console.log('Vehicle registered:', response);
      toast.success('Vehicle registered successfully');
      reset()
    } catch (error) {
      console.error('Failed to register vehicle:', error);
      toast.error('Failed to register vehicle');
    }
  };

  return (
    <div>
      <h1 className="align-middle text-center font-extrabold">Register Vehicle</h1>
      <form 
      className="w-1/2 m-auto border-black my-6"
      onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="link">Link</label>
          <input
            id="link"
            {...register('link', { required: 'Link is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.link && <p>{errors.link.message}</p>}
        </div>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="model">Model</label>
          <input
            id="model"
            {...register('model', { required: 'model is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.model && <p>{errors.model.message}</p>}
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            {...register('price', { required: 'Price is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <label htmlFor="mileage">Mileage</label>
          <input
            id="mileage"
            {...register('mileage', { required: 'Mileage is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.mileage && <p>{errors.mileage.message}</p>}
        </div>
        <div>
          <label htmlFor="color">Color</label>
          <input
            id="color"
            {...register('color', { required: 'Color is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.color && <p>{errors.color.message}</p>}
        </div>
        <div>
          <label htmlFor="transmission">Transmission</label>
          <input
            id="transmission"
            {...register('transmission', { required: 'Transmission is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.transmission && <p>{errors.transmission.message}</p>}
        </div>
        <div>
          <label htmlFor="year">Year</label>
          <input
            id="year"
            {...register('year', { required: 'Year is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.year && <p>{errors.year.message}</p>}
        </div>
        <div>
          <label htmlFor="engine">Engine</label>
          <input
            id="engine"
            {...register('engine', { required: 'Engine is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.engine && <p>{errors.engine.message}</p>}
        </div>
        <button type="submit" disabled={isLoading}
        className="btn btn-primary hover:btn-secondary my-4"
       >
          
          {isLoading ? 'Registering...' : 'Register Vehicle'}
        </button>
        {isError && <p>Failed to register vehicle. Please try again.</p>}
        {isSuccess && <p>Vehicle registered successfully!</p>}
      </form>


    </div>
  );
}

export default VehicleAvailability
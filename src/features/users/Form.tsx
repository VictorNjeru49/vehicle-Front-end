import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { TUser } from "../../types/alltypes";
import { RegisterApi } from "./UsersAPI";

interface FormValues extends TUser {
    confirmPassword: string;
}

function Form() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    const [registerUser, { isLoading, isError }] = RegisterApi.useRegisterUserMutation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setFullName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent)=> {
    e.preventDefault();

    const result = await registerUser({email, password});
    console.log(result);
    try{
        toast.success("User registered successfully");
        navigate('/login');
    }catch(error){
        toast.error("Failed to register user");
    }
  };
    
  const onSubmit = async (data: FormValues) => {
        console.log(data);
        if (password !== data.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const { ...userData } = data;

        try {
           const res = await registerUser(userData).unwrap();
            console.log(res);
            toast.success("User profile created successfully");
            navigate('/login');
            return '';
        } catch (error) {
            console.log(error);
            toast.error("Error creating user profile");
            toast.error("Registration failed");
        }
    };

    return (
        <>
    <div className="bg-gray-50 dark:bg-gray-900 place-content-center my-48">
    
    <Toaster/>
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create an account
                </h1> 

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 md:space-y-6" action="#">


                    <form action="#" onSubmit={()=>handleRegister}>
                    <div>
                        <label htmlFor="full_name" className="label">Full Name</label>
                        <input
                            id="full_name" placeholder="John Doe"
                            {...register("fullname", { required: "Full Name is required" })}
                            value={name}
                            onChange={(e)=>setFullName(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        />
                        {errors.fullname && <p className="text-red-500">{errors.fullname.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="email" className="label">Email</label>
                        <input
                            id="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Invalid email address"
                                }
                            })}
                             onChange={(e)=>setEmail(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required
                        />
                        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="password" className="label">Password</label>
                        <input
                            id="password" placeholder="••••••••" 
                            type="password"
                            {...register("password", { required: "Password is required" })}
                            onChange={(e)=>setPassword(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        />
                        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                        <input
                            id="confirmPassword" placeholder="••••••••" 
                            type="password"
                            {...register("confirmPassword", { required: "Confirm Password is required" })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                        />
                        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
                    </div>

                    <div>
                        <input type="hidden" name="user" role="user" />
                    </div>
                </form>


                    <div>
                        <label htmlFor="address" className="label">Address</label>
                        <input
                            id="address"
                            {...register("address", { required: "Address is required" })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="4432 Miami" required
                        />
                        {errors.address && <p className="text-red-500">{errors.address.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="contact_phone" className="label">Contact Phone</label>
                        <input
                            id="contact_phone"
                            {...register("contact_phone", { required: "Contact Phone is required" })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="1234567890" required
                        />
                        {errors.contact_phone && <p className="text-red-500">{errors.contact_phone.message}</p>}
                    </div>

                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required/>
                      </div>
                      <div className="ml-3 text-sm">
                      <Link to="/service">
                        <label id="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the 
                            <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label></Link>
                      </div>
                  </div>
                    
                    <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                        {isLoading ? "Submitting..." : "Create an account"} 
                    </button>
                    <Link to="/" className="btn btn-ghost w-full">Go back home</Link>

                  <Link to="/login"><p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p></Link>

                    {isError && <p className="text-red-500 mt-4">Error:</p>}
                </form>


        </div>
      </div>
  </div>
    </div>
        </>
    );
}

export default Form;

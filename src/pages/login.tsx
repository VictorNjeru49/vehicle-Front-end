import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../components/authProtected/auth";
import { AppDispatch } from "../app/store";
import { LoginApi } from "../features/users/UsersAPI";

interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>();
    const [loginUser, { isLoading: isUserLoading }] = LoginApi.useLoginUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await loginUser({ email: data.email, password: data.password }).unwrap();
            console.log(response)
            const { user, token } = response;
            localStorage.setItem('userRole', user.role);
            localStorage.setItem('authToken', token);
            if (user.role, token) {
                dispatch(login({ user, token }));
                toast.success("Login Successful");
                navigate(user.role === 'admin'? '/dashboard' : '/Dashboard-Profile');
            }
        } catch (error) {
            toast.error("Invalid email or password");
            
        }
        
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 place-content-center my-48">
            <Toaster />
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Login
                        </h1>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 md:space-y-6">
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required
                                />
                                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="label">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    {...register("password", { required: "Password is required" })}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="adminCheck"
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={(e) => console.log("Admin Check:", e.target.checked)}
                                />
                                <label htmlFor="adminCheck" className="label">Login as Admin</label>
                                
                            </div>

                            <button type="submit" className="btn btn-primary w-full" disabled={isUserLoading}>
                                {isUserLoading ? "Submitting..." : "Login"}
                            </button>

                            <Link to="/" className="btn btn-ghost w-full">Go back home</Link>

                            <Link to="/register">
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don't have an account? <span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register here</span>
                                </p>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

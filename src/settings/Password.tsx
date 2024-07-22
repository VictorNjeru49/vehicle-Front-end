import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { toast, Toaster } from 'sonner';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { UserApi } from '../features/users/UsersAPI';

interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
}

function Password() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<PasswordFormValues>();
  const userPass = useSelector((state: RootState) => state.auth);
  const userId = userPass.user?.id;
  const [updateUserPassword, { isLoading, isError }] = UserApi.useUpdateUserPasswordMutation();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<PasswordFormValues> = async (data) => {
    if (userId === undefined) {
      toast.error('User ID is missing. Please log in again.');
      return;
    }

    try {
      await updateUserPassword({ id: userId, password: data.newPassword }).unwrap();
      toast.success('Password updated successfully');
      reset();
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  return (
    <div className="container mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <Toaster/>
      <h1 className="text-xl font-bold mb-6">Update Your Password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="showPassword" className="text-sm">Show Password</label>
        </div>
        <div>
          <label htmlFor="currentPassword" className="block mb-2 text-sm font-medium">Current Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="currentPassword"
            {...register('currentPassword', { required: 'Current Password is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>}
        </div>
        <div>
          <label htmlFor="newPassword" className="block mb-2 text-sm font-medium">New Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            {...register('newPassword', { required: 'New Password is required' })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
          />
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>}
        </div>
        <div className="flex justify-end space-x-4">
          <button type="button" className="btn btn-secondary">Cancel</button>
          <button type="submit" disabled={isLoading} className="btn btn-primary">
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </div>
        {isError && <p className="text-red-500 text-sm mt-4">Failed to update password. Please try again.</p>}
      </form>
    </div>
  );
}

export default Password;

import { Toaster, toast } from 'sonner';
import { UserApi} from './UsersAPI';
import { useEffect, useState } from 'react';
import { TUser } from '../../types/alltypes';


function UserTable() {

    const { data: userData, isLoading, isError, refetch } = UserApi.useGetUserProfileQuery(undefined,{
        pollingInterval: 3000,
        skipPollingIfUnfocused: true, 
        refetchOnReconnect: true
    });

    const [updateUserProfile, { isLoading: isUpdating, error: updateError }] = UserApi.useUpdateUserProfileMutation();
    const [deleteUserProfile, { isLoading: isDeleting, error: deleteError }] = UserApi.useDeleteUserProfileMutation();
    const [editingUser, setEditingUser] = useState<TUser | null>(null);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!isDeleting && !deleteError) {
            refetch();
        }
    }, [isDeleting, deleteError, refetch]);

    useEffect(() => {
        if (!isUpdating && !updateError) {
            refetch();
        }
    }, [isUpdating, updateError, refetch]);


    const handleDelete = async (id: number) => {
        try {
            await deleteUserProfile(id).unwrap();
            toast.success('User profile deleted successfully');
            refetch()
        } catch (error) {
            toast.error('Error deleting user profile');
        }
    };

    const handleDisable = async(id: number)=>{
        try {
            await updateUserProfile({ id, role: 'disabled' }).unwrap();
            toast.success('User profile disabled successfully');
            refetch();
        } catch (error) {
            toast.error('Error disabling user profile');
        }
    }
    const handleUpdate = async (user: TUser) => {
        try {
            console.log(user)
            const updatedUser= { 
                id: user.id,
                fullname: user.fullname,
                role: user.role,
                link:user.link,
                address: user.address,
                contact: user.contact_phone

            }
            await updateUserProfile(updatedUser).unwrap();
            toast.success('User profile updated successfully');
            setEditingUser(null);
            setShowForm(false);
            refetch();
        } catch (error) {
            toast.error('Error updating user profile');
            
        }
    };

    const handleEditClick = (user: TUser) => {
        setEditingUser(user);
        setShowForm(true);
    };

    return (
        <>
            <Toaster />
            {showForm && editingUser && (
                <form
                    className="w-1/2 m-auto border-black my-6 justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleUpdate(editingUser);
                    }}
                >
                    <div className="flex flex-col gap-6">
                        <label htmlFor="fullname">Full Name</label>
                        <input
                            type="text"
                            id="fullname"
                            value={editingUser.fullname}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, fullname: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                        <label htmlFor="link">Images</label>
                        <input
                            type="text"
                            id="link"
                            value={editingUser.link}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, link: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />



                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={editingUser.password}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, password: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="role">Role</label>
                        <input
                            type="text" id="role"
                            value={editingUser.role}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, role: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            value={editingUser.address}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, address: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <label htmlFor="contact_phone">Contact Phone</label>
                        <input
                            type="text"
                            id="contact_phone"
                            value={editingUser.contact_phone}
                            onChange={(e) =>
                                setEditingUser({ ...editingUser, contact_phone: e.target.value })
                            }
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                        <button type="submit" className="m-auto btn btn-primary w-fit" disabled={isUpdating}>
                            {isUpdating ? "Updating..." : "Save"} 
                        </button>
                        <button type="button" className="m-auto btn btn-secondary w-fit" onClick={() => setShowForm(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            )}
            
            <div className="max-sm:flex flex-col place-content-center text-base-content bg-gray-700">
                <div className="overflow-x-auto">
                    <h2 className='align-middle text-center py-4 text-white'>Admin page</h2>

                    <div className='flex flex-row justify-between'>
                        <button onClick={refetch} className="btn btn-sm btn-primary">
                            Refresh data
                        </button>

                        <div className="flex flex-wrap gap-4">
                            <input type="search" placeholder='Search for details' />
                            <select>
                                <option value="">Name</option>
                                <option value="">Alphabetical</option>
                                <option value="">Modified</option>
                            </select>
                        </div>
                    </div>

                    <table className="table table-xs text-white">
                        <thead>
                            <tr className="text-red-400">
                                <th>Id</    th>
                                <th>Full name</th>
                                <th>Images</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Address</th>
                                <th>Contact Phone</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                <tr>
                                    <td className="loading loading-spinner place-content-center text-black">
                                        Loading
                                    </td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={8}><p>no data</p></td>
                                </tr>
                            ) : (
                                userData?.map((user: TUser, index: number) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.fullname}</td>
                                        <td><img src={user.link}/></td>
                                        <td>{user.email}</td>
                                        <td>{user.password}</td>
                                        <td>{user.role}</td>
                                        <td>{user.address}</td>
                                        <td>{user.contact_phone}</td>
                                        <td className='pr-3'>
                                            <button onClick={() => handleEditClick(user)} className="btn btn-sm btn-outline btn-info">Update</button>
                                            <button onClick={() => handleDelete(user.id)} className="btn btn-sm btn-outline btn-warning mx-6">Delete</button>
                                            <button onClick={() => handleDisable(user.id)} className='btn btn-accent'>Disable</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                        <tfoot>
                            <tr className="text-yellow-600">
                                <th>Id</th>
                                <th>Full name</th>
                                <th>Images</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Role</th>
                                <th>Address</th>
                                <th>Contact Phone</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                            <tr className="text-white">
                                <td colSpan={8}>
                                    {userData ? `${userData.length} records` : '0 records'}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    );
}

export default UserTable;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axiosClient from "/src/axios-client.js";
import { useStateContext } from "contexts/ContextProvider";
import PrimaryButton from "components/PrimaryButton";
import { PlusIcon } from '@heroicons/react/24/solid'

// Styles
import styles from 'views/Users/Users.module.css'

export default function Users() {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {setNotification} = useStateContext()

    useEffect(() => {
        getUsers();
    }, [])

    const onDelete = (u) => {
        if(!window.confirm("Are you sure you want to delete this user?")) {
            return
        }

        axiosClient.delete(`/users/${u.id}`)
            .then(() => {
                setNotification('User was successfully deleted')
                getUsers()
            })
    }

    const getUsers = () => {
        setLoading(true)
        axiosClient.get('/users')
            .then(({data}) => {
                setLoading(false)
                setUsers(data.data)
            })
            .catch(() => {
                setLoading(false)
            })
    }

    return (
    <>
        <div className="flex justify-between items-end py-6">
            <h1 className="text-4xl text-primary font-semibold font-headings px-2">Users</h1>
            <PrimaryButton to="/users/new" className="btn-add">
                <PlusIcon className="size-5"/>
                Add new
            </PrimaryButton> 
        </div>
        <div className="border border-border1 rounded-lg overflow-hidden bg-white shadow-sm">
            <table className={`${styles['users-table']}`}>
                <thead className="text-gray-800 bg-gray-100">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Create Date</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                {loading &&
                <tbody>
                    <tr>
                        <td colSpan="5" className="text-center">
                            Loading...
                        </td>
                    </tr>
                </tbody>
                }
                {!loading &&
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.created_at}</td>
                            <td>
                                <Link to={'/users/'+u.id} className="btn-edit">Edit</Link>
                                <button onClick={en => onDelete(u)} className="btn-delete">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                }
            </table>
        </div>
    </>
    )
}

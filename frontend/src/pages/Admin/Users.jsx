import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        const fetchUsers = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get("/users/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setUsers(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchUsers();

    }, []);

    return (

        <>
            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <h1>Users</h1>

                    <table>

                        <thead>

                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                            </tr>

                        </thead>

                        <tbody>

                            {users.map((user) => (

                                <tr key={user.id}>

                                    <td>{user.id}</td>

                                    <td>{user.full_name}</td>

                                    <td>{user.email}</td>

                                    <td>{user.role}</td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </>

    );

}

export default Users;
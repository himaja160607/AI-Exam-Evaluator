import { useEffect, useState } from "react";
import "./Users.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    const [editingUser, setEditingUser] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

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
const handleDelete = async (userId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setUsers(users.filter((user) => user.id !== userId));

        alert("User deleted successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to delete user.");

    }

};
const handleEdit = (user) => {

    setEditingUser(user);

    setName(user.full_name);

    setEmail(user.email);

    setRole(user.role);

};

const handleUpdate = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.put(
            `/users/${editingUser.id}`,
            {
                full_name: name,
                email: email,
                role: role
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setUsers(
            users.map((user) =>
                user.id === editingUser.id ? response.data : user
            )
        );

        setEditingUser(null);

        alert("User updated successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to update user.");

    }

};

    return (
        <>
            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <h1>Users</h1>

                    {editingUser && (

                        <div className="edit-form">

                            <h2>Edit User</h2>

                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />

                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                            />

                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <option>Admin</option>
                                <option>Examiner</option>
                                <option>Student</option>
                            </select>

                            <button onClick={handleUpdate}>
                                Update User
                            </button>

                            <button
                                onClick={() => setEditingUser(null)}
                                style={{ marginLeft: "10px" }}
                            >
                                Cancel
                            </button>

                        </div>

                    )}

                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <p>Searching for: {search}</p>

                    <table className="users-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users
                                .filter((user) => {

                                    return (
                                        user.full_name.toLowerCase().includes(search.toLowerCase()) ||
                                        user.email.toLowerCase().includes(search.toLowerCase())
                                    );

                                })
                                .map((user) => (

                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.full_name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td>
                                            <button onClick={() => handleEdit(user)}>
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleDelete(user.id)}
                                                style={{ marginLeft: "10px" }}
                                            >
                                                Delete
                                            </button>
                                        </td>
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
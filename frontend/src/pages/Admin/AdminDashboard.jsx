import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import DashboardCard from "../../components/Cards/DashboardCard";
import api from "../../services/api";
function AdminDashboard() {
    const [stats, setStats] = useState({
    total_users: 0,
    total_students: 0,
    total_examiners: 0,
    total_questions: 0
});
useEffect(() => {

    const fetchDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            console.log("Token:", token);

            const response = await api.get("/dashboard/stats", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("Dashboard Response:", response.data);

            setStats(response.data);

        } catch (error) {

            console.log("Dashboard Error:", error);

            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            }

        }

    };

    fetchDashboard();

}, []);

    return (

        <>
            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <h1>Admin Dashboard</h1>

                    <div className="cards-container">

                        <DashboardCard
                            title="Total Users"
                            value={stats.total_users}
                        />

                        <DashboardCard
                            title="Total Questions"
                            value={stats.total_questions}
                        />

                        <DashboardCard
                            title="Students"
                            value={stats.total_students}
                        />

                        <DashboardCard
                            title="Examiners"
                            value={stats.total_examiners}
                        />

                    </div>

                </div>

            </div>

        </>

    );

}

export default AdminDashboard;
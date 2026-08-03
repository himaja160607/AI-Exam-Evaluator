import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    return (

        <div className="sidebar">

            <h3>Menu</h3>

            <ul>

                <li onClick={() => navigate("/admin")}>
                    Dashboard
                </li>

                <li onClick={() => navigate("/users")}>
                    Users
                </li>

                <li onClick={() => navigate("/questions")}>
                    Question Bank
                </li>

                <li onClick={() => navigate("/exams")}>
                    Exams
                </li>

                <li>Results</li>

                <li>Settings</li>

                <li>Logout</li>

            </ul>

        </div>

    );

}

export default Sidebar;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import api from "../../services/api";

function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [role, setRole] = useState("Student");

  const handleLogin = async (event) => {

    event.preventDefault();

    try {

        const response = await api.post("/auth/login", {

            email: email,

            password: password

        });

        const token = response.data.access_token;

        const user = response.data.user;
        if (role !== user.role) {
            alert("Selected role doesn't match your account.");
            return;
        }

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("Login Successful");
        console.log(user);
        if (user.role === "Admin") {
            navigate("/admin");
        }
        else if (user.role === "Student") {
            navigate("/student");
        }
        else if (user.role === "Examiner") {
            navigate("/examiner");
        }

    }
    catch (error) {
    if (error.response) {
        console.log(error.response.data);
    } else {
        console.log(error.message);
    }
}

}
  return (
    <div className="login-container">

      <div className="login-card">

        <h1>AI Exam Evaluator</h1>

        <p className="subtitle">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Role</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option>Student</option>
            <option>Examiner</option>
            <option>Admin</option>
          </select>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import ExaminerDashboard from "./pages/Examiner/ExaminerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Admin/Users";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
            path="/admin"
            element={
                <ProtectedRoute allowedRole="Admin">
                    <AdminDashboard/>
                </ProtectedRoute>
            }
        />
        
        <Route
            path="/users"
            element={
            <ProtectedRoute allowedRole="Admin">
                <Users />
            </ProtectedRoute>
            }
        />
        <Route
            path="/student"
            element={
            <ProtectedRoute allowedRole="Student">
                <StudentDashboard />
            </ProtectedRoute>
            }
        />

        <Route
            path="/examiner"
            element={
            <ProtectedRoute allowedRole="Examiner">
                <ExaminerDashboard />
            </ProtectedRoute>
            }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
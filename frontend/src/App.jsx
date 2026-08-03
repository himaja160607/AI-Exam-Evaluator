import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import ExaminerDashboard from "./pages/Examiner/ExaminerDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import Users from "./pages/Admin/Users";
import Questions from "./pages/Admin/Questions";
import Exams from "./pages/Exam/Exams";
import AssignQuestions from "./pages/AssignQuestions/AssignQuestions";

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
            path="/questions"
            element={
                <ProtectedRoute allowedRole="Admin">
                    <Questions />
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

        <Route
            path="/exams"
            element={
                <ProtectedRoute allowedRole="Admin">
                    <Exams />
                </ProtectedRoute>
            }
        />

        <Route
            path="/assign-questions"
            element={
                <ProtectedRoute allowedRole="Admin">
                    <AssignQuestions />
                </ProtectedRoute>
            }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
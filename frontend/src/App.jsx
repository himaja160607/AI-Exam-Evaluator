import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import StudentDashboard from "./pages/Student/StudentDashboard";
import ExaminerDashboard from "./pages/Examiner/ExaminerDashboard";

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
          element={<AdminDashboard />}
        />

        <Route
          path="/student"
          element={<StudentDashboard />}
        />

        <Route
          path="/examiner"
          element={<ExaminerDashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
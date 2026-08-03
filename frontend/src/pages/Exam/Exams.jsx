import { useEffect, useState } from "react";
import "./Exams.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

function Exams() {

    const [exams, setExams] = useState([]);
    const [title, setTitle] = useState("");
    const [subject, setSubject] = useState("");
    const [duration, setDuration] = useState("");
    const [totalMarks, setTotalMarks] = useState("");
    const [editingExam, setEditingExam] = useState(null);

    useEffect(() => {

        const fetchExams = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get("/exams/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setExams(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchExams();

    }, []);

    const handleAddExam = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.post(
            "/exams/",
            {
                title,
                subject,
                duration: Number(duration),
                total_marks: Number(totalMarks)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setExams([...exams, response.data]);

        setTitle("");
        setSubject("");
        setDuration("");
        setTotalMarks("");

        alert("Exam created successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to create exam.");

    }

};

const handleEditExam = (exam) => {

    setEditingExam(exam);

    setTitle(exam.title);
    setSubject(exam.subject);
    setDuration(exam.duration);
    setTotalMarks(exam.total_marks);

};

const handleUpdateExam = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.put(
            `/exams/${editingExam.id}`,
            {
                title,
                subject,
                duration: Number(duration),
                total_marks: Number(totalMarks)
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setExams(
            exams.map((exam) =>
                exam.id === editingExam.id ? response.data : exam
            )
        );

        setEditingExam(null);

        setTitle("");
        setSubject("");
        setDuration("");
        setTotalMarks("");

        alert("Exam updated successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to update exam.");

    }

};

const handleDeleteExam = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this exam?"
    );

    if (!confirmDelete) return;

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/exams/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setExams(exams.filter((exam) => exam.id !== id));

        alert("Exam deleted successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to delete exam.");

    }

};

    return (

        <>
            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <h1>Exam Management</h1>

                    <div className="form-container">

                        <input
                            type="text"
                            placeholder="Exam Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Duration (minutes)"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        />

                        <input
                            type="number"
                            placeholder="Total Marks"
                            value={totalMarks}
                            onChange={(e) => setTotalMarks(e.target.value)}
                        />

                        <button
                            onClick={
                                editingExam
                                    ? handleUpdateExam
                                    : handleAddExam
                            }
                        >
                            {editingExam ? "Update Exam" : "Add Exam"}
                        </button>

                        {editingExam && (
                            <button
                                onClick={() => {
                                    setEditingExam(null);
                                    setTitle("");
                                    setSubject("");
                                    setDuration("");
                                    setTotalMarks("");
                                }}
                                style={{ marginLeft: "10px" }}
                            >
                                Cancel
                            </button>
                        )}

                    </div>

                    <table className="users-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Title</th>
                                <th>Subject</th>
                                <th>Duration</th>
                                <th>Total Marks</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {exams.map((exam) => (

                                <tr key={exam.id}>

                                    <td>{exam.id}</td>

                                    <td>{exam.title}</td>

                                    <td>{exam.subject}</td>

                                    <td>{exam.duration} mins</td>

                                    <td>{exam.total_marks}</td>

                                    <td>

                                        <button
                                            onClick={() => handleEditExam(exam)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteExam(exam.id)}
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

export default Exams;
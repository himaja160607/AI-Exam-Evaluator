import { useEffect, useState } from "react";
import "./AssignQuestions.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

function AssignQuestions() {

    const [exams, setExams] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [selectedExam, setSelectedExam] = useState("");

    useEffect(() => {

        const fetchData = async () => {

            try {

                const token = localStorage.getItem("token");

                const examResponse = await api.get("/exams/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const questionResponse = await api.get("/questions/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setExams(examResponse.data);
                setQuestions(questionResponse.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchData();

    }, []);

const handleAssignQuestion = async (questionId) => {

    if (!selectedExam) {

        alert("Please select an exam first.");
        return;

    }

    try {

        const token = localStorage.getItem("token");

        await api.post(
            "/exam-questions/",
            {
                exam_id: Number(selectedExam),
                question_id: questionId
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        alert("Question assigned successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to assign question.");

    }

};

    return (

        <>
            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <h1>Assign Questions to Exam</h1>

                    <select
                        value={selectedExam}
                        onChange={(e) => setSelectedExam(e.target.value)}
                    >

                        <option value="">Select an Exam</option>

                        {exams.map((exam) => (

                            <option
                                key={exam.id}
                                value={exam.id}
                            >
                                {exam.title}
                            </option>

                        ))}

                    </select>

                    <table className="users-table">

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Question</th>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Difficulty</th>
                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {questions.map((question) => (

                                <tr key={question.id}>

                                    <td>{question.id}</td>

                                    <td>{question.question}</td>

                                    <td>{question.subject}</td>

                                    <td>{question.marks}</td>

                                    <td>{question.difficulty}</td>

                                    <td>

                                        <button
                                            onClick={() => handleAssignQuestion(question.id)}
                                        >
                                            Assign
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

export default AssignQuestions;
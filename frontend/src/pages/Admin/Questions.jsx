import { useEffect, useState } from "react";
import "./Questions.css";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import api from "../../services/api";

function Questions() {

    const [questions, setQuestions] = useState([]);
    const [search, setSearch] = useState("");
    const [question, setQuestion] = useState("");
    const [subject, setSubject] = useState("");
    const [marks, setMarks] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");

    const [optionA, setOptionA] = useState("");
    const [optionB, setOptionB] = useState("");
    const [optionC, setOptionC] = useState("");
    const [optionD, setOptionD] = useState("");

    const [correctAnswer, setCorrectAnswer] = useState("A");
    const [editingQuestion, setEditingQuestion] = useState(null);

    useEffect(() => {

        const fetchQuestions = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await api.get("/questions/", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setQuestions(response.data);

            } catch (error) {

                console.log(error);

            }

        };

        fetchQuestions();

    }, []);

    const handleAddQuestion = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.post(
            "/questions/",
            {
                question: question,
                option_a: optionA,
                option_b: optionB,
                option_c: optionC,
                option_d: optionD,
                correct_answer: correctAnswer,
                marks: Number(marks),
                difficulty: difficulty,
                subject: subject
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setQuestions([...questions, response.data]);

        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setSubject("");
        setMarks("");
        setDifficulty("Easy");
        setCorrectAnswer("A");

        alert("Question added successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to add question.");

    }

};

const handleDeleteQuestion = async (questionId) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this question?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const token = localStorage.getItem("token");

        await api.delete(`/questions/${questionId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setQuestions(
            questions.filter((question) => question.id !== questionId)
        );

        alert("Question deleted successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to delete question.");

    }

};

const handleEditQuestion = (questionData) => {

    setEditingQuestion(questionData);

    setQuestion(questionData.question);

    setOptionA(questionData.option_a);

    setOptionB(questionData.option_b);

    setOptionC(questionData.option_c);

    setOptionD(questionData.option_d);

    setSubject(questionData.subject);

    setMarks(questionData.marks);

    setDifficulty(questionData.difficulty);

    setCorrectAnswer(questionData.correct_answer);

};

const handleUpdateQuestion = async () => {

    try {

        const token = localStorage.getItem("token");

        const response = await api.put(
            `/questions/${editingQuestion.id}`,
            {
                question: question,
                option_a: optionA,
                option_b: optionB,
                option_c: optionC,
                option_d: optionD,
                correct_answer: correctAnswer,
                marks: Number(marks),
                difficulty: difficulty,
                subject: subject
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setQuestions(
            questions.map((q) =>
                q.id === editingQuestion.id ? response.data : q
            )
        );

        setEditingQuestion(null);

        setQuestion("");
        setOptionA("");
        setOptionB("");
        setOptionC("");
        setOptionD("");
        setSubject("");
        setMarks("");
        setDifficulty("Easy");
        setCorrectAnswer("A");

        alert("Question updated successfully!");

    } catch (error) {

        console.log(error);

        alert("Failed to update question.");

    }

};

    return (

        <>
            <Navbar />

            <div className="dashboard-container">

                <Sidebar />

                <div className="dashboard-content">

                    <h1>Question Bank</h1>

                    <h2>Add New Question</h2>

                    <input
                        type="text"
                        placeholder="Enter Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Option A"
                        value={optionA}
                        onChange={(e) => setOptionA(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Option B"
                        value={optionB}
                        onChange={(e) => setOptionB(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Option C"
                        value={optionC}
                        onChange={(e) => setOptionC(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Option D"
                        value={optionD}
                        onChange={(e) => setOptionD(e.target.value)}
                    />

                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Marks"
                        value={marks}
                        onChange={(e) => setMarks(e.target.value)}
                    />

                    <select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>

                    <select
                        value={correctAnswer}
                        onChange={(e) => setCorrectAnswer(e.target.value)}
                    >
                        <option value="A">Option A</option>
                        <option value="B">Option B</option>
                        <option value="C">Option C</option>
                        <option value="D">Option D</option>
                    </select>

                    <button
                        onClick={
                            editingQuestion
                                ? handleUpdateQuestion
                                : handleAddQuestion
                        }
                    >
                        {editingQuestion ? "Update Question" : "Add Question"}
                    </button>   

                    {editingQuestion && (

                        <button
                            onClick={() => {

                                setEditingQuestion(null);

                                setQuestion("");
                                setOptionA("");
                                setOptionB("");
                                setOptionC("");
                                setOptionD("");
                                setSubject("");
                                setMarks("");
                                setDifficulty("Easy");
                                setCorrectAnswer("A");

                            }}
                            style={{ marginLeft: "10px" }}
                        >
                            Cancel
                        </button>

                    )}

                    <input
                        type="text"
                        placeholder="Search questions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>
                                <th>Question</th>
                                <th>Subject</th>
                                <th>Marks</th>
                                <th>Difficulty</th>
                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {questions
                            .filter((question) =>
                                question.question.toLowerCase().includes(search.toLowerCase()) ||
                                question.subject.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((question) => (

                                <tr key={question.id}>

                                    <td>{question.id}</td>

                                    <td>{question.question}</td>

                                    <td>{question.subject}</td>

                                    <td>{question.marks}</td>

                                    <td>{question.difficulty}</td>

                                    <td>
                                        <button
                                            onClick={() => handleEditQuestion(question)}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDeleteQuestion(question.id)}
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

export default Questions;
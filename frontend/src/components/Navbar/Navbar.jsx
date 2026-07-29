import "./Navbar.css";

function Navbar() {

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <nav className="navbar">

            <h2>AI Exam Evaluator</h2>

            <div className="navbar-right">

                <span>
                    Welcome, {user?.full_name}
                </span>

                <button>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default Navbar;
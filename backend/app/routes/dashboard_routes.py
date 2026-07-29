from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.models.question import Question
from app.auth.role_checker import RoleChecker

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)

admin_only = RoleChecker(["Admin"])


@router.get("/stats")
def dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    total_users = db.query(User).count()

    total_students = db.query(User).filter(
        User.role == "Student"
    ).count()

    total_examiners = db.query(User).filter(
        User.role == "Examiner"
    ).count()

    total_questions = db.query(Question).count()

    return {
        "total_users": total_users,
        "total_students": total_students,
        "total_examiners": total_examiners,
        "total_questions": total_questions
    }
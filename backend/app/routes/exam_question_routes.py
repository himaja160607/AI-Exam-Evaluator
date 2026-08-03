from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.question import Question

from app.database.session import get_db
from app.auth.role_checker import RoleChecker
from app.models.exam_question import ExamQuestion
from app.schemas.exam_question_schema import (
    ExamQuestionCreate,
    ExamQuestionResponse
)

router = APIRouter(
    prefix="/exam-questions",
    tags=["Exam Questions"]
)

admin_examiner = RoleChecker(["Admin", "Examiner"])


@router.post("/", response_model=ExamQuestionResponse)
def assign_question(
    data: ExamQuestionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    # Check if this question is already assigned to this exam
    existing = (
        db.query(ExamQuestion)
        .filter(
            ExamQuestion.exam_id == data.exam_id,
            ExamQuestion.question_id == data.question_id
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Question is already assigned to this exam."
        )

    assignment = ExamQuestion(
        exam_id=data.exam_id,
        question_id=data.question_id
    )

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return assignment
@router.get("/{exam_id}")
def get_exam_questions(
    exam_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    questions = (
        db.query(Question)
        .join(
            ExamQuestion,
            Question.id == ExamQuestion.question_id
        )
        .filter(
            ExamQuestion.exam_id == exam_id
        )
        .all()
    )

    return questions

@router.delete("/{assignment_id}")
def remove_question(
    assignment_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    assignment = (
        db.query(ExamQuestion)
        .filter(ExamQuestion.id == assignment_id)
        .first()
    )

    if not assignment:
        raise HTTPException(
            status_code=404,
            detail="Assignment not found"
        )

    db.delete(assignment)
    db.commit()

    return {
        "message": "Question removed from exam successfully"
    }
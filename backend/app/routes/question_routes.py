from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.question import Question
from app.schemas.question_schema import (
    QuestionCreate,
    QuestionResponse
)
from app.auth.dependencies import get_current_user
from app.auth.role_checker import RoleChecker

router = APIRouter(
    prefix="/questions",
    tags=["Question Bank"]
)

admin_examiner = RoleChecker(["Admin", "Examiner"])


@router.post("/", response_model=QuestionResponse)
def create_question(
    question: QuestionCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    new_question = Question(
        question=question.question,

        option_a=question.option_a,
        option_b=question.option_b,
        option_c=question.option_c,
        option_d=question.option_d,

        correct_answer=question.correct_answer,

        marks=question.marks,

        difficulty=question.difficulty,

        subject=question.subject,

        created_by=current_user.id
    )

    db.add(new_question)
    db.commit()
    db.refresh(new_question)

    return new_question
@router.get("/", response_model=list[QuestionResponse])
def get_all_questions(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    questions = db.query(Question).all()

    return questions
@router.get("/{question_id}", response_model=QuestionResponse)
def get_question_by_id(
    question_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    question = db.query(Question).filter(
        Question.id == question_id
    ).first()

    if not question:
        raise HTTPException(
            status_code=404,
            detail="Question not found"
        )

    return question
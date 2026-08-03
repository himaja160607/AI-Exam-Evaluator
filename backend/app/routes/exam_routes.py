from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.exam import Exam
from app.schemas.exam_schema import (
    ExamCreate,
    ExamUpdate,
    ExamResponse
)
from app.auth.role_checker import RoleChecker

router = APIRouter(
    prefix="/exams",
    tags=["Exams"]
)

admin_examiner = RoleChecker(["Admin", "Examiner"])


@router.post("/", response_model=ExamResponse)
def create_exam(
    exam: ExamCreate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    new_exam = Exam(
        title=exam.title,
        subject=exam.subject,
        duration=exam.duration,
        total_marks=exam.total_marks
    )

    db.add(new_exam)
    db.commit()
    db.refresh(new_exam)

    return new_exam
@router.get("/", response_model=list[ExamResponse])
def get_all_exams(
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    exams = db.query(Exam).all()

    return exams

@router.get("/{exam_id}", response_model=ExamResponse)
def get_exam_by_id(
    exam_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    exam = db.query(Exam).filter(
        Exam.id == exam_id
    ).first()

    if not exam:
        raise HTTPException(
            status_code=404,
            detail="Exam not found"
        )

    return exam

@router.put("/{exam_id}", response_model=ExamResponse)
def update_exam(
    exam_id: int,
    updated_exam: ExamUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    exam = db.query(Exam).filter(
        Exam.id == exam_id
    ).first()

    if not exam:
        raise HTTPException(
            status_code=404,
            detail="Exam not found"
        )

    exam.title = updated_exam.title
    exam.subject = updated_exam.subject
    exam.duration = updated_exam.duration
    exam.total_marks = updated_exam.total_marks

    db.commit()
    db.refresh(exam)

    return exam

@router.delete("/{exam_id}")
def delete_exam(
    exam_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_examiner)
):

    exam = db.query(Exam).filter(
        Exam.id == exam_id
    ).first()

    if not exam:
        raise HTTPException(
            status_code=404,
            detail="Exam not found"
        )

    db.delete(exam)
    db.commit()

    return {
        "message": "Exam deleted successfully"
    }
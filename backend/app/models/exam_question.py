from sqlalchemy import Column, Integer, ForeignKey

from app.database.base import Base


class ExamQuestion(Base):

    __tablename__ = "exam_questions"

    id = Column(Integer, primary_key=True, index=True)

    exam_id = Column(
        Integer,
        ForeignKey("exams.id", ondelete="CASCADE")
    )

    question_id = Column(
        Integer,
        ForeignKey("question_bank.id", ondelete="CASCADE")
    )
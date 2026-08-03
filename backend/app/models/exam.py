from sqlalchemy import Column, Integer, String
from app.database.base import Base


class Exam(Base):

    __tablename__ = "exams"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False)

    subject = Column(String, nullable=False)

    duration = Column(Integer, nullable=False)

    total_marks = Column(Integer, nullable=False)
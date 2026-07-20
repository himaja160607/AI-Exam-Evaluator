from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship

from app.database.base import Base


class Question(Base):
    __tablename__ = "question_bank"

    id = Column(Integer, primary_key=True, index=True)

    question = Column(Text, nullable=False)

    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)

    correct_answer = Column(String, nullable=False)

    marks = Column(Integer, default=1)

    difficulty = Column(String, nullable=False)

    subject = Column(String, nullable=False)

    created_by = Column(
        Integer,
        ForeignKey("users.id")
    )

    creator = relationship("User")
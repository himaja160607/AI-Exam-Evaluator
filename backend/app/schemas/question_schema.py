from pydantic import BaseModel


class QuestionCreate(BaseModel):
    question: str

    option_a: str
    option_b: str
    option_c: str
    option_d: str

    correct_answer: str

    marks: int

    difficulty: str

    subject: str
class QuestionUpdate(BaseModel):
    question: str

    option_a: str
    option_b: str
    option_c: str
    option_d: str

    correct_answer: str

    marks: int

    difficulty: str

    subject: str

class QuestionResponse(BaseModel):
    id: int

    question: str

    option_a: str
    option_b: str
    option_c: str
    option_d: str

    correct_answer: str

    marks: int

    difficulty: str

    subject: str

    created_by: int

    class Config:
        from_attributes = True
from pydantic import BaseModel


class ExamQuestionCreate(BaseModel):
    exam_id: int
    question_id: int


class ExamQuestionResponse(BaseModel):
    id: int
    exam_id: int
    question_id: int

    class Config:
        from_attributes = True
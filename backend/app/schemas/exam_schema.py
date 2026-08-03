from pydantic import BaseModel


class ExamCreate(BaseModel):
    title: str
    subject: str
    duration: int
    total_marks: int


class ExamUpdate(BaseModel):
    title: str
    subject: str
    duration: int
    total_marks: int


class ExamResponse(BaseModel):
    id: int
    title: str
    subject: str
    duration: int
    total_marks: int

    class Config:
        from_attributes = True
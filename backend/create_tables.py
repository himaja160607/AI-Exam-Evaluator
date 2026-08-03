from app.database.connection import engine
from app.database.base import Base

# Import all models
from app.models.user import User
from app.models.question import Question
from app.models.exam import Exam

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")
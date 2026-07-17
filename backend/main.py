from fastapi import FastAPI

from app.auth.routes import router as auth_router

app = FastAPI(
    title="AI Proctored Examination Platform",
    description="Backend API for AI Proctored Examination Platform",
    version="1.0.0"
)

app.include_router(auth_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Proctored Examination Platform"
    }
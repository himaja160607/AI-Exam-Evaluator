from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.question_routes import router as question_router
from app.auth.routes import router as auth_router
from app.routes.dashboard_routes import router as dashboard_router
from app.routes.user_routes import router as user_router

app = FastAPI(
    title="AI Proctored Examination Platform",
    description="Backend API for AI Proctored Examination Platform",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(question_router)
app.include_router(dashboard_router)
app.include_router(user_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AI Proctored Examination Platform"
    }
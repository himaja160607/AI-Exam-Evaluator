from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.auth.dependencies import get_current_user
from app.database.session import get_db
from app.models.user import User
from app.schemas.user_schema import (
    UserCreate,
    UserResponse,
    UserLogin
)
from app.security.password import (
    hash_password,
    verify_password
)
from app.security.jwt_handler import create_access_token
from app.auth.role_checker import RoleChecker

router = APIRouter(prefix="/auth", tags=["Authentication"])
admin_only = RoleChecker(["Admin"])
examiner_only = RoleChecker(["Examiner"])
student_only = RoleChecker(["Student"])

# ---------------- REGISTER ---------------- #

@router.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        role=user.role.value
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    access_token = create_access_token(
        data={
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "role": db_user.role
        }
    }
@router.get("/me")
def get_my_profile(current_user: User = Depends(get_current_user)):
    return {
        "id": current_user.id,
        "full_name": current_user.full_name,
        "email": current_user.email,
        "role": current_user.role
    }
@router.get("/admin/dashboard")
def admin_dashboard(
    current_user=Depends(admin_only)
):
    return {
        "message": f"Welcome Admin {current_user.full_name}"
    }


@router.get("/examiner/dashboard")
def examiner_dashboard(
    current_user=Depends(examiner_only)
):
    return {
        "message": f"Welcome Examiner {current_user.full_name}"
    }


@router.get("/student/dashboard")
def student_dashboard(
    current_user=Depends(student_only)
):
    return {
        "message": f"Welcome Student {current_user.full_name}"
    }
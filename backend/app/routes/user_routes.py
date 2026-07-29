from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.auth.role_checker import RoleChecker
from app.schemas.user_schema import UserListResponse

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)

admin_only = RoleChecker(["Admin"])


@router.get("/", response_model=list[UserListResponse])
def get_all_users(
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    users = db.query(User).all()

    return users
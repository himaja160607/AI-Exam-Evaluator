from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User
from app.auth.role_checker import RoleChecker
from app.schemas.user_schema import UserListResponse, UserUpdate

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


@router.delete("/{user_id}")
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    db.delete(user)
    db.commit()

    return {
        "message": "User deleted successfully"
    }

@router.put("/{user_id}", response_model=UserListResponse)
def update_user(
    user_id: int,
    updated_user: UserUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(admin_only)
):

    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.full_name = updated_user.full_name
    user.email = updated_user.email
    user.role = updated_user.role

    db.commit()
    db.refresh(user)

    return user
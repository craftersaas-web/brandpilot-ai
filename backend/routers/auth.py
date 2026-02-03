"""
Authentication router for GEO-Sight
Handles user registration, login, and token management
"""
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
from typing import Optional
import secrets
import hashlib

# In production, use proper libraries:
# from passlib.context import CryptContext
# from jose import JWTError, jwt

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# Configuration
SECRET_KEY = "your-secret-key-change-in-production"  # Change this!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


# ============ Pydantic Models ============

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: str
    name: Optional[str]
    role: str
    tier: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class PasswordChange(BaseModel):
    current_password: str
    new_password: str


class ProfileUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None


# ============ In-Memory User Store (Replace with DB) ============

# Simple password hashing (use passlib in production)
def hash_password(password: str) -> str:
    return hashlib.sha256((password + SECRET_KEY).encode()).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return hash_password(plain_password) == hashed_password


def generate_token() -> str:
    return secrets.token_urlsafe(32)


# In-memory storage (replace with database)
users_db: dict = {
    "demo@geosight.ai": {
        "id": 1,
        "email": "demo@geosight.ai",
        "password_hash": hash_password("demo123"),
        "name": "Demo User",
        "role": "user",
        "tier": "pro",
        "is_active": True,
        "created_at": datetime.utcnow(),
    },
    "admin@geosight.ai": {
        "id": 2,
        "email": "admin@geosight.ai",
        "password_hash": hash_password("admin123"),
        "name": "Admin User",
        "role": "admin",
        "tier": "agency",
        "is_active": True,
        "created_at": datetime.utcnow(),
    },
}

tokens_db: dict = {}  # token -> email
next_user_id = 3


# ============ Helper Functions ============

def get_user_by_email(email: str) -> Optional[dict]:
    return users_db.get(email)


def get_user_by_token(token: str) -> Optional[dict]:
    email = tokens_db.get(token)
    if email:
        return users_db.get(email)
    return None


async def get_current_user(token: str = Depends(oauth2_scheme)) -> dict:
    user = get_user_by_token(token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.get("is_active"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is suspended",
        )
    return user


async def get_current_admin(user: dict = Depends(get_current_user)) -> dict:
    if user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin access required",
        )
    return user


# ============ Routes ============

@router.post("/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    """Register a new user."""
    global next_user_id
    
    # Check if user exists
    if get_user_by_email(user_data.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    
    # Validate password
    if len(user_data.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters",
        )
    
    # Create user
    new_user = {
        "id": next_user_id,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "name": user_data.name or user_data.email.split("@")[0],
        "role": "user",
        "tier": "free",
        "is_active": True,
        "created_at": datetime.utcnow(),
    }
    
    users_db[user_data.email] = new_user
    next_user_id += 1
    
    # Generate token
    token = generate_token()
    tokens_db[token] = user_data.email
    
    return TokenResponse(
        access_token=token,
        user=UserResponse(**new_user),
    )


@router.post("/login", response_model=TokenResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """Login with email and password."""
    user = get_user_by_email(form_data.username)
    
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if not user.get("is_active"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is suspended",
        )
    
    # Generate token
    token = generate_token()
    tokens_db[token] = form_data.username
    
    return TokenResponse(
        access_token=token,
        user=UserResponse(**user),
    )


@router.post("/login/json", response_model=TokenResponse)
async def login_json(credentials: UserLogin):
    """Login with JSON body (for frontend compatibility)."""
    user = get_user_by_email(credentials.email)
    
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    if not user.get("is_active"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Account is suspended",
        )
    
    # Generate token
    token = generate_token()
    tokens_db[token] = credentials.email
    
    return TokenResponse(
        access_token=token,
        user=UserResponse(**user),
    )


@router.post("/logout")
async def logout(current_user: dict = Depends(get_current_user)):
    """Logout and invalidate the current token."""
    # Find and remove the token
    email = current_user["email"]
    tokens_to_remove = [t for t, e in tokens_db.items() if e == email]
    for token in tokens_to_remove:
        del tokens_db[token]
    
    return {"message": "Successfully logged out"}


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    """Get current user profile."""
    return UserResponse(**current_user)


@router.put("/me", response_model=UserResponse)
async def update_profile(
    profile: ProfileUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update current user profile."""
    email = current_user["email"]
    
    if profile.name:
        users_db[email]["name"] = profile.name
    
    if profile.email and profile.email != email:
        # Check if new email is taken
        if get_user_by_email(profile.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already in use",
            )
        # Update email (move user to new key)
        user_data = users_db.pop(email)
        user_data["email"] = profile.email
        users_db[profile.email] = user_data
        
        # Update token mapping
        for token, user_email in tokens_db.items():
            if user_email == email:
                tokens_db[token] = profile.email
    
    return UserResponse(**users_db.get(profile.email or email))


@router.post("/change-password")
async def change_password(
    data: PasswordChange,
    current_user: dict = Depends(get_current_user),
):
    """Change user password."""
    email = current_user["email"]
    
    if not verify_password(data.current_password, current_user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect",
        )
    
    if len(data.new_password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="New password must be at least 6 characters",
        )
    
    users_db[email]["password_hash"] = hash_password(data.new_password)
    
    return {"message": "Password changed successfully"}


@router.get("/api-key")
async def get_api_key(current_user: dict = Depends(get_current_user)):
    """Get or generate API key for the user."""
    if current_user["tier"] == "free":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="API access requires Pro or Agency plan",
        )
    
    email = current_user["email"]
    
    if "api_key" not in users_db[email] or not users_db[email]["api_key"]:
        users_db[email]["api_key"] = f"gs_live_{secrets.token_hex(24)}"
    
    return {"api_key": users_db[email]["api_key"]}


@router.post("/api-key/regenerate")
async def regenerate_api_key(current_user: dict = Depends(get_current_user)):
    """Regenerate API key for the user."""
    if current_user["tier"] == "free":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="API access requires Pro or Agency plan",
        )
    
    email = current_user["email"]
    users_db[email]["api_key"] = f"gs_live_{secrets.token_hex(24)}"
    
    return {"api_key": users_db[email]["api_key"]}


# ============ Admin Routes ============

@router.get("/admin/users")
async def list_users(
    skip: int = 0,
    limit: int = 50,
    admin: dict = Depends(get_current_admin),
):
    """List all users (admin only)."""
    users_list = list(users_db.values())
    return {
        "total": len(users_list),
        "users": [
            UserResponse(**u) for u in users_list[skip : skip + limit]
        ],
    }


@router.put("/admin/users/{user_id}/tier")
async def update_user_tier(
    user_id: int,
    tier: str,
    admin: dict = Depends(get_current_admin),
):
    """Update user tier (admin only)."""
    if tier not in ["free", "pro", "agency"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid tier",
        )
    
    for email, user in users_db.items():
        if user["id"] == user_id:
            users_db[email]["tier"] = tier
            return {"message": f"User tier updated to {tier}"}
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
    )


@router.put("/admin/users/{user_id}/status")
async def update_user_status(
    user_id: int,
    is_active: bool,
    admin: dict = Depends(get_current_admin),
):
    """Suspend or activate user (admin only)."""
    for email, user in users_db.items():
        if user["id"] == user_id:
            users_db[email]["is_active"] = is_active
            status_text = "activated" if is_active else "suspended"
            return {"message": f"User {status_text}"}
    
    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail="User not found",
    )

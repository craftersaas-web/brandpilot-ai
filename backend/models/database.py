"""
Database models for GEO-Sight
"""
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text, JSON, ForeignKey, Float, Enum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from datetime import datetime
import enum

Base = declarative_base()


class UserTier(str, enum.Enum):
    FREE = "free"
    PRO = "pro"
    AGENCY = "agency"


class UserRole(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"


class User(Base):
    """User accounts."""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    name = Column(String(255))
    role = Column(String(20), default=UserRole.USER.value)
    tier = Column(String(20), default=UserTier.FREE.value)
    is_active = Column(Boolean, default=True)
    email_verified = Column(Boolean, default=False)
    
    # Subscription info
    stripe_customer_id = Column(String(255))
    subscription_status = Column(String(50))  # active, canceled, past_due
    subscription_end_date = Column(DateTime)
    
    # OAuth providers
    google_id = Column(String(255), unique=True)
    
    # API access
    api_key = Column(String(255), unique=True)
    api_requests_count = Column(Integer, default=0)
    api_requests_reset_at = Column(DateTime)
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    last_login_at = Column(DateTime)
    
    # Relationships
    brands = relationship("Brand", back_populates="user", cascade="all, delete-orphan")
    audits = relationship("Audit", back_populates="user", cascade="all, delete-orphan")


class Brand(Base):
    """User's brand information."""
    __tablename__ = "brands"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String(255), nullable=False, index=True)
    url = Column(String(500))
    industry = Column(String(255))
    description = Column(Text)
    social_links = Column(JSON, default=dict)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    user = relationship("User", back_populates="brands")
    audits = relationship("Audit", back_populates="brand", cascade="all, delete-orphan")


class Audit(Base):
    """Audit run records."""
    __tablename__ = "audits"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    brand_id = Column(Integer, ForeignKey("brands.id"), nullable=True)  # Optional for quick audits
    brand_name = Column(String(255))  # Store brand name for quick audits
    industry = Column(String(255))
    visibility_score = Column(Integer, default=0)  # 0-100
    chatgpt_mentioned = Column(Boolean, default=False)
    gemini_mentioned = Column(Boolean, default=False)
    perplexity_mentioned = Column(Boolean, default=False)
    overall_sentiment = Column(String(20))  # positive, neutral, negative
    status = Column(String(20), default="pending")  # pending, running, completed, failed
    duration_seconds = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime)
    
    # Relationships
    user = relationship("User", back_populates="audits")
    brand = relationship("Brand", back_populates="audits")
    mentions = relationship("Mention", back_populates="audit", cascade="all, delete-orphan")
    citation_gaps = relationship("CitationGap", back_populates="audit", cascade="all, delete-orphan")
    hallucination_alerts = relationship("HallucinationAlert", back_populates="audit", cascade="all, delete-orphan")


class Mention(Base):
    """AI mentions with sentiment analysis."""
    __tablename__ = "mentions"
    
    id = Column(Integer, primary_key=True, index=True)
    audit_id = Column(Integer, ForeignKey("audits.id"), nullable=False)
    source = Column(String(50), nullable=False)  # chatgpt, gemini, perplexity
    query_type = Column(String(50))  # industry, reputation, comparison
    query = Column(Text, nullable=False)
    response_text = Column(Text)
    brand_mentioned = Column(Boolean, default=False)
    mention_context = Column(Text)  # The specific text where brand is mentioned
    sentiment = Column(String(20))  # positive, neutral, negative
    sentiment_score = Column(Float)  # -1.0 to 1.0
    competitors_mentioned = Column(JSON, default=list)
    citations = Column(JSON, default=list)
    is_mock = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    audit = relationship("Audit", back_populates="mentions")


class CitationGap(Base):
    """Missing citation opportunities."""
    __tablename__ = "citation_gaps"
    
    id = Column(Integer, primary_key=True, index=True)
    audit_id = Column(Integer, ForeignKey("audits.id"), nullable=False)
    platform = Column(String(100))  # Reddit, G2, TechCrunch, etc.
    url = Column(String(500))
    competitor_mentioned = Column(String(255))
    context = Column(Text)
    pitch_template = Column(Text)
    priority = Column(String(20))  # high, medium, low
    status = Column(String(20), default="pending")  # pending, addressed, dismissed
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    audit = relationship("Audit", back_populates="citation_gaps")


class HallucinationAlert(Base):
    """Incorrect facts detected about the brand."""
    __tablename__ = "hallucination_alerts"
    
    id = Column(Integer, primary_key=True, index=True)
    audit_id = Column(Integer, ForeignKey("audits.id"), nullable=False)
    source = Column(String(50))  # chatgpt, gemini, perplexity
    incorrect_claim = Column(Text)
    correct_information = Column(Text)
    severity = Column(String(20))  # critical, major, minor
    correction_draft = Column(Text)
    status = Column(String(20), default="pending")  # pending, submitted, resolved
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    audit = relationship("Audit", back_populates="hallucination_alerts")

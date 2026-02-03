"""
GEO-Sight Pro Backend - FastAPI Application
Advanced Generative Engine Optimization Auditor
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
from routers import audit_router, schema_router
from routers.auth import router as auth_router
from routers.enhanced_audit import router as enhanced_audit_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events."""
    # Startup
    print("[STARTUP] GEO-Sight Pro Backend starting...")
    print(f"[DB] Database: {settings.DATABASE_URL}")
    print(f"[API] OpenAI: {'Configured' if settings.OPENAI_API_KEY else 'Mock mode'}")
    print(f"[API] Google AI: {'Configured' if settings.GOOGLE_AI_API_KEY else 'Mock mode'}")
    print(f"[API] Perplexity: {'Configured' if settings.PERPLEXITY_API_KEY else 'Mock mode'}")
    print("[AUTH] Authentication: Enabled")
    print("[GEO] Enhanced Audit Engine: Ready")
    yield
    # Shutdown
    print("[SHUTDOWN] GEO-Sight Pro Backend shutting down...")


app = FastAPI(
    title="GEO-Sight Pro API",
    description="Advanced Generative Engine Optimization Auditor - Complete AI visibility platform with autopilot solutions",
    version="2.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(enhanced_audit_router)
app.include_router(audit_router)
app.include_router(schema_router)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "name": "GEO-Sight Pro API",
        "version": "2.0.0",
        "description": "Advanced Generative Engine Optimization Auditor",
        "features": [
            "Multi-platform visibility analysis",
            "Citation gap detection",
            "Autopilot content generation",
            "Schema markup studio",
            "Competitor intelligence",
            "Hallucination defense"
        ],
        "docs": "/docs",
        "health": "/api/health"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "ok",
        "version": "2.0.0",
        "services": {
            "audit_engine": "ready",
            "citation_builder": "ready",
            "content_engine": "ready",
            "schema_studio": "ready"
        },
        "api_status": {
            "openai": "configured" if settings.OPENAI_API_KEY else "mock_mode",
            "google_ai": "configured" if settings.GOOGLE_AI_API_KEY else "mock_mode",
            "perplexity": "configured" if settings.PERPLEXITY_API_KEY else "mock_mode"
        },
        "auth": "enabled"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG
    )

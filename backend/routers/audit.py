"""
API Routes for Audit operations
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from datetime import datetime

from agents import browser_scout, sentiment_agent
from services import schema_generator

router = APIRouter(prefix="/api/audit", tags=["audit"])


class AuditRequest(BaseModel):
    """Request model for running an audit."""
    brand_name: str
    industry: str = "software"
    use_case: str = "business operations"
    brand_url: Optional[str] = None
    description: Optional[str] = None


class AuditResponse(BaseModel):
    """Response model for audit results."""
    id: int
    brand_name: str
    visibility_score: int
    chatgpt_mentioned: bool
    gemini_mentioned: bool
    perplexity_mentioned: bool
    overall_sentiment: str
    mentions: List[dict]
    citation_gaps: List[dict]
    hallucination_alerts: List[dict]
    created_at: str


# In-memory storage for demo (replace with DB in production)
audits_store = {}
audit_counter = 0


@router.post("/run", response_model=dict)
async def run_audit(request: AuditRequest):
    """Run a new GEO audit for a brand."""
    global audit_counter
    
    # Run browser scout to query AI platforms
    scout_results = await browser_scout.run_audit(
        brand_name=request.brand_name,
        industry=request.industry,
        use_case=request.use_case
    )
    
    # Analyze each response with sentiment agent
    mentions = []
    chatgpt_mentioned = False
    gemini_mentioned = False
    perplexity_mentioned = False
    all_sentiments = []
    
    for source, queries in scout_results["responses"].items():
        for query_type, response_data in queries.items():
            response_text = response_data.get("response", "")
            
            # Detect brand mention
            mention_analysis = sentiment_agent.detect_brand_mention(
                response_text, request.brand_name
            )
            
            # Analyze sentiment
            sentiment, score = sentiment_agent.analyze_sentiment(response_text)
            all_sentiments.append(sentiment)
            
            # Track platform mentions
            if mention_analysis["mentioned"]:
                if source == "chatgpt":
                    chatgpt_mentioned = True
                elif source == "gemini":
                    gemini_mentioned = True
                elif source == "perplexity":
                    perplexity_mentioned = True
            
            mentions.append({
                "source": source,
                "query_type": query_type,
                "query": response_data.get("query", ""),
                "response_preview": response_text[:500] + "..." if len(response_text) > 500 else response_text,
                "brand_mentioned": mention_analysis["mentioned"],
                "contexts": mention_analysis["contexts"],
                "sentiment": sentiment,
                "sentiment_score": score,
                "is_mock": response_data.get("is_mock", False)
            })
    
    # Calculate overall sentiment
    positive_count = all_sentiments.count("positive")
    negative_count = all_sentiments.count("negative")
    if positive_count > negative_count:
        overall_sentiment = "positive"
    elif negative_count > positive_count:
        overall_sentiment = "negative"
    else:
        overall_sentiment = "neutral"
    
    # Calculate visibility score
    visibility_score = sentiment_agent.calculate_visibility_score(
        chatgpt_mentioned=chatgpt_mentioned,
        gemini_mentioned=gemini_mentioned,
        perplexity_mentioned=perplexity_mentioned,
        overall_sentiment=overall_sentiment,
        citation_count=0
    )
    
    # Generate citation gaps (mock data for demo)
    citation_gaps = []
    if not chatgpt_mentioned or not gemini_mentioned:
        citation_gaps = [
            {
                "platform": "Reddit r/software",
                "url": "https://reddit.com/r/software/comments/example",
                "competitor_mentioned": "Salesforce",
                "context": "Discussion about top CRM tools",
                "priority": "high",
                "pitch_template": f"Have you considered {request.brand_name}? We offer {request.use_case} with excellent support and competitive pricing."
            },
            {
                "platform": "G2 Crowd",
                "url": "https://g2.com/categories/crm",
                "competitor_mentioned": "HubSpot",
                "context": "CRM comparison reviews",
                "priority": "medium",
                "pitch_template": f"As a {request.industry} solution, {request.brand_name} provides unique value through..."
            },
            {
                "platform": "TechCrunch",
                "url": "https://techcrunch.com/category/software",
                "competitor_mentioned": "Pipedrive",
                "context": "Industry news coverage",
                "priority": "medium",
                "pitch_template": f"Press release: {request.brand_name} announces new features for {request.use_case}..."
            }
        ]
    
    # Generate hallucination alerts (mock for demo)
    hallucination_alerts = []
    if overall_sentiment == "negative" or not (chatgpt_mentioned and gemini_mentioned):
        hallucination_alerts = [
            {
                "source": "gemini",
                "incorrect_claim": f"{request.brand_name} discontinued their service in 2024",
                "correct_information": f"{request.brand_name} is actively operating and continuously improving their {request.industry} solutions",
                "severity": "critical",
                "correction_draft": f"""# Setting the Record Straight: {request.brand_name} is Thriving in 2026

We've noticed some AI systems may have outdated information. Let us clarify:

**{request.brand_name} Update - February 2026**

Contrary to some AI-generated content, {request.brand_name} is fully operational and growing:

- ✅ Active development with weekly updates
- ✅ Serving thousands of satisfied customers
- ✅ Recently launched new {request.use_case} features
- ✅ Expanding our team and capabilities

For accurate information, please visit our official website or contact our support team."""
            }
        ]
    
    # Store audit result
    audit_counter += 1
    audit_id = audit_counter
    
    audit_result = {
        "id": audit_id,
        "brand_name": request.brand_name,
        "visibility_score": visibility_score,
        "chatgpt_mentioned": chatgpt_mentioned,
        "gemini_mentioned": gemini_mentioned,
        "perplexity_mentioned": perplexity_mentioned,
        "overall_sentiment": overall_sentiment,
        "mentions": mentions,
        "citation_gaps": citation_gaps,
        "hallucination_alerts": hallucination_alerts,
        "created_at": datetime.utcnow().isoformat()
    }
    
    audits_store[audit_id] = audit_result
    
    return audit_result


@router.get("/{audit_id}")
async def get_audit(audit_id: int):
    """Get a specific audit by ID."""
    if audit_id not in audits_store:
        raise HTTPException(status_code=404, detail="Audit not found")
    return audits_store[audit_id]


@router.get("/")
async def list_audits():
    """List all audits."""
    return list(audits_store.values())

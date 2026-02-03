"""
Enhanced GEO Audit Engine for GEO-Sight Pro
Comprehensive multi-query analysis across AI platforms
"""
from dataclasses import dataclass, field
from typing import List, Dict, Optional, Any
from enum import Enum
import random
from datetime import datetime


class QueryCategory(str, Enum):
    INDUSTRY = "industry"
    REPUTATION = "reputation"
    COMPARISON = "comparison"
    PRODUCT = "product"
    RECOMMENDATION = "recommendation"
    PROBLEM_SOLVING = "problem_solving"


class Platform(str, Enum):
    CHATGPT = "chatgpt"
    GEMINI = "gemini"
    PERPLEXITY = "perplexity"
    CLAUDE = "claude"


class Sentiment(str, Enum):
    POSITIVE = "positive"
    NEUTRAL = "neutral"
    NEGATIVE = "negative"


class Priority(str, Enum):
    CRITICAL = "critical"
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


@dataclass
class QueryTemplate:
    """Template for generating audit queries"""
    category: QueryCategory
    template: str
    weight: float = 1.0


@dataclass
class PlatformMention:
    """Detailed mention from an AI platform"""
    platform: Platform
    query_category: QueryCategory
    query: str
    response_preview: str
    brand_mentioned: bool
    mention_contexts: List[str]
    sentiment: Sentiment
    sentiment_score: float  # -1.0 to 1.0
    citation_quality: int  # 0-100
    competitors_mentioned: List[str]
    citations: List[str]
    ranking_position: Optional[int]  # Position in list if applicable
    is_recommended: bool
    is_mock: bool = True


@dataclass
class CitationGap:
    """Missing citation opportunity"""
    platform: str
    url: str
    competitor_mentioned: str
    context: str
    priority: Priority
    estimated_impact: int  # 1-10
    pitch_template: str
    action_type: str  # reddit, quora, forum, blog_comment


@dataclass
class HallucinationAlert:
    """Incorrect AI-generated claim about brand"""
    platform: Platform
    incorrect_claim: str
    correct_information: str
    severity: Priority
    detected_at: datetime
    correction_draft: str
    source_suggestion: str
    report_template: str


@dataclass
class CompetitorInsight:
    """Competitor visibility analysis"""
    competitor_name: str
    visibility_score: int
    platforms_mentioned: List[Platform]
    key_strengths: List[str]
    your_advantages: List[str]
    steal_opportunities: List[str]


@dataclass
class ContentRecommendation:
    """AI-optimized content suggestion"""
    title: str
    content_type: str  # faq, comparison, how-to, stats
    priority: Priority
    estimated_impact: int
    generated_content: str
    target_queries: List[str]


@dataclass
class SchemaRecommendation:
    """Recommended JSON-LD schema"""
    schema_type: str
    priority: Priority
    generated_schema: Dict[str, Any]
    implementation_guide: str


@dataclass
class AuditResult:
    """Complete GEO audit result"""
    id: int
    brand_name: str
    industry: str
    url: Optional[str]
    
    # Core Metrics
    visibility_score: int  # 0-100
    visibility_grade: str  # A+ to F
    citation_quality_score: int  # 0-100
    sentiment_score: float  # -1.0 to 1.0
    
    # Platform Status
    chatgpt_mentioned: bool
    gemini_mentioned: bool
    perplexity_mentioned: bool
    claude_mentioned: bool
    platforms_positive: int
    
    # Detailed Data
    mentions: List[PlatformMention]
    citation_gaps: List[CitationGap]
    hallucination_alerts: List[HallucinationAlert]
    competitor_insights: List[CompetitorInsight]
    content_recommendations: List[ContentRecommendation]
    schema_recommendations: List[SchemaRecommendation]
    
    # Actions
    total_actions: int
    critical_actions: int
    completed_actions: int
    
    # Timestamps
    created_at: datetime
    completed_at: Optional[datetime]


class GEOAuditEngine:
    """
    Advanced GEO Audit Engine
    Generates comprehensive visibility analysis with actionable insights
    """
    
    QUERY_TEMPLATES: List[QueryTemplate] = [
        # Industry queries
        QueryTemplate(QueryCategory.INDUSTRY, "What are the best {industry} tools in 2026?", 2.0),
        QueryTemplate(QueryCategory.INDUSTRY, "Top {industry} solutions for businesses", 1.5),
        QueryTemplate(QueryCategory.INDUSTRY, "Recommended {industry} software companies", 1.5),
        
        # Reputation queries
        QueryTemplate(QueryCategory.REPUTATION, "What is {brand_name} known for?", 2.0),
        QueryTemplate(QueryCategory.REPUTATION, "Is {brand_name} a good company?", 1.5),
        QueryTemplate(QueryCategory.REPUTATION, "Reviews and reputation of {brand_name}", 1.0),
        
        # Comparison queries
        QueryTemplate(QueryCategory.COMPARISON, "{brand_name} vs competitors", 2.0),
        QueryTemplate(QueryCategory.COMPARISON, "Best alternatives to {brand_name}", 1.5),
        QueryTemplate(QueryCategory.COMPARISON, "How does {brand_name} compare to others?", 1.0),
        
        # Product queries
        QueryTemplate(QueryCategory.PRODUCT, "What products does {brand_name} offer?", 1.5),
        QueryTemplate(QueryCategory.PRODUCT, "{brand_name} pricing and features", 1.5),
        
        # Recommendation queries
        QueryTemplate(QueryCategory.RECOMMENDATION, "Should I use {brand_name} for my business?", 2.0),
        QueryTemplate(QueryCategory.RECOMMENDATION, "Recommend a {industry} solution", 1.5),
        
        # Problem-solving queries
        QueryTemplate(QueryCategory.PROBLEM_SOLVING, "How to solve {industry} challenges?", 1.0),
        QueryTemplate(QueryCategory.PROBLEM_SOLVING, "Best practices for {industry}", 1.0),
    ]
    
    COMPETITORS_BY_INDUSTRY = {
        "crm": ["Salesforce", "HubSpot", "Pipedrive", "Zoho CRM", "Monday.com"],
        "marketing": ["HubSpot", "Mailchimp", "ActiveCampaign", "Marketo", "Klaviyo"],
        "analytics": ["Google Analytics", "Mixpanel", "Amplitude", "Heap", "Pendo"],
        "ecommerce": ["Shopify", "WooCommerce", "BigCommerce", "Magento", "Squarespace"],
        "saas": ["Stripe", "Intercom", "Zendesk", "Slack", "Notion"],
        "software": ["Microsoft", "Adobe", "Salesforce", "Oracle", "SAP"],
        "default": ["Competitor A", "Competitor B", "Competitor C", "Competitor D"],
    }
    
    CITATION_PLATFORMS = [
        {"name": "Reddit", "type": "reddit", "url_template": "https://reddit.com/r/{subreddit}"},
        {"name": "Quora", "type": "quora", "url_template": "https://quora.com/topic/{topic}"},
        {"name": "G2 Crowd", "type": "review", "url_template": "https://g2.com/categories/{category}"},
        {"name": "Capterra", "type": "review", "url_template": "https://capterra.com/categories/{category}"},
        {"name": "TrustPilot", "type": "review", "url_template": "https://trustpilot.com/categories/{category}"},
        {"name": "Product Hunt", "type": "forum", "url_template": "https://producthunt.com/topics/{topic}"},
        {"name": "Hacker News", "type": "forum", "url_template": "https://news.ycombinator.com"},
        {"name": "Stack Overflow", "type": "forum", "url_template": "https://stackoverflow.com/questions/tagged/{tag}"},
        {"name": "LinkedIn", "type": "social", "url_template": "https://linkedin.com/search/{query}"},
        {"name": "Twitter/X", "type": "social", "url_template": "https://x.com/search?q={query}"},
    ]
    
    def __init__(self, use_real_apis: bool = False):
        self.use_real_apis = use_real_apis
    
    def get_competitors(self, industry: str) -> List[str]:
        """Get competitors for the given industry"""
        industry_lower = industry.lower()
        return self.COMPETITORS_BY_INDUSTRY.get(
            industry_lower, 
            self.COMPETITORS_BY_INDUSTRY["default"]
        )
    
    def calculate_visibility_grade(self, score: int) -> str:
        """Convert visibility score to letter grade"""
        if score >= 90: return "A+"
        if score >= 85: return "A"
        if score >= 80: return "A-"
        if score >= 75: return "B+"
        if score >= 70: return "B"
        if score >= 65: return "B-"
        if score >= 60: return "C+"
        if score >= 55: return "C"
        if score >= 50: return "C-"
        if score >= 45: return "D+"
        if score >= 40: return "D"
        if score >= 35: return "D-"
        return "F"
    
    def generate_mentions(self, brand_name: str, industry: str) -> List[PlatformMention]:
        """Generate detailed platform mentions"""
        mentions = []
        competitors = self.get_competitors(industry)
        
        for platform in Platform:
            for template in self.QUERY_TEMPLATES[:8]:  # Use first 8 templates
                query = template.template.format(
                    brand_name=brand_name,
                    industry=industry
                )
                
                # Simulate mention probability
                is_mentioned = random.random() > 0.4
                sentiment = random.choice(list(Sentiment))
                
                # Generate contextual response
                if is_mentioned:
                    contexts = [
                        f"{brand_name} is recognized as a leading solution",
                        f"Many users recommend {brand_name} for its features",
                        f"{brand_name} offers competitive pricing",
                    ]
                    response = f"Based on my analysis, {brand_name} is one of the notable options in the {industry} space. "
                    response += random.choice([
                        f"It's known for reliability and good customer support.",
                        f"Users appreciate its intuitive interface and features.",
                        f"It competes well with alternatives like {competitors[0]}.",
                    ])
                else:
                    contexts = []
                    response = f"In the {industry} market, popular options include {', '.join(competitors[:3])}. "
                    response += "Each has unique strengths depending on your needs."
                
                mentions.append(PlatformMention(
                    platform=platform,
                    query_category=template.category,
                    query=query,
                    response_preview=response[:300],
                    brand_mentioned=is_mentioned,
                    mention_contexts=contexts if is_mentioned else [],
                    sentiment=sentiment if is_mentioned else Sentiment.NEUTRAL,
                    sentiment_score=random.uniform(0.2, 0.8) if is_mentioned else 0,
                    citation_quality=random.randint(40, 90) if is_mentioned else 0,
                    competitors_mentioned=random.sample(competitors, min(3, len(competitors))),
                    citations=[],
                    ranking_position=random.randint(1, 5) if is_mentioned else None,
                    is_recommended=is_mentioned and random.random() > 0.5,
                    is_mock=True
                ))
        
        return mentions
    
    def generate_citation_gaps(self, brand_name: str, industry: str) -> List[CitationGap]:
        """Generate citation gap opportunities"""
        gaps = []
        competitors = self.get_competitors(industry)
        
        templates = {
            "reddit": f"Hey everyone! I've been using {{competitor}} but looking for alternatives. Any suggestions for {industry} tools?",
            "quora": f"What are the best {industry} solutions for small businesses in 2026?",
            "forum": f"Comparison thread: Which {industry} tool has the best ROI?",
            "blog_comment": f"Great article! I'd add that {{competitor}} users might also want to consider other options.",
        }
        
        pitches = {
            "reddit": f"Have you looked into {brand_name}? We've been using it for 6 months and the [specific feature] has been game-changing. Happy to share our experience!",
            "quora": f"Based on my experience, I'd recommend looking at {brand_name}. What sets it apart is [unique value proposition]. They also offer [key benefit] which many competitors lack.",
            "forum": f"{brand_name} has been our choice for {industry} needs. The ROI has been excellent - we saw [metric] improvement within [timeframe].",
            "blog_comment": f"Great points! {brand_name} is another option worth considering - they excel at [strength] and offer [unique feature].",
        }
        
        for i, platform_info in enumerate(self.CITATION_PLATFORMS[:8]):
            competitor = random.choice(competitors)
            action_type = platform_info["type"] if platform_info["type"] in templates else "forum"
            
            gaps.append(CitationGap(
                platform=platform_info["name"],
                url=platform_info["url_template"].format(
                    subreddit=industry.lower(),
                    topic=industry.lower(),
                    category=industry.lower(),
                    tag=industry.lower(),
                    query=brand_name
                ),
                competitor_mentioned=competitor,
                context=templates.get(action_type, templates["forum"]).format(competitor=competitor),
                priority=Priority.HIGH if i < 3 else Priority.MEDIUM if i < 6 else Priority.LOW,
                estimated_impact=random.randint(5, 10) if i < 3 else random.randint(3, 7),
                pitch_template=pitches.get(action_type, pitches["forum"]),
                action_type=action_type
            ))
        
        return gaps
    
    def generate_hallucination_alerts(self, brand_name: str, industry: str) -> List[HallucinationAlert]:
        """Generate hallucination alerts"""
        alerts = []
        
        # Common hallucination patterns
        hallucinations = [
            {
                "claim": f"{brand_name} was acquired by a larger company in 2025",
                "correct": f"{brand_name} remains an independent company and continues to grow",
                "severity": Priority.CRITICAL,
            },
            {
                "claim": f"{brand_name} discontinued their free tier",
                "correct": f"{brand_name} still offers a free tier with [features]",
                "severity": Priority.HIGH,
            },
            {
                "claim": f"{brand_name} only supports enterprise customers",
                "correct": f"{brand_name} serves businesses of all sizes, from startups to enterprise",
                "severity": Priority.MEDIUM,
            },
        ]
        
        # Randomly include 0-2 hallucinations
        num_hallucinations = random.randint(0, 2)
        selected = random.sample(hallucinations, min(num_hallucinations, len(hallucinations)))
        
        for h in selected:
            correction_draft = f"""# Clarification: {brand_name} Facts

We've noticed some AI systems may have outdated information about {brand_name}. Here's the accurate information:

## The Facts
**Incorrect:** {h["claim"]}
**Correct:** {h["correct"]}

## About {brand_name}
{brand_name} is a leading {industry} solution trusted by thousands of customers worldwide. We continue to innovate and expand our offerings.

For the latest accurate information, please visit our official website or contact our team.
"""
            
            alerts.append(HallucinationAlert(
                platform=random.choice(list(Platform)),
                incorrect_claim=h["claim"],
                correct_information=h["correct"],
                severity=h["severity"],
                detected_at=datetime.utcnow(),
                correction_draft=correction_draft,
                source_suggestion=f"Create an official blog post or press release about this topic",
                report_template=f"AI Correction Request: {brand_name} information"
            ))
        
        return alerts
    
    def generate_competitor_insights(self, brand_name: str, industry: str) -> List[CompetitorInsight]:
        """Generate competitor analysis"""
        competitors = self.get_competitors(industry)
        insights = []
        
        for competitor in competitors[:4]:
            insights.append(CompetitorInsight(
                competitor_name=competitor,
                visibility_score=random.randint(45, 85),
                platforms_mentioned=random.sample(list(Platform), random.randint(2, 4)),
                key_strengths=[
                    f"Strong brand recognition",
                    f"Active in {random.choice(['Reddit', 'Quora', 'LinkedIn'])} discussions",
                    f"Frequently cited for {random.choice(['pricing', 'features', 'support'])}",
                ],
                your_advantages=[
                    f"Better {random.choice(['pricing', 'support', 'features'])}",
                    f"More {random.choice(['flexible', 'modern', 'innovative'])} approach",
                ],
                steal_opportunities=[
                    f"Target '{competitor} alternatives' queries",
                    f"Create comparison content: {brand_name} vs {competitor}",
                    f"Respond to {competitor} complaints on social",
                ]
            ))
        
        return insights
    
    def generate_content_recommendations(self, brand_name: str, industry: str) -> List[ContentRecommendation]:
        """Generate content optimization recommendations"""
        recommendations = []
        
        content_ideas = [
            {
                "title": f"Ultimate {industry.title()} FAQ: {brand_name} Answers Your Top Questions",
                "type": "faq",
                "priority": Priority.HIGH,
                "impact": 9,
            },
            {
                "title": f"{brand_name} vs Competitors: Complete Comparison Guide 2026",
                "type": "comparison",
                "priority": Priority.HIGH,
                "impact": 8,
            },
            {
                "title": f"How to Get Started with {brand_name}: Step-by-Step Guide",
                "type": "how-to",
                "priority": Priority.MEDIUM,
                "impact": 7,
            },
            {
                "title": f"{industry.title()} Statistics: {brand_name}'s Impact on Customer Success",
                "type": "stats",
                "priority": Priority.MEDIUM,
                "impact": 7,
            },
        ]
        
        for idea in content_ideas:
            recommendations.append(ContentRecommendation(
                title=idea["title"],
                content_type=idea["type"],
                priority=idea["priority"],
                estimated_impact=idea["impact"],
                generated_content=f"[AI-generated content will appear here for: {idea['title']}]",
                target_queries=[
                    f"What is {brand_name}?",
                    f"Best {industry} tools",
                    f"{brand_name} review",
                ]
            ))
        
        return recommendations
    
    def generate_schema_recommendations(self, brand_name: str, industry: str, url: str = "") -> List[SchemaRecommendation]:
        """Generate JSON-LD schema recommendations"""
        recommendations = []
        
        # Organization Schema
        org_schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": brand_name,
            "url": url or f"https://{brand_name.lower().replace(' ', '')}.com",
            "description": f"{brand_name} is a leading {industry} solution.",
            "foundingDate": "2020",
            "industry": industry,
            "sameAs": [
                f"https://twitter.com/{brand_name.lower().replace(' ', '')}",
                f"https://linkedin.com/company/{brand_name.lower().replace(' ', '')}",
            ]
        }
        
        recommendations.append(SchemaRecommendation(
            schema_type="Organization",
            priority=Priority.HIGH,
            generated_schema=org_schema,
            implementation_guide="Add this schema to your homepage <head> section"
        ))
        
        # FAQ Schema
        faq_schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f"What is {brand_name}?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"{brand_name} is a comprehensive {industry} solution designed to help businesses achieve better results."
                    }
                },
                {
                    "@type": "Question",
                    "name": f"How much does {brand_name} cost?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"{brand_name} offers flexible pricing starting with a free tier, with premium plans for growing businesses."
                    }
                }
            ]
        }
        
        recommendations.append(SchemaRecommendation(
            schema_type="FAQPage",
            priority=Priority.HIGH,
            generated_schema=faq_schema,
            implementation_guide="Add this schema to your FAQ or About page"
        ))
        
        return recommendations
    
    def run_audit(self, brand_name: str, industry: str, url: Optional[str] = None) -> AuditResult:
        """Run a complete GEO audit"""
        
        # Generate all data
        mentions = self.generate_mentions(brand_name, industry)
        citation_gaps = self.generate_citation_gaps(brand_name, industry)
        hallucination_alerts = self.generate_hallucination_alerts(brand_name, industry)
        competitor_insights = self.generate_competitor_insights(brand_name, industry)
        content_recommendations = self.generate_content_recommendations(brand_name, industry)
        schema_recommendations = self.generate_schema_recommendations(brand_name, industry, url or "")
        
        # Calculate metrics
        mentioned_count = sum(1 for m in mentions if m.brand_mentioned)
        total_queries = len(mentions)
        
        # Visibility score based on mentions, sentiment, and citations
        base_score = (mentioned_count / total_queries) * 60 if total_queries > 0 else 0
        sentiment_bonus = sum(m.sentiment_score for m in mentions if m.brand_mentioned) / max(mentioned_count, 1) * 20
        citation_bonus = sum(m.citation_quality for m in mentions if m.brand_mentioned) / max(mentioned_count, 1) * 0.2
        
        visibility_score = min(100, int(base_score + sentiment_bonus + citation_bonus))
        
        # Platform status
        chatgpt_mentions = [m for m in mentions if m.platform == Platform.CHATGPT and m.brand_mentioned]
        gemini_mentions = [m for m in mentions if m.platform == Platform.GEMINI and m.brand_mentioned]
        perplexity_mentions = [m for m in mentions if m.platform == Platform.PERPLEXITY and m.brand_mentioned]
        claude_mentions = [m for m in mentions if m.platform == Platform.CLAUDE and m.brand_mentioned]
        
        platforms_positive = sum([
            1 if any(m.sentiment == Sentiment.POSITIVE for m in chatgpt_mentions) else 0,
            1 if any(m.sentiment == Sentiment.POSITIVE for m in gemini_mentions) else 0,
            1 if any(m.sentiment == Sentiment.POSITIVE for m in perplexity_mentions) else 0,
            1 if any(m.sentiment == Sentiment.POSITIVE for m in claude_mentions) else 0,
        ])
        
        # Count actions
        total_actions = len(citation_gaps) + len(hallucination_alerts) + len(content_recommendations) + len(schema_recommendations)
        critical_actions = sum(1 for c in citation_gaps if c.priority == Priority.CRITICAL)
        critical_actions += sum(1 for h in hallucination_alerts if h.severity == Priority.CRITICAL)
        
        return AuditResult(
            id=random.randint(1000, 9999),
            brand_name=brand_name,
            industry=industry,
            url=url,
            visibility_score=visibility_score,
            visibility_grade=self.calculate_visibility_grade(visibility_score),
            citation_quality_score=random.randint(40, 80),
            sentiment_score=sum(m.sentiment_score for m in mentions if m.brand_mentioned) / max(mentioned_count, 1),
            chatgpt_mentioned=len(chatgpt_mentions) > 0,
            gemini_mentioned=len(gemini_mentions) > 0,
            perplexity_mentioned=len(perplexity_mentions) > 0,
            claude_mentioned=len(claude_mentions) > 0,
            platforms_positive=platforms_positive,
            mentions=mentions,
            citation_gaps=citation_gaps,
            hallucination_alerts=hallucination_alerts,
            competitor_insights=competitor_insights,
            content_recommendations=content_recommendations,
            schema_recommendations=schema_recommendations,
            total_actions=total_actions,
            critical_actions=critical_actions,
            completed_actions=0,
            created_at=datetime.utcnow(),
            completed_at=datetime.utcnow()
        )


# Singleton instance
audit_engine = GEOAuditEngine()

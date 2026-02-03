"""
Enhanced Audit API Routes for GEO-Sight Pro
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
import json

# Import the audit engine
from services.geo_audit_engine import audit_engine, AuditResult

router = APIRouter(prefix="/api/audit", tags=["Audit"])


class AuditRequest(BaseModel):
    brand_name: str
    industry: str
    url: Optional[str] = None
    competitors: Optional[List[str]] = None


class QuickAuditRequest(BaseModel):
    brand_name: str
    industry: Optional[str] = "software"


def audit_result_to_dict(result: AuditResult) -> Dict[str, Any]:
    """Convert AuditResult dataclass to JSON-serializable dict"""
    return {
        "id": result.id,
        "brand_name": result.brand_name,
        "industry": result.industry,
        "url": result.url,
        "visibility_score": result.visibility_score,
        "visibility_grade": result.visibility_grade,
        "citation_quality_score": result.citation_quality_score,
        "sentiment_score": result.sentiment_score,
        "chatgpt_mentioned": result.chatgpt_mentioned,
        "gemini_mentioned": result.gemini_mentioned,
        "perplexity_mentioned": result.perplexity_mentioned,
        "claude_mentioned": result.claude_mentioned,
        "platforms_positive": result.platforms_positive,
        "mentions": [
            {
                "platform": m.platform.value,
                "query_category": m.query_category.value,
                "query": m.query,
                "response_preview": m.response_preview,
                "brand_mentioned": m.brand_mentioned,
                "mention_contexts": m.mention_contexts,
                "sentiment": m.sentiment.value,
                "sentiment_score": m.sentiment_score,
                "citation_quality": m.citation_quality,
                "competitors_mentioned": m.competitors_mentioned,
                "ranking_position": m.ranking_position,
                "is_recommended": m.is_recommended,
                "is_mock": m.is_mock,
            }
            for m in result.mentions
        ],
        "citation_gaps": [
            {
                "platform": c.platform,
                "url": c.url,
                "competitor_mentioned": c.competitor_mentioned,
                "context": c.context,
                "priority": c.priority.value,
                "estimated_impact": c.estimated_impact,
                "pitch_template": c.pitch_template,
                "action_type": c.action_type,
            }
            for c in result.citation_gaps
        ],
        "hallucination_alerts": [
            {
                "platform": h.platform.value,
                "incorrect_claim": h.incorrect_claim,
                "correct_information": h.correct_information,
                "severity": h.severity.value,
                "correction_draft": h.correction_draft,
                "source_suggestion": h.source_suggestion,
                "report_template": h.report_template,
            }
            for h in result.hallucination_alerts
        ],
        "competitor_insights": [
            {
                "competitor_name": c.competitor_name,
                "visibility_score": c.visibility_score,
                "platforms_mentioned": [p.value for p in c.platforms_mentioned],
                "key_strengths": c.key_strengths,
                "your_advantages": c.your_advantages,
                "steal_opportunities": c.steal_opportunities,
            }
            for c in result.competitor_insights
        ],
        "content_recommendations": [
            {
                "title": r.title,
                "content_type": r.content_type,
                "priority": r.priority.value,
                "estimated_impact": r.estimated_impact,
                "generated_content": r.generated_content,
                "target_queries": r.target_queries,
            }
            for r in result.content_recommendations
        ],
        "schema_recommendations": [
            {
                "schema_type": s.schema_type,
                "priority": s.priority.value,
                "generated_schema": s.generated_schema,
                "implementation_guide": s.implementation_guide,
            }
            for s in result.schema_recommendations
        ],
        "total_actions": result.total_actions,
        "critical_actions": result.critical_actions,
        "completed_actions": result.completed_actions,
        "created_at": result.created_at.isoformat(),
        "completed_at": result.completed_at.isoformat() if result.completed_at else None,
    }


@router.post("/run")
async def run_audit(request: AuditRequest):
    """
    Run a comprehensive GEO audit
    """
    try:
        result = audit_engine.run_audit(
            brand_name=request.brand_name,
            industry=request.industry,
            url=request.url
        )
        return audit_result_to_dict(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/quick")
async def quick_audit(request: QuickAuditRequest):
    """
    Run a quick audit with basic analysis
    """
    try:
        result = audit_engine.run_audit(
            brand_name=request.brand_name,
            industry=request.industry or "software"
        )
        
        # Return simplified result for quick audit
        return {
            "id": result.id,
            "brand_name": result.brand_name,
            "visibility_score": result.visibility_score,
            "visibility_grade": result.visibility_grade,
            "chatgpt_mentioned": result.chatgpt_mentioned,
            "gemini_mentioned": result.gemini_mentioned,
            "perplexity_mentioned": result.perplexity_mentioned,
            "claude_mentioned": result.claude_mentioned,
            "platforms_positive": result.platforms_positive,
            "total_actions": result.total_actions,
            "critical_actions": result.critical_actions,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Citation Generation Endpoints
class CitationRequest(BaseModel):
    brand_name: str
    industry: str
    platform: str  # reddit, quora, forum
    context: Optional[str] = None
    competitor: Optional[str] = None


@router.post("/actions/generate-citation")
async def generate_citation(request: CitationRequest):
    """
    Generate citation content for a specific platform
    """
    templates = {
        "reddit": {
            "title": f"My experience with {request.industry} tools - {request.brand_name} review",
            "content": f"""Hey everyone! 

I've been researching {request.industry} solutions for the past few months and wanted to share my findings.

After trying several options, I've been using **{request.brand_name}** and here's what I've found:

**Pros:**
- Great user experience and intuitive interface
- Excellent customer support - they actually respond quickly
- Competitive pricing compared to alternatives
- Regular updates and new features

**Cons:**
- Learning curve in the beginning (like any tool)
- Some advanced features require paid plans

Overall, I'd give it a solid 8/10. If you're looking for a reliable {request.industry} solution, definitely worth checking out.

Has anyone else used {request.brand_name}? Would love to hear your experiences!

---
*Disclosure: I'm a paying customer, not affiliated with the company.*""",
            "tips": [
                "Post in relevant subreddits like r/{} or r/startups".format(request.industry.lower()),
                "Engage with comments to boost visibility",
                "Be authentic and mention limitations too",
                "Include a disclosure if you're the brand owner"
            ]
        },
        "quora": {
            "title": f"What are the best {request.industry} tools for small businesses?",
            "content": f"""Based on my experience working with various {request.industry} solutions, I'd recommend considering **{request.brand_name}**.

Here's why it stands out:

**1. Ease of Use**
Unlike many enterprise-focused tools, {request.brand_name} is designed with simplicity in mind. You can get started in minutes without extensive training.

**2. Value for Money**
They offer a generous free tier, and their paid plans are reasonably priced compared to competitors like {request.competitor or 'other solutions'}.

**3. Feature Set**
It includes everything you need: [list key features relevant to your industry]

**4. Support Quality**
Their support team is responsive and actually helpful - not just copy-paste responses.

I've been using it for [timeframe] and have seen significant improvements in [relevant metrics].

Of course, every business has different needs. I'd recommend signing up for a free trial to see if it fits your workflow.

*Disclaimer: I'm sharing based on personal experience.*""",
            "tips": [
                "Answer questions where your brand genuinely solves the problem",
                "Be specific with examples and use cases",
                "Add relevant credentials to build trust",
                "Include comparisons when appropriate"
            ]
        },
        "forum": {
            "title": f"{request.brand_name} - Our experience after 6 months",
            "content": f"""Hi everyone,

Wanted to share our team's experience with {request.brand_name} for those researching {request.industry} solutions.

**Background:** We're a [company size] company that needed a better way to [problem statement].

**Why we chose {request.brand_name}:**
- Compared multiple options including {request.competitor or 'competitors'}
- Best balance of features and pricing for our needs
- Positive reviews from similar-sized companies

**Results after 6 months:**
- [Specific metric] improved by X%
- Team adoption was smooth
- ROI achieved within [timeframe]

**What could be better:**
- [Honest feedback]
- [Suggestion for improvement]

Happy to answer any questions about our experience!

Best,
[Your name]""",
            "tips": [
                "Share in industry-specific forums and communities",
                "Include specific metrics and results",
                "Be honest about limitations",
                "Offer to answer follow-up questions"
            ]
        },
        "linkedin": {
            "title": f"How we improved our {request.industry} workflow",
            "content": f"""🚀 3 months ago, we completely transformed our {request.industry} process.

The problem: [Describe pain point]

The solution: After evaluating several options, we implemented {request.brand_name}.

The results:
📈 [Metric 1] increased by X%
⏰ [Metric 2] improved by Y hours/week
💰 [Metric 3] - measurable ROI

What made the difference:
1. [Key feature that solved the problem]
2. [Another benefit]
3. [Third advantage]

For other leaders facing similar challenges, I'd recommend:
• Start with a clear goal
• Get team buy-in early
• Measure before and after

Have you optimized your {request.industry} workflow recently? What tools are you using?

#[Industry] #Productivity #BusinessGrowth""",
            "tips": [
                "Post during high-engagement times (Tues-Thurs, 8-10am)",
                "Use relevant hashtags",
                "Engage with comments quickly",
                "Tag relevant connections"
            ]
        }
    }
    
    platform_lower = request.platform.lower()
    template = templates.get(platform_lower, templates["forum"])
    
    return {
        "platform": request.platform,
        "title": template["title"],
        "content": template["content"],
        "tips": template["tips"],
        "estimated_impact": 7,
        "time_to_implement": "15-30 minutes"
    }


# Content Generation Endpoints
class ContentRequest(BaseModel):
    brand_name: str
    industry: str
    content_type: str  # faq, comparison, stats, how-to
    competitors: Optional[List[str]] = None


@router.post("/actions/generate-content")
async def generate_content(request: ContentRequest):
    """
    Generate AI-optimized content
    """
    content_type = request.content_type.lower()
    
    if content_type == "faq":
        content = {
            "title": f"Frequently Asked Questions About {request.brand_name}",
            "format": "FAQPage Schema Ready",
            "sections": [
                {
                    "question": f"What is {request.brand_name}?",
                    "answer": f"{request.brand_name} is a comprehensive {request.industry} solution designed to help businesses streamline their operations and achieve better results. Our platform combines powerful features with an intuitive interface, making it accessible for teams of all sizes."
                },
                {
                    "question": f"How much does {request.brand_name} cost?",
                    "answer": f"{request.brand_name} offers flexible pricing to fit different needs. We have a free tier for individuals and small teams, with premium plans starting at competitive rates. Enterprise pricing is available for larger organizations with custom requirements."
                },
                {
                    "question": f"What makes {request.brand_name} different from competitors?",
                    "answer": f"{request.brand_name} stands out through its combination of ease of use, powerful features, and excellent customer support. Unlike many alternatives, we focus on delivering value without unnecessary complexity."
                },
                {
                    "question": f"Is {request.brand_name} suitable for small businesses?",
                    "answer": f"Absolutely! {request.brand_name} is designed to scale with your business. Many of our customers started as small teams and grew with our platform. Our free tier is perfect for getting started."
                },
                {
                    "question": f"How do I get started with {request.brand_name}?",
                    "answer": f"Getting started is easy: 1) Sign up for a free account, 2) Complete the quick onboarding wizard, 3) Import your existing data if needed, 4) Start using the platform immediately. Most users are up and running within 15 minutes."
                }
            ],
            "schema": {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": []  # Will be populated from sections
            }
        }
    
    elif content_type == "comparison":
        competitors = request.competitors or ["Competitor A", "Competitor B", "Competitor C"]
        content = {
            "title": f"{request.brand_name} vs Competitors: Complete Comparison Guide 2026",
            "format": "Comparison Article",
            "introduction": f"Choosing the right {request.industry} solution can be challenging. In this comprehensive comparison, we analyze how {request.brand_name} stacks up against leading alternatives.",
            "comparison_table": {
                "headers": ["Feature", request.brand_name] + competitors[:3],
                "rows": [
                    ["Free Tier", "✅ Yes", "❌ No", "⚠️ Limited", "✅ Yes"],
                    ["Ease of Use", "⭐⭐⭐⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐"],
                    ["Customer Support", "24/7 Live Chat", "Email Only", "Business Hours", "Premium Only"],
                    ["API Access", "✅ All Plans", "Premium Only", "✅ All Plans", "Enterprise Only"],
                    ["Integrations", "100+", "50+", "75+", "30+"],
                ]
            },
            "sections": [
                {
                    "title": f"Why Choose {request.brand_name}",
                    "content": f"{request.brand_name} excels in providing a balance of powerful features and ease of use. Key advantages include intuitive interface, responsive support, and competitive pricing."
                },
                {
                    "title": "Best For Different Use Cases",
                    "content": f"• {request.brand_name}: Best for teams wanting power without complexity\n• {competitors[0]}: Best for enterprise with large budgets\n• {competitors[1]}: Best for technical users\n• {competitors[2]}: Best for basic needs"
                }
            ],
            "conclusion": f"While each solution has its merits, {request.brand_name} offers the best overall value for most businesses. Try our free tier to see if it's right for you."
        }
    
    elif content_type == "stats":
        content = {
            "title": f"{request.brand_name} by the Numbers: Impact & Success Stories",
            "format": "Statistics-Rich Content",
            "statistics": [
                {"metric": "Customer Satisfaction", "value": "94%", "context": "of customers rate their experience as excellent"},
                {"metric": "Time Saved", "value": "10+ hours/week", "context": "average time saved per user"},
                {"metric": "ROI", "value": "300%", "context": "average return on investment within first year"},
                {"metric": "Implementation Time", "value": "< 1 hour", "context": "average time to get fully operational"},
                {"metric": "Support Response", "value": "< 2 hours", "context": "average response time for support tickets"},
            ],
            "case_studies": [
                {
                    "company": "TechStartup Inc.",
                    "result": "Increased productivity by 45% within 3 months",
                    "quote": f"{request.brand_name} transformed how our team works together."
                },
                {
                    "company": "GrowthCo",
                    "result": "Reduced operational costs by 30%",
                    "quote": "The ROI was evident within the first month."
                }
            ],
            "why_stats_matter": "AI engines like ChatGPT and Perplexity prioritize content with specific, verifiable data. Including statistics increases your chance of being cited."
        }
    
    else:  # how-to
        content = {
            "title": f"How to Get Started with {request.brand_name}: Complete Guide",
            "format": "HowTo Schema Ready",
            "introduction": f"This step-by-step guide will walk you through setting up and getting the most out of {request.brand_name}.",
            "steps": [
                {
                    "step": 1,
                    "title": "Create Your Free Account",
                    "description": f"Visit {request.brand_name.lower().replace(' ', '')}.com and sign up with your email or Google account. No credit card required.",
                    "time": "2 minutes"
                },
                {
                    "step": 2,
                    "title": "Complete the Onboarding",
                    "description": "Follow the guided setup wizard to configure your workspace. This includes setting your team size, industry, and goals.",
                    "time": "5 minutes"
                },
                {
                    "step": 3,
                    "title": "Import Your Data",
                    "description": "Import existing data using our wizard, CSV upload, or API. We support migration from most popular competitors.",
                    "time": "10 minutes"
                },
                {
                    "step": 4,
                    "title": "Invite Your Team",
                    "description": "Add team members and set appropriate permissions. Our role-based access ensures everyone has what they need.",
                    "time": "3 minutes"
                },
                {
                    "step": 5,
                    "title": "Start Using Core Features",
                    "description": "Begin with the main features relevant to your workflow. Our in-app tutorials will guide you through each one.",
                    "time": "Ongoing"
                }
            ],
            "schema": {
                "@context": "https://schema.org",
                "@type": "HowTo",
                "name": f"How to Get Started with {request.brand_name}",
                "totalTime": "PT20M",
                "step": []  # Will be populated from steps
            }
        }
    
    return {
        "content_type": request.content_type,
        "generated_content": content,
        "estimated_impact": 8,
        "seo_tips": [
            "Include this content on your main website",
            "Add appropriate schema markup",
            "Link to this content from other pages",
            "Update regularly with fresh data"
        ]
    }


# Schema Generation Endpoints
class SchemaRequest(BaseModel):
    brand_name: str
    industry: str
    schema_type: str  # organization, faq, product, article, howto, review
    website_url: Optional[str] = None
    additional_data: Optional[Dict[str, Any]] = None


@router.post("/actions/generate-schema")
async def generate_schema(request: SchemaRequest):
    """
    Generate JSON-LD schema markup
    """
    schema_type = request.schema_type.lower()
    url = request.website_url or f"https://{request.brand_name.lower().replace(' ', '')}.com"
    
    schemas = {
        "organization": {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": request.brand_name,
            "url": url,
            "logo": f"{url}/logo.png",
            "description": f"{request.brand_name} is a leading {request.industry} solution helping businesses achieve better results.",
            "foundingDate": "2020",
            "founders": [{"@type": "Person", "name": "Founder Name"}],
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "City",
                "addressCountry": "US"
            },
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-xxx-xxx-xxxx",
                "contactType": "customer service",
                "availableLanguage": "English"
            },
            "sameAs": [
                f"https://twitter.com/{request.brand_name.lower().replace(' ', '')}",
                f"https://linkedin.com/company/{request.brand_name.lower().replace(' ', '')}",
                f"https://facebook.com/{request.brand_name.lower().replace(' ', '')}"
            ]
        },
        "faq": {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": f"What is {request.brand_name}?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"{request.brand_name} is a comprehensive {request.industry} solution designed to help businesses streamline operations and achieve better results."
                    }
                },
                {
                    "@type": "Question",
                    "name": f"How much does {request.brand_name} cost?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"{request.brand_name} offers flexible pricing including a free tier, with premium plans for growing businesses."
                    }
                },
                {
                    "@type": "Question",
                    "name": f"Is {request.brand_name} suitable for small businesses?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": f"Yes! {request.brand_name} is designed to scale with your business, from startups to enterprise."
                    }
                }
            ]
        },
        "product": {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": request.brand_name,
            "applicationCategory": f"{request.industry} Software",
            "operatingSystem": "Web, iOS, Android",
            "url": url,
            "description": f"{request.brand_name} - Professional {request.industry} solution for modern businesses.",
            "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "description": "Free tier available"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "500",
                "bestRating": "5",
                "worstRating": "1"
            }
        },
        "article": {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": f"Complete Guide to {request.brand_name}",
            "author": {
                "@type": "Organization",
                "name": request.brand_name
            },
            "publisher": {
                "@type": "Organization",
                "name": request.brand_name,
                "logo": {
                    "@type": "ImageObject",
                    "url": f"{url}/logo.png"
                }
            },
            "datePublished": datetime.now().strftime("%Y-%m-%d"),
            "dateModified": datetime.now().strftime("%Y-%m-%d"),
            "description": f"Everything you need to know about {request.brand_name} and how it can help your business.",
            "mainEntityOfPage": url
        },
        "howto": {
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": f"How to Get Started with {request.brand_name}",
            "description": f"Step-by-step guide to setting up and using {request.brand_name}",
            "totalTime": "PT20M",
            "step": [
                {
                    "@type": "HowToStep",
                    "name": "Create Account",
                    "text": "Sign up for a free account at our website"
                },
                {
                    "@type": "HowToStep",
                    "name": "Complete Setup",
                    "text": "Follow the onboarding wizard to configure your workspace"
                },
                {
                    "@type": "HowToStep",
                    "name": "Start Using",
                    "text": "Begin using the core features immediately"
                }
            ]
        },
        "review": {
            "@context": "https://schema.org",
            "@type": "Product",
            "name": request.brand_name,
            "description": f"{request.brand_name} - Leading {request.industry} solution",
            "brand": {
                "@type": "Brand",
                "name": request.brand_name
            },
            "review": {
                "@type": "Review",
                "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                },
                "author": {
                    "@type": "Person",
                    "name": "Happy Customer"
                },
                "reviewBody": f"{request.brand_name} has transformed how our team works. Highly recommended!"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "500"
            }
        }
    }
    
    schema = schemas.get(schema_type, schemas["organization"])
    
    return {
        "schema_type": request.schema_type,
        "generated_schema": schema,
        "implementation": f"""<script type="application/ld+json">
{json.dumps(schema, indent=2)}
</script>""",
        "instructions": [
            "Copy the schema script above",
            f"Paste it in the <head> section of your website",
            "Test using Google's Rich Results Test tool",
            "Monitor in Google Search Console"
        ],
        "where_to_add": {
            "organization": "Homepage",
            "faq": "FAQ page or About page",
            "product": "Product/pricing page",
            "article": "Blog posts",
            "howto": "Tutorial/guide pages",
            "review": "Product pages"
        }.get(schema_type, "Relevant page")
    }

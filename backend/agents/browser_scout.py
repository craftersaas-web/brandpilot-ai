"""
Browser Scout Agent - Queries AI platforms for brand information.
Uses official APIs (OpenAI, Google AI, Perplexity) for reliable access.
Includes mock data fallback for development/demo.
"""
import asyncio
from typing import Dict, List, Optional
import httpx
from config import settings
import json
import random


class BrowserScout:
    """
    Agent that queries multiple AI platforms to check brand visibility.
    Uses official APIs to avoid CAPTCHA issues.
    """
    
    # Query templates
    INDUSTRY_QUERY = "What are the top recommended {industry} tools for {use_case}?"
    REPUTATION_QUERY = "Explain the reputation of {brand_name}."
    
    # Mock responses for demo/development when API keys are not available
    MOCK_RESPONSES = {
        "chatgpt": {
            "industry": """Based on my analysis, here are the top recommended tools:

1. **Salesforce** - Enterprise CRM leader with comprehensive features
2. **HubSpot** - Great for small to mid-size businesses, excellent free tier
3. **Pipedrive** - Sales-focused CRM with intuitive pipeline management
4. **Zoho CRM** - Cost-effective with extensive customization options
5. **Monday.com** - Visual project management with CRM capabilities

Each of these offers different strengths depending on your specific needs. Salesforce excels in enterprise features, while HubSpot provides better value for growing companies.""",
            "reputation": """The company has built a solid reputation in the industry. Key points:

**Strengths:**
- Innovative product development
- Strong customer support
- Regular feature updates
- Good integration ecosystem

**Considerations:**
- Pricing can be on the higher end
- Learning curve for advanced features

Overall, they are considered reliable and trusted by many businesses in the space. The company continues to invest in product development and has shown consistent growth."""
        },
        "gemini": {
            "industry": """Here are the top tools I'd recommend:

**Enterprise Solutions:**
- Salesforce - Industry standard for large organizations
- Microsoft Dynamics 365 - Strong for Microsoft ecosystem users

**Mid-Market:**
- HubSpot - Excellent marketing and sales alignment
- Pipedrive - Sales team favorite

**Small Business:**
- Zoho CRM - Best value proposition
- Freshsales - Simple and effective

The best choice depends on your team size, budget, and specific workflow requirements.""",
            "reputation": """Based on available information:

The brand is recognized as a reputable player in the market. Users frequently mention:
- Reliable service
- Good customer experience
- Competitive pricing
- Active development

Some users have noted that the product could benefit from more advanced reporting features. However, the overall sentiment is positive, with strong reviews on platforms like G2 and Capterra."""
        },
        "perplexity": {
            "industry": """According to recent industry analysis and user reviews:

**Top Recommendations:**
1. Salesforce - 4.4/5 on G2, used by 150,000+ companies
2. HubSpot - 4.5/5 rating, particularly strong for inbound marketing
3. Pipedrive - 4.3/5, praised for ease of use
4. Zoho CRM - 4.1/5, best for budget-conscious teams

**Sources:** G2.com, Capterra, TechCrunch reviews, Reddit r/sales discussions

Each tool has different pricing tiers and feature sets that may suit different use cases.""",
            "reputation": """Based on my search of available sources:

The brand has an established presence with the following reputation indicators:

**Review Scores:**
- G2: 4.3/5 (500+ reviews)
- Capterra: 4.4/5
- TrustRadius: 8.2/10

**Key Mentions:**
- Featured in industry publications
- Active community presence
- Regular product updates

**Areas for Improvement:**
- Mobile app experience
- Documentation clarity

**Sources:** G2.com, Capterra, company blog, Reddit mentions"""
        }
    }
    
    def __init__(self):
        """Initialize the Browser Scout with API clients."""
        self.openai_key = settings.OPENAI_API_KEY
        self.google_key = settings.GOOGLE_AI_API_KEY
        self.perplexity_key = settings.PERPLEXITY_API_KEY
    
    async def query_chatgpt(self, query: str) -> Dict:
        """Query ChatGPT via OpenAI API."""
        if not self.openai_key:
            # Return mock data for demo
            query_type = "industry" if "top recommended" in query.lower() else "reputation"
            return {
                "source": "chatgpt",
                "query": query,
                "response": self.MOCK_RESPONSES["chatgpt"][query_type],
                "is_mock": True
            }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.openai_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "gpt-4o",
                        "messages": [
                            {"role": "system", "content": "You are a helpful assistant providing information about business tools and brand reputations."},
                            {"role": "user", "content": query}
                        ],
                        "max_tokens": 1000
                    },
                    timeout=30.0
                )
                data = response.json()
                return {
                    "source": "chatgpt",
                    "query": query,
                    "response": data["choices"][0]["message"]["content"],
                    "is_mock": False
                }
        except Exception as e:
            return {
                "source": "chatgpt",
                "query": query,
                "response": self.MOCK_RESPONSES["chatgpt"]["industry"],
                "is_mock": True,
                "error": str(e)
            }
    
    async def query_gemini(self, query: str) -> Dict:
        """Query Gemini via Google AI API."""
        if not self.google_key:
            query_type = "industry" if "top recommended" in query.lower() else "reputation"
            return {
                "source": "gemini",
                "query": query,
                "response": self.MOCK_RESPONSES["gemini"][query_type],
                "is_mock": True
            }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={self.google_key}",
                    json={
                        "contents": [{"parts": [{"text": query}]}]
                    },
                    timeout=30.0
                )
                data = response.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return {
                    "source": "gemini",
                    "query": query,
                    "response": text,
                    "is_mock": False
                }
        except Exception as e:
            return {
                "source": "gemini",
                "query": query,
                "response": self.MOCK_RESPONSES["gemini"]["industry"],
                "is_mock": True,
                "error": str(e)
            }
    
    async def query_perplexity(self, query: str) -> Dict:
        """Query Perplexity via their API."""
        if not self.perplexity_key:
            query_type = "industry" if "top recommended" in query.lower() else "reputation"
            return {
                "source": "perplexity",
                "query": query,
                "response": self.MOCK_RESPONSES["perplexity"][query_type],
                "is_mock": True
            }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "https://api.perplexity.ai/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.perplexity_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": "llama-3.1-sonar-small-128k-online",
                        "messages": [
                            {"role": "user", "content": query}
                        ]
                    },
                    timeout=30.0
                )
                data = response.json()
                return {
                    "source": "perplexity",
                    "query": query,
                    "response": data["choices"][0]["message"]["content"],
                    "is_mock": False,
                    "citations": data.get("citations", [])
                }
        except Exception as e:
            return {
                "source": "perplexity",
                "query": query,
                "response": self.MOCK_RESPONSES["perplexity"]["industry"],
                "is_mock": True,
                "error": str(e)
            }
    
    async def run_audit(
        self,
        brand_name: str,
        industry: str = "software",
        use_case: str = "business operations"
    ) -> Dict:
        """
        Run a complete audit across all AI platforms.
        
        Returns:
            Dict containing all responses and analysis
        """
        # Build queries
        industry_query = self.INDUSTRY_QUERY.format(industry=industry, use_case=use_case)
        reputation_query = self.REPUTATION_QUERY.format(brand_name=brand_name)
        
        # Query all platforms concurrently
        results = await asyncio.gather(
            self.query_chatgpt(industry_query),
            self.query_chatgpt(reputation_query),
            self.query_gemini(industry_query),
            self.query_gemini(reputation_query),
            self.query_perplexity(industry_query),
            self.query_perplexity(reputation_query),
        )
        
        return {
            "brand_name": brand_name,
            "industry": industry,
            "use_case": use_case,
            "responses": {
                "chatgpt": {
                    "industry": results[0],
                    "reputation": results[1]
                },
                "gemini": {
                    "industry": results[2],
                    "reputation": results[3]
                },
                "perplexity": {
                    "industry": results[4],
                    "reputation": results[5]
                }
            }
        }


# Singleton instance
browser_scout = BrowserScout()

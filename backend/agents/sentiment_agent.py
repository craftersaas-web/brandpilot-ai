"""
Sentiment Agent - Analyzes text for sentiment and brand mentions.
Uses TextBlob for local sentiment analysis (no API key required).
"""
from textblob import TextBlob
import re
from typing import Dict, List, Tuple, Optional


class SentimentAgent:
    """Analyzes sentiment of AI responses and detects brand mentions."""
    
    # Brand sentiment lexicon - words that indicate specific sentiments about brands
    POSITIVE_INDICATORS = [
        "reliable", "trusted", "best", "leading", "recommended", "popular",
        "excellent", "innovative", "efficient", "powerful", "superior",
        "top-rated", "award-winning", "industry-leading", "user-friendly",
        "highly rated", "premium", "exceptional", "outstanding", "first-choice"
    ]
    
    NEGATIVE_INDICATORS = [
        "outdated", "expensive", "complicated", "unreliable", "buggy",
        "discontinued", "closed", "out of business", "shutdown", "failed",
        "problematic", "limited", "poor", "slow", "difficult", "overpriced",
        "lacking", "behind", "struggling", "declining"
    ]
    
    NEUTRAL_INDICATORS = [
        "average", "standard", "typical", "basic", "alternative",
        "option", "competitor", "similar", "comparable", "moderate"
    ]
    
    def __init__(self):
        """Initialize the sentiment agent."""
        pass
    
    def analyze_sentiment(self, text: str) -> Tuple[str, float]:
        """
        Analyze the overall sentiment of text.
        
        Returns:
            Tuple of (sentiment_label, sentiment_score)
            - sentiment_label: "positive", "neutral", or "negative"
            - sentiment_score: -1.0 to 1.0
        """
        if not text:
            return "neutral", 0.0
        
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity  # -1 to 1
        
        # Classify based on polarity
        if polarity > 0.1:
            return "positive", polarity
        elif polarity < -0.1:
            return "negative", polarity
        else:
            return "neutral", polarity
    
    def detect_brand_mention(self, text: str, brand_name: str) -> Dict:
        """
        Detect if a brand is mentioned and extract context.
        
        Returns:
            Dict with:
            - mentioned: bool
            - contexts: List of text snippets where brand appears
            - sentiment_around_brand: sentiment specifically near brand mention
        """
        if not text or not brand_name:
            return {"mentioned": False, "contexts": [], "sentiment_around_brand": "neutral"}
        
        text_lower = text.lower()
        brand_lower = brand_name.lower()
        
        # Check for exact match or partial match
        mentioned = brand_lower in text_lower
        
        contexts = []
        brand_sentiment = "neutral"
        
        if mentioned:
            # Extract context around brand mention (100 chars before and after)
            pattern = rf'.{{0,100}}{re.escape(brand_lower)}.{{0,100}}'
            matches = re.findall(pattern, text_lower, re.IGNORECASE)
            contexts = matches
            
            # Analyze sentiment around brand mentions
            if contexts:
                combined_context = " ".join(contexts)
                brand_sentiment, _ = self.analyze_sentiment(combined_context)
        
        return {
            "mentioned": mentioned,
            "contexts": contexts,
            "sentiment_around_brand": brand_sentiment
        }
    
    def detect_competitors(self, text: str, known_competitors: List[str] = None) -> List[Dict]:
        """
        Detect competitor mentions in the text.
        
        Returns:
            List of dicts with competitor name and sentiment
        """
        if not text:
            return []
        
        competitors_found = []
        
        # If known competitors provided, search for them
        if known_competitors:
            for competitor in known_competitors:
                if competitor.lower() in text.lower():
                    sentiment, score = self.analyze_sentiment(text)
                    competitors_found.append({
                        "name": competitor,
                        "sentiment": sentiment,
                        "score": score
                    })
        
        return competitors_found
    
    def calculate_visibility_score(
        self,
        chatgpt_mentioned: bool,
        gemini_mentioned: bool,
        perplexity_mentioned: bool,
        overall_sentiment: str,
        citation_count: int = 0
    ) -> int:
        """
        Calculate the overall visibility score (0-100).
        
        Scoring breakdown:
        - ChatGPT mention: 30 points
        - Gemini mention: 30 points
        - Perplexity mention: 20 points
        - Positive sentiment: +10 points
        - Negative sentiment: -10 points
        - Citations: +2 points each (max 10)
        """
        score = 0
        
        # Platform mentions
        if chatgpt_mentioned:
            score += 30
        if gemini_mentioned:
            score += 30
        if perplexity_mentioned:
            score += 20
        
        # Sentiment modifier
        if overall_sentiment == "positive":
            score += 10
        elif overall_sentiment == "negative":
            score = max(0, score - 10)
        
        # Citation bonus
        citation_bonus = min(citation_count * 2, 10)
        score += citation_bonus
        
        return min(score, 100)
    
    def extract_lexicon_matches(self, text: str) -> Dict[str, List[str]]:
        """
        Extract specific sentiment indicators from text.
        
        Returns:
            Dict with positive, negative, and neutral matches
        """
        text_lower = text.lower()
        
        return {
            "positive": [w for w in self.POSITIVE_INDICATORS if w in text_lower],
            "negative": [w for w in self.NEGATIVE_INDICATORS if w in text_lower],
            "neutral": [w for w in self.NEUTRAL_INDICATORS if w in text_lower]
        }


# Singleton instance
sentiment_agent = SentimentAgent()

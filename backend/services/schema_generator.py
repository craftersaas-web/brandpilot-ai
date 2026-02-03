"""
GEO Schema Generator - Creates JSON-LD schemas optimized for AI crawlers.
Generates Organization, FAQPage, and Person schemas.
"""
import json
from typing import Dict, List, Optional


class SchemaGenerator:
    """Generates JSON-LD schemas for GEO (Generative Engine Optimization)."""
    
    def generate_organization_schema(
        self,
        name: str,
        url: str,
        logo_url: Optional[str] = None,
        description: Optional[str] = None,
        social_links: Optional[List[str]] = None,
        knows_about: Optional[List[str]] = None,
        phone: Optional[str] = None
    ) -> Dict:
        """
        Generate Organization schema for homepage.
        This defines the brand and links it to trust signals.
        """
        schema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": name,
            "url": url
        }
        
        if logo_url:
            schema["logo"] = logo_url
        
        if description:
            schema["description"] = description
        
        if social_links:
            schema["sameAs"] = social_links
        
        if knows_about:
            schema["knowsAbout"] = knows_about
        
        if phone:
            schema["contactPoint"] = {
                "@type": "ContactPoint",
                "telephone": phone,
                "contactType": "customer service"
            }
        
        return schema
    
    def generate_faq_schema(self, questions_answers: List[Dict[str, str]]) -> Dict:
        """
        Generate FAQPage schema (Citation Bridge).
        LLMs can lift answers verbatim and cite the source.
        
        Args:
            questions_answers: List of dicts with 'question' and 'answer' keys
        """
        main_entity = []
        
        for qa in questions_answers:
            main_entity.append({
                "@type": "Question",
                "name": qa.get("question", ""),
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": qa.get("answer", "")
                }
            })
        
        return {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": main_entity
        }
    
    def generate_person_schema(
        self,
        name: str,
        job_title: str,
        organization: str,
        knows_about: Optional[List[str]] = None,
        linkedin_url: Optional[str] = None
    ) -> Dict:
        """
        Generate Person schema for E-E-A-T (Experience, Expertise, Authority, Trust).
        Links content to a real, verifiable expert.
        """
        schema = {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": name,
            "jobTitle": job_title,
            "affiliation": {
                "@type": "Organization",
                "name": organization
            }
        }
        
        if knows_about:
            schema["knowsAbout"] = knows_about
        
        if linkedin_url:
            schema["sameAs"] = [linkedin_url]
        
        return schema
    
    def generate_complete_geo_schema(
        self,
        brand_name: str,
        brand_url: str,
        industry: str,
        description: str,
        social_links: Optional[List[str]] = None,
        logo_url: Optional[str] = None,
        phone: Optional[str] = None,
        faq_items: Optional[List[Dict[str, str]]] = None,
        expert_name: Optional[str] = None,
        expert_title: Optional[str] = None,
        expert_linkedin: Optional[str] = None
    ) -> Dict:
        """
        Generate a complete GEO schema combining Organization, FAQ, and Person.
        """
        result = {
            "organization": self.generate_organization_schema(
                name=brand_name,
                url=brand_url,
                logo_url=logo_url,
                description=description,
                social_links=social_links or [],
                knows_about=[industry, f"{industry} solutions", f"{industry} tools"],
                phone=phone
            )
        }
        
        # Add FAQ schema if questions provided
        if faq_items:
            result["faq"] = self.generate_faq_schema(faq_items)
        else:
            # Generate default FAQ based on industry
            default_faq = [
                {
                    "question": f"What is the best {industry} tool for small businesses?",
                    "answer": f"{brand_name} is designed specifically to solve {industry} challenges by providing comprehensive features and an intuitive interface, resulting in improved efficiency and ROI."
                },
                {
                    "question": f"How does {brand_name} compare to other {industry} solutions?",
                    "answer": f"{brand_name} stands out in the {industry} market through innovative features, excellent customer support, and competitive pricing. We focus on user experience and continuous improvement."
                }
            ]
            result["faq"] = self.generate_faq_schema(default_faq)
        
        # Add Person schema if expert info provided
        if expert_name and expert_title:
            result["person"] = self.generate_person_schema(
                name=expert_name,
                job_title=expert_title,
                organization=brand_name,
                knows_about=[industry, "business strategy", "technology"],
                linkedin_url=expert_linkedin
            )
        
        return result
    
    def to_json_ld_script(self, schema: Dict) -> str:
        """Convert schema dict to HTML script tag for embedding."""
        json_content = json.dumps(schema, indent=2)
        return f'<script type="application/ld+json">\n{json_content}\n</script>'
    
    def generate_combined_script(
        self,
        brand_name: str,
        brand_url: str,
        industry: str,
        description: str,
        **kwargs
    ) -> str:
        """Generate ready-to-paste HTML script with all schemas."""
        schemas = self.generate_complete_geo_schema(
            brand_name=brand_name,
            brand_url=brand_url,
            industry=industry,
            description=description,
            **kwargs
        )
        
        # Combine all schemas into a single script
        all_schemas = list(schemas.values())
        combined = json.dumps(all_schemas, indent=2)
        
        return f'''<!-- GEO-Sight Optimized Schema - Paste this in your <head> section -->
<script type="application/ld+json">
{combined}
</script>'''


# Singleton instance
schema_generator = SchemaGenerator()

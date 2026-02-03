"""
API Routes for Schema generation
"""
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List

from services import schema_generator

router = APIRouter(prefix="/api/schema", tags=["schema"])


class SchemaRequest(BaseModel):
    """Request model for schema generation."""
    brand_name: str
    brand_url: str
    industry: str
    description: str
    logo_url: Optional[str] = None
    social_links: Optional[List[str]] = None
    phone: Optional[str] = None
    expert_name: Optional[str] = None
    expert_title: Optional[str] = None
    expert_linkedin: Optional[str] = None
    faq_items: Optional[List[dict]] = None


@router.post("/generate")
async def generate_schema(request: SchemaRequest):
    """Generate JSON-LD schema for GEO optimization."""
    schemas = schema_generator.generate_complete_geo_schema(
        brand_name=request.brand_name,
        brand_url=request.brand_url,
        industry=request.industry,
        description=request.description,
        logo_url=request.logo_url,
        social_links=request.social_links,
        phone=request.phone,
        expert_name=request.expert_name,
        expert_title=request.expert_title,
        expert_linkedin=request.expert_linkedin,
        faq_items=request.faq_items
    )
    
    # Generate HTML script tag
    html_script = schema_generator.generate_combined_script(
        brand_name=request.brand_name,
        brand_url=request.brand_url,
        industry=request.industry,
        description=request.description,
        logo_url=request.logo_url,
        social_links=request.social_links,
        phone=request.phone,
        expert_name=request.expert_name,
        expert_title=request.expert_title,
        expert_linkedin=request.expert_linkedin,
        faq_items=request.faq_items
    )
    
    return {
        "schemas": schemas,
        "html_script": html_script,
        "instructions": "Paste this code into the <head> section of your website. This is the 'Digital Signature' that tells AI models exactly what your brand is."
    }


@router.post("/organization")
async def generate_organization_schema(
    name: str,
    url: str,
    description: Optional[str] = None,
    logo_url: Optional[str] = None
):
    """Generate only Organization schema."""
    schema = schema_generator.generate_organization_schema(
        name=name,
        url=url,
        logo_url=logo_url,
        description=description
    )
    return {
        "schema": schema,
        "html": schema_generator.to_json_ld_script(schema)
    }


@router.post("/faq")
async def generate_faq_schema(questions_answers: List[dict]):
    """Generate FAQPage schema (Citation Bridge)."""
    schema = schema_generator.generate_faq_schema(questions_answers)
    return {
        "schema": schema,
        "html": schema_generator.to_json_ld_script(schema)
    }

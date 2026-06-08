from datetime import datetime
from typing import Optional
from uuid import UUID
from pydantic import BaseModel, Field, ConfigDict
from app.models.opportunity import OpportunityStatus


class OpportunityCreate(BaseModel):
    title: str = Field(..., min_length=1, description="Title of the opportunity")
    description: Optional[str] = Field(default=None, description="Detailed description of the opportunity")
    source: str = Field(..., min_length=1, description="Source platform where the opportunity was discovered")
    source_url: Optional[str] = Field(default=None, description="URL pointing to the original opportunity listing")
    company_name: Optional[str] = Field(default=None, description="Name of the hiring company or client")
    location: Optional[str] = Field(default=None, description="Geographic or remote location of the opportunity")
    opportunity_type: Optional[str] = Field(default=None, description="Type of contract or employment (e.g. Contract, Part-time, Full-time)")
    posted_at: Optional[datetime] = Field(default=None, description="Timestamp when the opportunity was originally posted")
    status: OpportunityStatus = Field(default=OpportunityStatus.NEW, description="Initial workflow status of the opportunity")


class OpportunityResponse(BaseModel):
    id: UUID = Field(..., description="Unique identifier of the opportunity")
    title: str = Field(..., description="Title of the opportunity")
    description: Optional[str] = Field(default=None, description="Detailed description of the opportunity")
    source: str = Field(..., description="Source platform where the opportunity was discovered")
    source_url: Optional[str] = Field(default=None, description="URL pointing to the original opportunity listing")
    company_name: Optional[str] = Field(default=None, description="Name of the hiring company or client")
    location: Optional[str] = Field(default=None, description="Geographic or remote location of the opportunity")
    opportunity_type: Optional[str] = Field(default=None, description="Type of contract or employment (e.g. Contract, Part-time, Full-time)")
    posted_at: Optional[datetime] = Field(default=None, description="Timestamp when the opportunity was originally posted")
    collected_at: datetime = Field(..., description="Timestamp when the opportunity was gathered into the platform")
    status: OpportunityStatus = Field(..., description="Workflow status of the opportunity")

    model_config = ConfigDict(from_attributes=True)

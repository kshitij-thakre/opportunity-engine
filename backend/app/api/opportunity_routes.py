from typing import List, Optional
from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.repositories.opportunity_repository import OpportunityRepository
from app.schemas.opportunity import OpportunityResponse

router = APIRouter(prefix="/opportunities", tags=["Opportunities"])

@router.get("", response_model=List[OpportunityResponse])
def read_opportunities(source: Optional[str] = None, db: Session = Depends(get_db)):
    """Retrieve all opportunities, optionally filtered by source."""
    repo = OpportunityRepository(db)
    return repo.get_all_opportunities(source=source)

@router.get("/{opportunity_id}", response_model=OpportunityResponse)
def read_opportunity(opportunity_id: UUID, db: Session = Depends(get_db)):
    """Retrieve a single opportunity by its unique ID."""
    repo = OpportunityRepository(db)
    opportunity = repo.get_opportunity_by_id(opportunity_id)
    if not opportunity:
        raise HTTPException(status_code=404, detail="Opportunity not found")
    return opportunity

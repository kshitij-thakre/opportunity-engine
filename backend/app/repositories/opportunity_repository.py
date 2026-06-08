from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from app.db.models.opportunity import Opportunity

class OpportunityRepository:
    def __init__(self, db: Session):
        self.db = db

    def create_opportunity(self, opportunity_data: dict) -> Opportunity:
        """Creates a new opportunity record."""
        db_opp = Opportunity(**opportunity_data)
        self.db.add(db_opp)
        self.db.commit()
        self.db.refresh(db_opp)
        return db_opp

    def get_opportunity_by_id(self, opportunity_id: UUID) -> Optional[Opportunity]:
        """Fetch opportunity by ID."""
        return self.db.query(Opportunity).filter(Opportunity.id == opportunity_id).first()

    def get_all_opportunities(self) -> List[Opportunity]:
        """Return all opportunities."""
        return self.db.query(Opportunity).all()

    def update_opportunity(self, opportunity_id: UUID, update_data: dict) -> Optional[Opportunity]:
        """Update an existing opportunity."""
        db_opp = self.get_opportunity_by_id(opportunity_id)
        if not db_opp:
            return None
        
        for key, value in update_data.items():
            if hasattr(db_opp, key):
                setattr(db_opp, key, value)
                
        self.db.commit()
        self.db.refresh(db_opp)
        return db_opp

    def delete_opportunity(self, opportunity_id: UUID) -> bool:
        """Delete an opportunity."""
        db_opp = self.get_opportunity_by_id(opportunity_id)
        if not db_opp:
            return False
        
        self.db.delete(db_opp)
        self.db.commit()
        return True

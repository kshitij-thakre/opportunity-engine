import uuid
from sqlalchemy import Column, String, Text, DateTime, Enum, func
from sqlalchemy.dialects.postgresql import UUID

# Import Base from our database configuration
from app.db.database import Base
# Import the domain status enum
from app.models.opportunity import OpportunityStatus

class Opportunity(Base):
    __tablename__ = "opportunities"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    source = Column(String, nullable=False, index=True)
    source_url = Column(String, nullable=True)
    company_name = Column(String, nullable=True)
    location = Column(String, nullable=True)
    opportunity_type = Column(String, nullable=True)
    posted_at = Column(DateTime(timezone=True), nullable=True, index=True)
    collected_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    status = Column(
        Enum(OpportunityStatus, name="opportunitystatus"),
        nullable=False,
        default=OpportunityStatus.NEW,
        index=True
    )
    created_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now())
    updated_at = Column(DateTime(timezone=True), nullable=False, server_default=func.now(), onupdate=func.now())

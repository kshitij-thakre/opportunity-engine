import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Load DATABASE_URL from environment variable
# Fallback to localhost:5433 which maps to the PostgreSQL docker container port on the host
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://opportunity_engine:opportunity_engine@localhost:5433/opportunity_engine"
)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

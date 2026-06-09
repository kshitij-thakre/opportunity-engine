from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import opportunity_router

app = FastAPI(
    title="Opportunity Engine API",
    description="Backend services for the Opportunity Engine discovery platform.",
    version="0.1.0",
)

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Broad for Phase 0 dev; scope down in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(opportunity_router)


@app.get("/health")
async def health_check():
    return {
        "status": "ok"
    }

# Opportunity Engine

Automated opportunity discovery and qualification platform designed for freelancers, boutique agencies, and MSMEs to identify and convert client opportunities.

## Table of Contents
- [Mission](#mission)
- [Tech Stack](#tech-stack)
- [Repository Structure](#repository-structure)
- [Local Setup Instructions](#local-setup-instructions)
- [Docker Instructions](#docker-instructions)
- [System Architecture](#system-architecture)
- [Roadmap](#roadmap)

## Mission
Our mission is to democratize lead generation and client acquisition for small service businesses. By automating the scraping, indexing, qualification, and initial proposal crafting processes, we enable small firms to bid effectively and efficiently, saving time and closing more deals.

## Tech Stack
- **Frontend**: Next.js 15+ (App Router), TypeScript, TailwindCSS
- **Backend**: FastAPI (Python 3.12+), Uvicorn
- **Database**: PostgreSQL (v16)
- **DevOps**: Docker, Docker Compose, GitHub Actions CI

## Repository Structure
```text
opportunity-engine/
├── .github/workflows/       # GitHub CI workflows
├── backend/                # FastAPI application
├── crawler/                # Data crawler scripts (placeholder)
├── database/               # Database migrations & schemas (placeholder)
├── docs/                   # Product & technical documentation
├── frontend/               # Next.js React application
└── docker-compose.yml      # Docker multi-service container orchestration
```

## Local Setup Instructions

### Prerequisites
- Node.js (v22+)
- Python (v3.12+)
- PostgreSQL (v16+)

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will be running at [http://localhost:3000](http://localhost:3000).

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Set up a Python virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Copy the environment template:
   ```bash
   cp .env.example .env
   ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Start the API server:
   ```bash
   uvicorn main:app --reload --port 8100
   ```
   The backend health check is available at [http://localhost:8100/health](http://localhost:8100/health).

## Docker Instructions

The entire platform foundation can be orchestrated seamlessly using Docker.

### Running with Docker Compose
1. Ensure Docker Desktop is installed and running.
2. From the root directory, build and run the services:
   ```bash
   docker compose up --build
   ```
3. Services will be available at:
   - **Frontend**: [http://localhost:3100](http://localhost:3100)
   - **Backend Health Check**: [http://localhost:8100/health](http://localhost:8100/health)
   - **PostgreSQL**: Bound to host port `5433` (e.g. `postgresql://opportunity_engine:opportunity_engine@localhost:5433/opportunity_engine`)

To stop the containers, use:
```bash
docker compose down
```

## System Architecture
For detailed flow descriptions, see the [architecture.md](docs/architecture.md) document.
```text
Browser ➔ Next.js Frontend (Port 3100) ➔ FastAPI Backend (Port 8100) ➔ PostgreSQL (Port 5433)
```

## Roadmap
For the development timeline and upcoming phases, refer to our [roadmap.md](docs/roadmap.md) document.

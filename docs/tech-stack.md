# Opportunity Engine - Tech Stack

This document details the components of the core technology stack for the Opportunity Engine.

## Frontend
- **Framework**: Next.js (App Router)
  - Selected for server-side rendering (SSR), search engine optimization (SEO), and fast load times.
- **Language**: TypeScript
  - For static typing, type safety, and interface design between backend and frontend.
- **Styling**: TailwindCSS & Vanilla CSS
  - Utility-first CSS framework combined with modern CSS techniques for rapid, responsive layout development.

## Backend
- **Framework**: FastAPI
  - High performance, automatic OpenAPI schema generation, and asynchronous support in Python.
- **Runtime**: Python 3.12+
  - Clean syntax, robust standard library, and standard ecosystem for data scraping/crawling.
- **Task Runner**: Uvicorn
  - Asynchronous ASGI server for running FastAPI.

## Database & Storage
- **Primary Database**: PostgreSQL
  - Relational database choice for structured data, robust indexing, transaction safety, and support for JSONB fields.
- **Database Driver / ORM**: SQLAlchemy / AsyncPG
  - Type-safe, asynchronous database connectivity.

## Infrastructure & DevOps
- **Containerization**: Docker & Docker Compose
  - Consistent developer environments and multi-container orchestration.
- **CI/CD**: GitHub Actions
  - Automates build validation, static checks, linting, and integration runs.

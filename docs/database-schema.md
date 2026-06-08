# Database Schema Documentation

This document describes the PostgreSQL database schema for the Opportunity Discovery Platform.

## Tables

### `opportunities`

Stores collected opportunities from various sources (Reddit, YC Jobs, etc.).

| Field Name | Type | Nullable | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | No | Primary Key. Unique identifier of the opportunity. |
| `title` | `VARCHAR` | No | Title of the opportunity. |
| `description` | `TEXT` | Yes | Detailed description of the opportunity. |
| `source` | `VARCHAR` | No | Source platform where the opportunity was discovered (Indexed). |
| `source_url` | `VARCHAR` | Yes | URL pointing to the original opportunity listing. |
| `company_name` | `VARCHAR` | Yes | Name of the hiring company or client. |
| `location` | `VARCHAR` | Yes | Geographic or remote location of the opportunity. |
| `opportunity_type` | `VARCHAR` | Yes | Type of contract or employment (e.g., Contract, Part-time, Full-time). |
| `posted_at` | `TIMESTAMP WITH TIME ZONE` | Yes | Timestamp when the opportunity was originally posted (Indexed). |
| `collected_at` | `TIMESTAMP WITH TIME ZONE` | No | Timestamp when the opportunity was gathered into the platform. Default: `NOW()`. |
| `status` | `opportunitystatus` (ENUM) | No | Workflow status of the opportunity (Indexed). Default: `NEW`. values: `NEW`, `REVIEWED`, `CONTACTED`, `ARCHIVED`. |
| `created_at` | `TIMESTAMP WITH TIME ZONE` | No | Audit timestamp indicating database row creation time. Default: `NOW()`. |
| `updated_at` | `TIMESTAMP WITH TIME ZONE` | No | Audit timestamp indicating database row last updated time. Default: `NOW()` (automatic on updates). |

### Indexes

The following indexes are defined on the `opportunities` table to optimize query performance:

1. `ix_opportunities_source`: B-tree index on the `source` column. Optimizes filtering/grouping by platform sources.
2. `ix_opportunities_posted_at`: B-tree index on the `posted_at` column. Optimizes time-series sorting and filtering.
3. `ix_opportunities_status`: B-tree index on the `status` column. Optimizes workflow queues filtering.

---

## Schema Migrations (Alembic)

Database schema updates are managed using Alembic. 

### Migration Commands

Make sure to activate your virtual environment and navigate to the `backend` directory first:
```bash
cd backend
source .venv/bin/activate
```

#### Run Migrations
To run all outstanding migrations to the latest revision:
```bash
alembic upgrade head
```

#### Rollback Migration
To revert the last run migration:
```bash
alembic downgrade -1
```

#### Create a New Migration
To auto-generate a new migration script based on SQLAlchemy models changes:
```bash
alembic revision --autogenerate -m "description_of_changes"
```

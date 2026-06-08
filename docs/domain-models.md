# Domain Models

This document outlines the core domain entities used throughout the Opportunity Engine platform.

## OpportunityStatus (Enum)
Represents the current lifecycle stage of a discovered opportunity in the system.

| Value | Description |
| :--- | :--- |
| `NEW` | A newly discovered opportunity that has not yet been processed or qualified. |
| `REVIEWED` | The opportunity has been evaluated by the qualification rules or manually inspected. |
| `CONTACTED` | Outreach or application has been initiated for this opportunity. |
| `ARCHIVED` | The opportunity has been closed, rejected, or hidden from active view. |

## Opportunity (Model)
Represents a unified opportunity discovered from external sources (e.g., Reddit, YC Jobs, Wellfound).

| Field | Type | Required | Description | Validation / Default |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | Yes | Unique system identifier for the opportunity. | Must be a valid UUID. |
| `title` | `str` | Yes | Headline or title of the opportunity. | Minimum length: 1 character. |
| `description` | `str` | No | Full details, description, or body text of the listing. | Defaults to `None`. |
| `source` | `str` | Yes | Platform source name (e.g., "reddit", "yc_jobs", "wellfound"). | Minimum length: 1 character. |
| `source_url` | `str` | No | URL to the original listing source page. | Defaults to `None`. |
| `company_name` | `str` | No | Name of the company/client offering the opportunity. | Defaults to `None`. |
| `location` | `str` | No | Specific location or if the job is remote. | Defaults to `None`. |
| `opportunity_type` | `str` | No | Type of work arrangement (e.g., Contract, Part-Time, Full-Time). | Defaults to `None`. |
| `posted_at` | `datetime` | No | Original posting time from the source. | Defaults to `None`. |
| `collected_at` | `datetime` | Yes | Timestamp when the opportunity was indexed by our crawler. | Automatically populated. |
| `status` | `OpportunityStatus` | Yes | Current workflow state of the opportunity. | Defaults to `OpportunityStatus.NEW`. |

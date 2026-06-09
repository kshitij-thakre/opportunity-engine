import os
import sys

# Ensure the backend directory is in the path to resolve imports correctly
sys.path.insert(0, "/Users/kshitijthakre/Apps/opportunity-engine/backend")

from app.connectors.reddit_connector import RedditConnector
from app.db.database import SessionLocal
from app.repositories.opportunity_repository import OpportunityRepository

def run_collection():
    print("Starting Reddit Opportunity Collection MVP...")
    
    # Configured target subreddits
    target_subreddits = ["forhire", "freelance", "startups"]
    connector = RedditConnector(subreddits=target_subreddits)
    
    # Collect up to 5 posts per subreddit for verification
    opportunities = connector.collect_all(limit=5)
    
    print(f"\nCollection finished. Live opportunities collected: {len(opportunities)}")
    
    # If live collection was blocked or failed, run validation with mock data
    if not opportunities:
        print("\n[!] Live Reddit fetch was blocked (e.g. HTTP 403) or returned 0 posts.")
        print("Executing fallback verification using mock Reddit JSON feed...")
        
        mock_feed = {
            "kind": "Listing",
            "data": {
                "children": [
                    {
                        "kind": "t3",
                        "data": {
                            "title": "[Hiring] Python Backend Engineer for API Service",
                            "selftext": "We need a backend developer to build and maintain our integration pipelines using Python.",
                            "permalink": "/r/forhire/comments/xyz/python_job/",
                            "created_utc": 1672531200.0,
                            "stickied": False
                        }
                    },
                    {
                        "kind": "t3",
                        "data": {
                            "title": "Pinned guidelines (Should be skipped by filter)",
                            "selftext": "Please read rules before posting.",
                            "permalink": "/r/forhire/comments/abc/rules/",
                            "created_utc": 1672531100.0,
                            "stickied": True
                        }
                    },
                    {
                        "kind": "t3",
                        "data": {
                            "title": "Looking for UI/UX Freelancer for landing page",
                            "selftext": "Need a clean landing page designed for our new project.",
                            "permalink": "/r/freelance/comments/def/uiux_design/",
                            "created_utc": 1672531300.0,
                            "stickied": False
                        }
                    }
                ]
            }
        }
        
        # Test mapping and filtering on mock data
        try:
            children = mock_feed.get("data", {}).get("children", [])
            for child in children:
                post_data = child.get("data", {})
                if post_data.get("stickied") or not post_data.get("title"):
                    continue
                opportunity = connector.map_post_to_opportunity(post_data)
                opportunities.append(opportunity)
            print(f"✓ Mock verification complete. Parsed and mapped opportunities: {len(opportunities)}")
        except Exception as e:
            print(f"Failed to process mock data: {e}")
            
    # Persist opportunities to the database
    if opportunities:
        print("\n--- Saving Opportunities to Database ---")
        db = SessionLocal()
        repo = OpportunityRepository(db)
        
        inserted_count = 0
        skipped_count = 0
        
        try:
            for opp in opportunities:
                # Check for duplicate by source_url
                if opp.source_url:
                    existing = repo.find_by_source_url(opp.source_url)
                    if existing:
                        print(f"Skipped duplicate opportunity: {opp.title} ({opp.source_url})")
                        skipped_count += 1
                        continue
                
                # Insert if not duplicate
                repo.create_opportunity(opp.model_dump())
                print(f"Stored new opportunity: {opp.title} ({opp.source_url})")
                inserted_count += 1
                
            print(f"\nDatabase Ingestion Complete.")
            print(f"Total processed: {len(opportunities)}")
            print(f"Total inserted: {inserted_count}")
            print(f"Total skipped (duplicates): {skipped_count}")
            
        except Exception as e:
            print(f"Database operation failed: {e}")
            db.rollback()
        finally:
            db.close()
    else:
        print("No opportunities collected or verified.")

if __name__ == "__main__":
    run_collection()

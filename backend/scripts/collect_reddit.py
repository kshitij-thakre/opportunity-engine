import os
import sys

# Ensure the backend directory is in the path to resolve imports correctly
sys.path.insert(0, "/Users/kshitijthakre/Apps/opportunity-engine/backend")

from app.connectors.reddit_connector import RedditConnector

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
            
    # Display sample outputs
    if opportunities:
        print("\n--- Mapped Opportunity Samples ---")
        for i, opp in enumerate(opportunities, 1):
            print(f"\n[{i}] Title: {opp.title}")
            print(f"    Source: {opp.source}")
            print(f"    URL: {opp.source_url}")
            print(f"    Posted At: {opp.posted_at}")
            print(f"    Collected At: {opp.collected_at}")
            print(f"    Status: {opp.status}")
            desc_preview = (
                opp.description[:120] + "..."
                if opp.description and len(opp.description) > 120
                else opp.description
            )
            print(f"    Description Preview: {desc_preview}")
    else:
        print("No opportunities collected or verified.")

if __name__ == "__main__":
    run_collection()

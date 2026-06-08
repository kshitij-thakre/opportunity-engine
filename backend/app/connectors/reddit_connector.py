import uuid
import json
import urllib.request
import urllib.error
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any

from app.models.opportunity import Opportunity, OpportunityStatus

class RedditConnector:
    def __init__(self, subreddits: Optional[List[str]] = None):
        if subreddits is None:
            self.subreddits = ["forhire", "freelance", "startups"]
        else:
            self.subreddits = subreddits
        # User agent is critical to avoid 429 Too Many Requests response from Reddit
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) OpportunityEngine/0.1.0"
        }

    def fetch_posts(self, subreddit: str, limit: int = 25) -> Optional[Dict[str, Any]]:
        """Fetch new posts from a public subreddit JSON feed."""
        url = f"https://www.reddit.com/r/{subreddit}/new.json?limit={limit}"
        req = urllib.request.Request(url, headers=self.headers)
        
        try:
            with urllib.request.urlopen(req, timeout=10) as response:
                if response.status == 200:
                    return json.loads(response.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            print(f"HTTP Error fetching r/{subreddit}: {e.code} - {e.reason}")
        except urllib.error.URLError as e:
            print(f"URL Error fetching r/{subreddit}: {e.reason}")
        except Exception as e:
            print(f"Unexpected error fetching r/{subreddit}: {str(e)}")
            
        return None

    def map_post_to_opportunity(self, post_data: Dict[str, Any]) -> Opportunity:
        """Map a single Reddit post listing into an Opportunity domain object."""
        opp_id = uuid.uuid4()
        
        title = post_data.get("title", "").strip()
        description = post_data.get("selftext", "").strip()
        
        permalink = post_data.get("permalink", "")
        source_url = f"https://www.reddit.com{permalink}" if permalink else None
        
        created_utc = post_data.get("created_utc")
        if created_utc:
            posted_at = datetime.fromtimestamp(created_utc, tz=timezone.utc)
        else:
            posted_at = datetime.now(timezone.utc)
            
        return Opportunity(
            id=opp_id,
            title=title,
            description=description,
            source="reddit",
            source_url=source_url,
            company_name=None,
            location=None,
            opportunity_type=None,
            posted_at=posted_at,
            collected_at=datetime.now(timezone.utc),
            status=OpportunityStatus.NEW
        )

    def collect_all(self, limit: int = 10) -> List[Opportunity]:
        """Fetch and map new opportunities from all configured subreddits."""
        opportunities = []
        for subreddit in self.subreddits:
            print(f"Fetching posts from r/{subreddit}...")
            feed = self.fetch_posts(subreddit, limit=limit)
            if not feed:
                continue
                
            try:
                children = feed.get("data", {}).get("children", [])
                for child in children:
                    post_data = child.get("data", {})
                    # Skip stickied posts or those without titles/permalinks
                    if post_data.get("stickied") or not post_data.get("title"):
                        continue
                    opportunity = self.map_post_to_opportunity(post_data)
                    opportunities.append(opportunity)
            except Exception as e:
                print(f"Error parsing JSON feed for r/{subreddit}: {str(e)}")
                
        return opportunities

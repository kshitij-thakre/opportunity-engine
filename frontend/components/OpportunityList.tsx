import React from "react";
import OpportunityCard, { Opportunity } from "./OpportunityCard";

interface OpportunityListProps {
  opportunities: Opportunity[];
}

export default function OpportunityList({ opportunities }: OpportunityListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {opportunities.map((opp) => (
        <OpportunityCard key={opp.id} opportunity={opp} />
      ))}
    </div>
  );
}

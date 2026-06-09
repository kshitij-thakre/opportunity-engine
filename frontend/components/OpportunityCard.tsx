import React from "react";

export interface Opportunity {
  id: string;
  title: string;
  description?: string;
  source: string;
  source_url?: string;
  company_name?: string;
  location?: string;
  opportunity_type?: string;
  posted_at?: string;
  collected_at: string;
  status: string;
}

interface OpportunityCardProps {
  opportunity: Opportunity;
}

export default function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status.toUpperCase()) {
      case "NEW":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "REVIEWED":
        return "bg-sky-500/10 text-sky-400 border-sky-500/30";
      case "CONTACTED":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "ARCHIVED":
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
      default:
        return "bg-slate-500/10 text-slate-400 border-slate-500/30";
    }
  };

  const getSourceBadgeColor = (source: string) => {
    switch (source.toLowerCase()) {
      case "reddit":
        return "bg-orange-500/10 text-orange-400 border-orange-500/20";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "N/A";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:bg-white/[0.04]">
      {/* Hover glow effect */}
      <div className="absolute -inset-px -z-10 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-violet-500/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />

      <div className="flex flex-col gap-4">
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-500">
              {opportunity.company_name || "Unknown Company"}
            </span>
            <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors duration-200">
              {opportunity.title}
            </h3>
          </div>
          <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase ${getStatusStyle(opportunity.status)}`}>
            {opportunity.status}
          </span>
        </div>

        {/* Description / Preview */}
        {opportunity.description ? (
          <p className="text-sm leading-relaxed text-slate-400 line-clamp-3">
            {opportunity.description}
          </p>
        ) : (
          <p className="text-sm italic text-slate-500">No description provided.</p>
        )}

        {/* Metadata Badges */}
        <div className="flex flex-wrap gap-2 text-xs pt-2">
          {/* Source badge */}
          <span className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 font-medium ${getSourceBadgeColor(opportunity.source)}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {opportunity.source}
          </span>

          {/* Location badge */}
          {opportunity.location && (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 font-medium text-slate-400">
              <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {opportunity.location}
            </span>
          )}

          {/* Type badge */}
          {opportunity.opportunity_type && (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 font-medium text-slate-400">
              <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {opportunity.opportunity_type}
            </span>
          )}

          {/* Posted date */}
          {opportunity.posted_at && (
            <span className="inline-flex items-center gap-1 rounded-md border border-white/5 bg-white/[0.02] px-2 py-0.5 font-medium text-slate-400">
              <svg className="h-3.5 w-3.5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(opportunity.posted_at)}
            </span>
          )}
        </div>

        {/* Bottom Actions Row */}
        {opportunity.source_url && (
          <div className="mt-2 flex border-t border-white/5 pt-4">
            <a
              href={opportunity.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              View Original Listing
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

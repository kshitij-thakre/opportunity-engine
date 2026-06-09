"use client";

import React, { useState, useEffect, useCallback } from "react";
import OpportunityList from "@/components/OpportunityList";
import { Opportunity } from "@/components/OpportunityCard";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

function SkeletonCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 shadow-xl backdrop-blur-md">
      <div className="animate-pulse flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-white/10 rounded w-1/4"></div>
            <div className="h-5 bg-white/10 rounded w-3/4"></div>
          </div>
          <div className="h-6 bg-white/10 rounded-full w-16"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-white/10 rounded"></div>
          <div className="h-4 bg-white/10 rounded w-5/6"></div>
        </div>
        <div className="flex gap-2 pt-2">
          <div className="h-6 bg-white/10 rounded w-16"></div>
          <div className="h-6 bg-white/10 rounded w-20"></div>
          <div className="h-6 bg-white/10 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [filteredOpps, setFilteredOpps] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSource, setSelectedSource] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Fetch opportunities from FastAPI backend
  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/opportunities`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setOpportunities(data);
      setFilteredOpps(data);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "An error occurred while fetching opportunities.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  // Handle filtering logic in-memory
  const applyFilters = useCallback(() => {
    let result = [...opportunities];

    // Search filter (title or company name)
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      result = result.filter(
        (opp) =>
          opp.title.toLowerCase().includes(term) ||
          (opp.company_name && opp.company_name.toLowerCase().includes(term))
      );
    }

    // Source filter
    if (selectedSource) {
      result = result.filter(
        (opp) => opp.source.toLowerCase() === selectedSource.toLowerCase()
      );
    }

    // Status filter
    if (selectedStatus) {
      result = result.filter(
        (opp) => opp.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    setFilteredOpps(result);
  }, [opportunities, searchTerm, selectedSource, selectedStatus]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Extract unique sources for the source dropdown
  const uniqueSources = Array.from(
    new Set(opportunities.map((opp) => opp.source))
  ).filter(Boolean);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedSource("");
    setSelectedStatus("");
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-cyan-500/5 blur-[150px]" />
      <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] rounded-full bg-violet-500/5 blur-[150px]" />

      <header className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-md shadow-cyan-500/10">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Opportunity Engine
              </h1>
              <span className="text-[10px] font-mono text-slate-500">v0.1.0 • discovery dashboard</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-emerald-400">Database Connected</span>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col gap-8">
        
        {/* Search & Filters Section */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-6 backdrop-blur-md flex flex-col gap-4 shadow-xl">
          <h2 className="text-sm font-semibold text-slate-400 tracking-wide uppercase">Search & Filters</h2>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            {/* Search Input */}
            <div className="sm:col-span-6 relative">
              <input
                type="text"
                placeholder="Search by title or company..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 pl-10 text-sm text-white placeholder-slate-500 outline-none transition-all duration-200 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50"
              />
              <svg className="absolute left-3 top-3 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Source Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-cyan-500/50"
              >
                <option value="">All Sources</option>
                {uniqueSources.map((source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/60 px-4 py-2.5 text-sm text-white outline-none transition-all duration-200 focus:border-cyan-500/50"
              >
                <option value="">All Statuses</option>
                <option value="NEW">New</option>
                <option value="REVIEWED">Reviewed</option>
                <option value="CONTACTED">Contacted</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators */}
          {(searchTerm || selectedSource || selectedStatus) && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-4">
              <div className="flex flex-wrap gap-2 items-center text-xs text-slate-400">
                <span>Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2.5 py-1 text-slate-300">
                    Query: &ldquo;{searchTerm}&rdquo;
                  </span>
                )}
                {selectedSource && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2.5 py-1 text-slate-300">
                    Source: {selectedSource}
                  </span>
                )}
                {selectedStatus && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2.5 py-1 text-slate-300">
                    Status: {selectedStatus}
                  </span>
                )}
              </div>
              <button
                onClick={resetFilters}
                className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Dashboard Main Content */}
        <div className="flex-1">
          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center max-w-lg mx-auto">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Connection Error</h3>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                  Unable to fetch opportunities from the backend server. Make sure the FastAPI application is running.
                </p>
                {error && <p className="mt-2 text-xs font-mono text-rose-400/80 bg-rose-950/20 p-2 rounded border border-rose-500/10">{error}</p>}
              </div>
              <button
                onClick={fetchOpportunities}
                className="rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 px-4 py-2 text-xs font-semibold text-rose-400 transition-all duration-200"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Data loaded state */}
          {!loading && !error && (
            <>
              {filteredOpps.length > 0 ? (
                <OpportunityList opportunities={filteredOpps} />
              ) : (
                /* Empty state */
                <div className="rounded-2xl border border-white/5 bg-white/[0.01] p-12 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center max-w-md mx-auto">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-slate-400">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">No Opportunities Found</h3>
                    <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                      We couldn&rsquo;t find any records matching your current filter options. Try adjusting your query or resetting filters.
                    </p>
                  </div>
                  {(searchTerm || selectedSource || selectedStatus) && (
                    <button
                      onClick={resetFilters}
                      className="rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 px-4 py-2 text-xs font-semibold text-cyan-400 transition-all duration-200"
                    >
                      Reset Active Filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}

        </div>
      </main>

      <footer className="border-t border-white/5 py-6 mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© 2026 Opportunity Engine. All rights reserved.</p>
          <p>v0.1.0 • Platform Discovery MVP</p>
        </div>
      </footer>
    </div>
  );
}

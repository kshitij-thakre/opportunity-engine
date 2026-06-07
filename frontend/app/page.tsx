import React from "react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 py-12 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900">
      {/* Background glow effects */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.2),rgba(255,255,255,0))]" />
      <div className="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[120px] animate-pulse" style={{ animationDuration: "8s" }} />
      <div className="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-[120px] animate-pulse" style={{ animationDuration: "12s" }} />

      <main className="w-full max-w-xl">
        {/* Glassmorphism card container */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-cyan-500/20 sm:p-12">
          {/* Subtle line reveal animation element */}
          <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          
          <div className="flex flex-col items-center text-center">
            {/* Logo/Icon shape */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 shadow-lg shadow-cyan-500/20">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>

            {/* Main Header */}
            <h1 className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
              Opportunity Engine
            </h1>

            {/* Status Section */}
            <div className="mt-8 flex items-center gap-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-1.5 text-sm font-medium text-emerald-400">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
              </span>
              Phase 0 Setup Complete
            </div>

            {/* Description */}
            <p className="mt-6 text-base leading-relaxed text-slate-400">
              The foundational project infrastructure and development environments have been successfully initialized.
            </p>

            {/* No features note */}
            <div className="mt-8 w-full border-t border-white/5 pt-6">
              <p className="text-xs font-mono uppercase tracking-wider text-slate-500">
                No additional features.
              </p>
            </div>
          </div>
        </div>

        {/* Footer/Signature */}
        <p className="mt-8 text-center text-xs text-slate-600 font-mono">
          v0.1.0 • Platform Base System
        </p>
      </main>
    </div>
  );
}

import React, { lazy, Suspense } from "react";

const AnalyticsContent = lazy(() => import("./AnalyticsContent"));

function ReportsShell() {
  return (
    <div className="fg-page reports-page">
      <div>
        <div className="sec-heading">Trends & Patterns</div>
        <div className="sec-heading-sub">
          Historical analysis of alarm trends and sensor activity over time
        </div>
        <div className="sec-divider" />
        <div className="reports-grid reports-grid-spaced">
          <div className="chart-card">
            <div className="chart-title">Alarm Trends</div>
            <div className="chart-sub">Preparing report data</div>
            <div className="chart-wrap">
              <div className="h-full w-full rounded-lg bg-[#f4f4f2]" />
            </div>
          </div>
          <div className="chart-card">
            <div className="chart-title">Monthly Sensor Alarms</div>
            <div className="chart-sub">Preparing report data</div>
            <div className="chart-wrap">
              <div className="h-full w-full rounded-lg bg-[#f4f4f2]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<ReportsShell />}>
      <AnalyticsContent />
    </Suspense>
  );
}

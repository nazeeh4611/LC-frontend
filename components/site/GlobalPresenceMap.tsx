"use client";

const regions = [
  { label: "India", x: 68, y: 52, hq: true },
  { label: "UAE", x: 58, y: 46 },
  { label: "Middle East", x: 55, y: 44 },
  { label: "Africa", x: 48, y: 60 },
  { label: "Europe", x: 46, y: 30 },
  { label: "Southeast Asia", x: 78, y: 60 },
];

const connections: [number, number][] = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
];

export interface RegionCard {
  region: string;
  role: string;
  description: string;
}

export function GlobalPresenceMap({ cards }: { cards?: RegionCard[] }) {
  return (
    <div className={cards ? "grid grid-cols-1 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : undefined}>
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[3.5rem_1rem_3.5rem_1rem] border border-border bg-gradient-to-br from-bg-secondary via-bg to-bg-dark shadow-elevated md:rounded-[4.5rem_1.5rem_4.5rem_1.5rem]">
        {/* dotted world texture */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(rgba(152,163,179,0.28) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />
        <div className="absolute inset-0 bg-radial-fade" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/[0.1] blur-3xl" />

        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
          {connections.map(([from, to], i) => {
            const a = regions[from];
            const b = regions[to];
            const mx = (a.x + b.x) / 2;
            const my = (a.y + b.y) / 2 - 6;
            return (
              <path
                key={i}
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke="rgba(227,192,113,0.5)"
                strokeWidth="0.28"
                strokeDasharray="1.6 1.6"
                className="animate-[dash_7s_linear_infinite]"
              />
            );
          })}
          <style>{`
            @keyframes dash {
              to { stroke-dashoffset: -14; }
            }
          `}</style>
        </svg>

        {regions.map((region) => (
          <div
            key={region.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${region.x}%`, top: `${region.y}%` }}
          >
            <div className="relative flex flex-col items-center">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-bright/50" />
                <span
                  className={
                    region.hq
                      ? "relative inline-flex h-3 w-3 rounded-full bg-gold-bright ring-4 ring-gold-bright/20"
                      : "relative inline-flex h-3 w-3 rounded-full bg-gold-bright"
                  }
                />
              </span>
              <span className="mt-2 whitespace-nowrap rounded-full border border-border bg-bg/90 px-3 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                {region.label}
                {region.hq && <span className="ml-1 text-gold-bright">HQ</span>}
              </span>
            </div>
          </div>
        ))}
      </div>

      {cards && (
        <div className="flex flex-col divide-y divide-border-hairline">
          {cards.map((card) => (
            <div key={card.region} className="flex gap-4 py-5 first:pt-0">
              <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gold-bright" />
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
                    {card.region}
                  </h4>
                  <span className="text-[11px] uppercase tracking-wider text-gold-bright">
                    {card.role}
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

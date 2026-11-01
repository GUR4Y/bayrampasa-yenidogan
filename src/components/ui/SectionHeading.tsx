import React from "react";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  actionText,
  actionHref,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-zinc-800 gap-4">
      <div>
        {badge && (
          <span className="inline-block px-2.5 py-0.5 mb-2 rounded bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-bold tracking-widest uppercase font-heading">
            {badge}
          </span>
        )}
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white uppercase font-heading">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-sm text-zinc-400 font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <a
          href={actionHref}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:text-white uppercase tracking-wider group transition shrink-0"
        >
          {actionText}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      )}
    </div>
  );
}

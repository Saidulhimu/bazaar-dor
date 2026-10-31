"use client";

import { useSyncExternalStore } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function BanglaDate({ className }: { className?: string }) {
  const dateStr = useSyncExternalStore(
    () => () => {},
    getBanglaDate,
    () => "",
  );

  if (!dateStr) return null;

  return <span className={className}>{dateStr}</span>;
}
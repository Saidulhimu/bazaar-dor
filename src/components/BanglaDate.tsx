"use client";

import { useState, useEffect } from "react";
import { getBanglaDate } from "@/lib/utils";

export default function BanglaDate({ className }: { className?: string }) {
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    setDateStr(getBanglaDate());
  }, []);

  if (!dateStr) return null; 

  return <span className={className}>{dateStr}</span>;
}
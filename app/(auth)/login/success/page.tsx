"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    window.close();
  });

  return (
    <main className="w-full h-dvh flex justify-center items-center ">
      <Loader2 size={50} className="animate-spin" />
    </main>
  );
}

"use client";

import { MotionConfig } from "framer-motion";
import { createContext, useContext, useState, type ReactNode } from "react";
import { Loader } from "./Loader";
import { Cursor } from "./Cursor";

/** `ready` becomes true once the intro loader has finished — the hero waits for it. */
const LoaderContext = createContext({ ready: true });
export const useLoader = () => useContext(LoaderContext);

export function Providers({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    // reducedMotion="user" → transforms are disabled when the visitor prefers reduced motion
    <MotionConfig reducedMotion="user">
      <LoaderContext.Provider value={{ ready }}>
        <Loader onDone={() => setReady(true)} />
        <Cursor />
        {children}
      </LoaderContext.Provider>
    </MotionConfig>
  );
}

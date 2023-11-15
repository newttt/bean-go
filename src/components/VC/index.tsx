"use client";
import Script from "next/script";
import React, { useCallback } from "react";
import "@portkey/did-ui-react/dist/assets/index.css";

export default function VC() {
  const vc = useCallback(() => {
    const _window: any = window;
    if (typeof _window?.VConsole !== "undefined") new _window.VConsole();
  }, []);
  return (
    <Script
      onLoad={vc}
      src="https://unpkg.com/vconsole@latest/dist/vconsole.min.js"
    />
  );
}

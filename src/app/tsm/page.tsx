"use client";
import React, { useCallback } from "react";
import mintLoop from "./mintLoop.mjs";

export default function TSM() {
  const onSubmit = useCallback((e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target as any);
    const privateKey = formData.get("privateKey");
    const chainId = formData.get("chainId") as any;
    const seed = formData.get("seed") as any;

    mintLoop(privateKey, chainId, seed);
  }, []);
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>tDVV -&gt;MAIN, tDVW-&gt;TESTNET </div>
        <label>
          chainId:
          <input type="text" name="chainId" />
        </label>
        <div></div>
        <label>
          Portkey privateKey:
          <input type="text" name="privateKey" />
        </label>
        <div></div>

        <label>
          SEED: ELEPHANT
          <input type="text" name="seed" />
        </label>
        <div></div>

        <button type="submit"> submit</button>
      </form>
    </div>
  );
}

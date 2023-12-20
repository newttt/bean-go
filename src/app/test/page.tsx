"use client";
import React from "react";

export default function Test() {
  return (
    <div>
      <button
        onClick={() => {
          const hash = location.hash.replace("#", "?");
          console.log(hash, "hash===");
          window.location.href =
            "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive/portkey" +
            hash;
        }}>
        btn
      </button>
    </div>
  );
}

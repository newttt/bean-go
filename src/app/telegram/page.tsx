"use client";
import { telegramAuthAccessToken } from "@/utils/telegram";
import React from "react";

export default function Telegram() {
  return (
    <div
      onClick={() => {
        telegramAuthAccessToken({
          botUsername: "sTestABot",
          authCallbackUrl:
            "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive",
        });
      }}>
      telegram
    </div>
  );
}

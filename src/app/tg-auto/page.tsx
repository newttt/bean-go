"use client";

import { telegramAuthAccessToken } from "@/utils/telegram";
import React, { useEffect } from "react";

export default function Auto() {
  useEffect(() => {
    setTimeout(() => {
      telegramAuthAccessToken({
        botUsername: "sTestABot",
        authCallbackUrl:
          "https://aa-portkey.portkey.finance/api/app/telegramAuth/receive/openlogin",
      });
    }, 100);
  }, []);
  return <div>Auto</div>;
}

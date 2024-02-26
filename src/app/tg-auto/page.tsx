"use client";

import { telegramAuthAccessToken } from "@/utils/telegram";
import React, { useEffect } from "react";

export default function Auto() {
  useEffect(() => {
    setTimeout(() => {
      telegramAuthAccessToken({
        botUsername: "portkey_connect_bot",
        authCallbackUrl:
          "https://bean-go-newttt.vercel.app/tg-auto",
      });
    }, 100);
  }, []);
  return <div>Auto</div>;
}

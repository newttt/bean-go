"use client";

import React from "react";
import { Button } from "antd";
import { getTelegramAuthToken } from "@/utils/TelegramAuthReplace";

export default function TelegramAuthToken() {
  return (
    <div>
      <Button
        onClick={() => {
          getTelegramAuthToken({
            botId: "6923708369",
            redirectUrl: `https://bean-go-newttt.vercel.app/telegram-bridge`,
            origin: "https://bean-go-newttt.vercel.app",
          });
        }}>
        getTelegramAuthToken
      </Button>
    </div>
  );
}

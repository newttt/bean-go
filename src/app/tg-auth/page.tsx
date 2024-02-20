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
            botId: "6792630227",
            redirectUrl: "https%3A%2F%2Faa-portkey.portkey.finance",
            origin: "https://openlogin.portkey.finance",
          });
        }}>
        getTelegramAuthToken
      </Button>
    </div>
  );
}

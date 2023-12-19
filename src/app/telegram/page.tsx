"use client";
import { telegramAuthAccessToken } from "@/utils/telegram";
import React from "react";

export default function Telegram() {
  return (
    <div>
      <div
        onClick={() => {
          telegramAuthAccessToken({
            botUsername: "portkey_connect_bot",
            authCallbackUrl:
              "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive",
          });
        }}>
        telegram
      </div>

      {/* <button
        onClick={() => {
          const TWidgetLogin = (window as any).Telegram.Login;
          TWidgetLogin.init(
            "login",
            "sTestABot",
            { origin: "https://bean-go-newttt.vercel.app" },
            false,
            "en"
          );
        }}>
        init
      </button>
      <button
        id="login"
        onClick={() => {
          const TWidgetLogin = (window as any).Telegram.Login;

          TWidgetLogin.auth(
            { bot_id: "sTestABot", request_access: true },

            (data: any) => {
              console.log(data, "data===");

              if (!data) {
                // authorization failed
              }
              console.log(data, "data===");
              // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
            }
          );
        }}>
        Login auth
      </button> */}
    </div>
  );
}

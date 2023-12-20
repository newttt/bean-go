"use client";
import { telegramAuthAccessToken } from "@/utils/telegram";
import React from "react";
import { stringifyUrl } from "query-string";
import { getTelegramAuthToken } from "@/utils/TelegramAuthReplace";

export default function Telegram() {
  return (
    <div>
      {/* <button
        onClick={() => {
          const url = stringifyUrl(
            {
              url: "https://oauth.telegram.org/auth",
              query: {
                bot_id: 6923708369,
                request_access: true,
                origin: "https://bean-go-newttt.vercel.app",
                embed: 1,
                return_to:
                  "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive/portkey",
                lang: "en",
              },
            },
            { encode: true }
          );
          window.location.href = url;
        }}>
        auto
      </button> */}
      {/* 
      <button
        onClick={() => {
          function haveTgAuthResult() {
            var locationHash =
                "http://localhost:3001/telegram#tgAuthResult=eyJpZCI6NjYzMDg2NTM1MiwiZmlyc3RfbmFtZSI6InBvdHRlciIsInBob3RvX3VybCI6Imh0dHBzOlwvXC90Lm1lXC9pXC91c2VycGljXC8zMjBcL1FldkhBcGFUbTR3V2tOb1BhZGxfOGkwaUpWeEw5ZkdKZk1tbW9tbjg0YklxX3lIbzFuU0VsSHl0NmlPZjVEdlEuanBnIiwiYXV0aF9kYXRlIjoxNzAyOTgwMjA0LCJoYXNoIjoiNDQ2ZTkwMzU4MzI1MjBmYTBiYzJmYzRmOGI5ZmE5ODlhNDIwNmQ4ZmM2OGM0NjcyNGJiZWZkMzg5MDkzMGMzZiJ9",
              re = /[#\?\&]tgAuthResult=([A-Za-z0-9\-_=]*)$/,
              match;
            try {
              // locationHash = location.hash.toString();
              if ((match = locationHash.match(re))) {
                location.hash = locationHash.replace(re, "");
                var data = match[1] || "";
                data = data.replace(/-/g, "+").replace(/_/g, "/");
                var pad = data.length % 4;
                if (pad > 1) {
                  data += new Array(5 - pad).join("=");
                }
                console.log(data, "data==");
                return JSON.parse(window.atob(data));
              }
            } catch (e) {}
            return false;
          }
          const data = haveTgAuthResult();
          console.log(data, "data===");
        }}>
        abcd
      </button> */}
      {/* <div className="tgme_widget_login medium nouserpic" id="widget_login">
        <button
          className="btn tgme_widget_login_button"
          onClick={() => {
            if (typeof (window as any).TWidgetLogin === "undefined") return;
            const TWidgetLogin = (window as any).TWidgetLogin;
            TWidgetLogin.auth();
          }}>
          Log in with Telegram
        </button>
      </div>
      <script src="https://telegram.org/js/widget-frame.js?27"></script>

      <button
        onClick={() => {
          if (typeof (window as any).TWidgetLogin === "undefined") return;
          const TWidgetLogin = (window as any).TWidgetLogin;
          console.log(TWidgetLogin, "TWidgetLogin==");
          // TWidgetLogin.auth(
          //   { bot_id: 6923708369, request_access: true },
          //   (data: any) => {
          //     console.log(data);
          //   }
          // );
          TWidgetLogin.init(
            "widget_login",
            6923708369,
            { origin: "https://core.telegram.org" },
            false,
            "en"
          );
          // TWidgetLogin.auth();
        }}>
        btn
      </button> */}
      <div>---</div>
      {/* <button
        onClick={() => {
          telegramAuthAccessToken({
            botUsername: "portkey_connect_bot",
            // authCallbackUrl:
            //   "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive",
          });
        }}>
        telegram
      </button> */}

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

      <div
        onClick={() => {
          getTelegramAuthToken({
            botId: "6856370874",
            redirectUrl: "https://bean-go-newttt.vercel.app/test",
            // "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive/portkey",
            origin: "https://bean-go-newttt.vercel.app",
          });
        }}>
        telegram
      </div>
    </div>
  );
}

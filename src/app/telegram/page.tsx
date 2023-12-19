"use client";
import { telegramAuthAccessToken } from "@/utils/telegram";
import React from "react";
import { stringifyUrl } from "query-string";

export default function Telegram() {
  return (
    <div>
      <button
        onClick={() => {
          const url = stringifyUrl(
            {
              url: "https://oauth.telegram.org/auth",
              query: {
                bot_id: 6923708369,
                request_access: "write",
                origin: "https%3A%2F%2Fbean-go-newttt.vercel.app",
                embed: 1,
                // return_to: redirectUrl,
                lang: "en",
              },
            },
            { encode: true }
          );
          window.location.href = url;
        }}>
        auto
      </button>
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
      <button
        onClick={() => {
          telegramAuthAccessToken({
            botUsername: "portkey_connect_bot",
            authCallbackUrl:
              "https://localtest-applesign.portkey.finance/api/app/telegramAuth/receive",
          });
        }}>
        telegram
      </button>

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

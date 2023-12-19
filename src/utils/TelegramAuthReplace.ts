import { stringifyUrl } from "query-string";
export const getTelegramAuthToken = ({
  botId,
  requestAccess = "write",
  redirectUrl,
}: {
  botId: string;
  requestAccess?: string;
  redirectUrl: string;
}) => {
  const url = stringifyUrl(
    {
      url: "https://oauth.telegram.org/auth",
      query: {
        bot_id: botId,
        request_access: requestAccess,
        origin: location.origin,
        embed: 1,
        return_to: redirectUrl,
      },
    },
    { encode: true }
  );
  window.location.href = url;
};
// <script
//   async
//   src="https://telegram.org/js/telegram-widget.js?22"
//   data-telegram-login="bt"
//   data-size="large"
//   data-auth-url="https://www.comaa.ab"
//   data-request-access="write"></script>;

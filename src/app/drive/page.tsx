"use client";
import Script from "next/script";
import React, { useCallback } from "react";

const clientId =
  "1015503499318-vl6ulhnnds7mnb7ql28ijlhaeiul158u.apps.googleusercontent.com";
const apiKey = "AIzaSyBYi2Hz6RMqE4lb6cCeZCV41OfTreHJXKg";

export default function Drive() {
  const click = useCallback(() => {
    if (!(window as any)?.gapi) throw "error";
    const gapi = (window as any)?.gapi;
    function initClient() {
      console.log("initClient", "initClient==");
      gapi.client
        .init({
          apiKey,
          clientId,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
          ],
          scope: "https://www.googleapis.com/auth/drive.file",
        })
        .then(
          function () {
            // Google Drive API客户端已初始化
            // 可以开始进行操作
            uploadFile();
          },
          function (error: any) {
            console.log(error);
          }
        );
    }

    // 3. 上传文件到Google Drive
    function uploadFile() {
      var fileContent = JSON.stringify({ key: "value" }); // 替换为您要上传的JSON内容
      var file = new Blob([fileContent], { type: "application/json" });

      var metadata = {
        name: "example.json", // 替换为您要上传的JSON文件名
        mimeType: "application/json",
      };

      var accessToken = gapi.auth2
        .getAuthInstance()
        .currentUser.get()
        .getAuthResponse().access_token;
      var form = new FormData();
      form.append(
        "metadata",
        new Blob([JSON.stringify(metadata)], { type: "application/json" })
      );
      form.append("file", file);

      fetch(
        "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
        {
          method: "POST",
          headers: new Headers({ Authorization: "Bearer " + accessToken }),
          body: form,
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log("File ID:", data.id);
        })
        .catch(function (error) {
          console.error("Error:", error);
        });
    }

    // 4. 调用Google API客户端库的load方法
    gapi.load("client:auth2", initClient);
  }, []);
  return (
    <div>
      <Script src="https://apis.google.com/js/api.js"></Script>
      <button onClick={click}>click</button>
    </div>
  );
}

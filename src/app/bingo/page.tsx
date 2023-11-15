"use client";
import React, { useCallback, useEffect, useState } from "react";
import doPlay from "./doPlay.js";
import doPlayV1 from "./doPlayV1.js";
import doPlayDice3 from "./doPlayDice3.js";
import getWeekRankList from "./getWeekRankList.js";
import getSeasonRank from "./getSeasonRank.js";
import registerIM from "./registerIM.js";
import { Button, Form, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { aes } from "@portkey/utils";
import "antd/dist/antd.min.css";

const PIN = "111111";

const aesSaveStorage = {
  encrypt: (file: string) =>
    localStorage.setItem("privateKeys_file", aes.encrypt(file, PIN)),
  decrypt: (): false | Array<any> => {
    const file = aes.decrypt(
      localStorage.getItem("privateKeys_file") || "",
      PIN
    );
    if (!file) return false;
    return JSON.parse(file);
  },
};

export default function Bingo() {
  const [privateKeys, setPrivateKeys] = useState<any>([]);

  useEffect(() => {
    const pk = aesSaveStorage.decrypt();
    pk && setPrivateKeys(pk);
  }, []);

  return (
    <div>
      {/* <Button onClick={play}>Play</Button>
      <div>-----</div> */}

      {/* <Button onClick={getPrivate}>getPrivate</Button> */}
      <div>-----</div>

      <Upload
        accept=".json"
        beforeUpload={() => false}
        onChange={(v) => {
          console.log(v, "onChange");
          const reader = new FileReader();
          reader.readAsText(v.file as any, v.file.type);
          reader.onload = (e: any) => {
            const file = e.target?.result;
            if (!e.target?.result) return message.error("File Error");
            const pk = JSON.parse(file);
            setPrivateKeys(pk);
            //
            const data = aes.encrypt(file, PIN);
            localStorage.setItem("privateKeys_file", data);
          };
        }}>
        <Button type="primary">
          <UploadOutlined className="gap-right-small" />
          Click to Upload (only one)
        </Button>
      </Upload>

      <Button
        onClick={() => {
          privateKeys && doPlay(privateKeys);
        }}>
        doPlay
      </Button>
      <div>-----</div>

      <Button onClick={() => getWeekRankList(privateKeys)}>
        getWeekRankList
      </Button>
      <div>-----</div>

      <Button onClick={() => getSeasonRank(privateKeys)}>getSeasonRank</Button>

      <div>-----</div>

      <Button onClick={() => registerIM(privateKeys)}>registerIM</Button>
      <div>-----</div>
    </div>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ConfigProvider,
  SignIn,
  ISignIn,
  did,
  TDesign,
  UI_TYPE,
  PortkeyProvider,
} from "@portkey/did-ui-react";
import { ChainId } from "@portkey/types";
import { sleep } from "@portkey/utils";

const PIN = "111111";
let CHAIN_ID: ChainId = "AELF";

ConfigProvider.setGlobalConfig({
  connectUrl: "https://auth-portkey-test.portkey.finance",
  socialLogin: {
    Portkey: {
      websiteName: "website demo",
      websiteIcon: "",
    },
  },
  requestDefaults: {
    timeout: 30000,
  },
  serviceUrl: "https://localtest-applesign2.portkey.finance",
  /** By default, reCaptcha's siteKey of portkey is used, if it is a self-built service, please use your own siteKey */
  // reCaptchaConfig: {
  //   siteKey: '',
  // },
  graphQLUrl: "/graphql",
});

export default function Sign() {
  const ref = useRef<ISignIn>();
  const [defaultLifeCycle, setLifeCycle] = useState<any>();
  const [design, setDesign] = useState<TDesign>("Web2Design");
  const [uiType, setUIType] = useState<UI_TYPE>("Modal");
  useEffect(() => {
    typeof window !== "undefined" &&
      setLifeCycle(
        JSON.parse(localStorage.getItem("portkeyLifeCycle") || "{}")
      );
  }, []);

  return (
    <div>
      <PortkeyProvider networkType="MAIN">
        <div>-----------</div>
        <SignIn
          ref={ref}
          design={design}
          defaultChainId="tDVV"
          uiType={uiType}
          extraElement={<div style={{ height: 300, background: "red" }}></div>}
          getContainer="#wrapper"
          isShowScan
          className="sign-in-wrapper"
          termsOfService={"https://portkey.finance/terms-of-service"}
          onFinish={async (res) => {
            console.log(res, "onFinish====");
            console.log(
              {
                p: res.walletInfo.privateKey,
                caHash: res.caInfo["caHash"],
                caAddress: res.caInfo["caAddress"],
                loginAccount: res.accountInfo.guardianIdentifier,
              },
              "Info"
            );
            CHAIN_ID = res.chainId;
            did.save(PIN);
          }}
          onError={(error) => {
            console.log(error, "onError====error");
          }}
          onCancel={() => {
            ref.current?.setOpen(false);
            setLifeCycle(undefined);
          }}
          onCreatePending={(info) => {
            console.log(info, "onCreatePending====info");
          }}
          // defaultLifeCycle={{ LoginByScan: null }}
          onLifeCycleChange={(lifeCycle: any, nextLifeCycleProps: any) => {
            console.log(
              "onLifeCycleChange:",
              lifeCycle,
              nextLifeCycleProps,
              { [lifeCycle]: nextLifeCycleProps },
              JSON.stringify({ [lifeCycle]: nextLifeCycleProps })
            );
            localStorage.setItem(
              "portkeyLifeCycle",
              JSON.stringify({ [lifeCycle]: nextLifeCycleProps })
            );
          }}
        />
        chainId:tDVV
        <button
          onClick={async () => {
            setDesign("CryptoDesign");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          CryptoDesign |&nbsp;
        </button>
        <button
          onClick={async () => {
            setDesign("SocialDesign");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          SocialDesign |&nbsp;
        </button>
        <button
          onClick={async () => {
            setDesign("Web2Design");
            await sleep(50);
            ref.current?.setOpen(true);
          }}>
          Web2Design |&nbsp;
        </button>
        <div>-----------</div>
        <button
          onClick={async () => {
            setUIType((v) => (v === "Full" ? "Modal" : "Full"));
          }}>
          setUIType |&nbsp;
        </button>
        <button
          onClick={async () => {
            ref.current?.setCurrentLifeCycle(
              JSON.parse(localStorage.getItem("portkeyLifeCycle") || "{}")
            );
          }}>
          setCurrentLifeCycle |&nbsp;
        </button>
        <div>-----------</div>
        <button
          onClick={async () => {
            // Mock pin: 111111
            const wallet = await did.load(PIN);
            console.log("wallet:", wallet);
            // Mock chainId: 'AELF'
            did.logout({ chainId: CHAIN_ID });
          }}>
          logout
        </button>
        <div id="wrapper"></div>
        <div>-----------</div>
      </PortkeyProvider>
    </div>
  );
}

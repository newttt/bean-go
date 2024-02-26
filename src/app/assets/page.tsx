"use client";
import {
  ConfigProvider,
  Asset,
  PortkeyAssetProvider,
  PortkeyProvider,
} from "@portkey/did-ui-react";
import React from "react";
// import { Store } from '../../utils';
// const myStore = new Store();

ConfigProvider.setGlobalConfig({
  // storageMethod: myStore,
  serviceUrl: "http://192.168.66.240:5577",

  requestDefaults: {
    timeout: 30000,
  },
});

export default function Assets() {
  return (
    <PortkeyProvider networkType="MAIN">
      <PortkeyAssetProvider pin="111111" originChainId="tDVV">
        <Asset
          onLifeCycleChange={(lifeCycle) => {
            console.log(lifeCycle, "onLifeCycleChange");
          }}
        />
      </PortkeyAssetProvider>
    </PortkeyProvider>
  );
}

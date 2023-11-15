import React from "react";
import { PortkeyAssetProvider, SignIn } from "@portkey/did-ui-react";

export default function Test() {
  return (
    <div>
      <SignIn />
      {/* <PortkeyAssetProvider originChainId="AELF" caHash="">
        <button>111</button>
      </PortkeyAssetProvider> */}
    </div>
  );
}

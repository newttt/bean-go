
import { tDVWConfig, tDVVConfig } from '../../constants';
import AElf from 'aelf-sdk';
import { getContractBasic } from '@portkey/contracts'


let inscriptionContract, tokenContract, config, TICK, autoWallet;

const getInscriptionContract = async () => {
  inscriptionContract = await getContractBasic({
    rpcUrl: config.RPC,
    account: autoWallet,
    contractAddress: config.InscriptionContractAddress,
  })
}

const getTokenContract = async () => {
  tokenContract = await getContractBasic({
    rpcUrl: config.RPC,
    account: autoWallet,
    contractAddress: config.TokenContractAddress,
  })
}

async function autoMint() {
  if (!tokenContract) await getTokenContract();
  if (!inscriptionContract) await getInscriptionContract()
  await inscriptionContract.callSendMethod("Inscribe", "", {
    tick: TICK,
    amt: 11,
  });

  const balance = await tokenContract.callViewMethod("GetBalance", {
    symbol: `${TICK}-1`,
    owner: autoWallet.address,
  });
  console.log(balance, "===balance");
}

const mintLoop = async (privateKey, chainId = 'tDVV', seed = 'ELEPHANT') => {
  if (!privateKey) throw 'no privateKey'
  config = chainId === "tDVW" ? tDVWConfig : tDVVConfig;
  TICK = seed;
  autoWallet = AElf.wallet.getWalletByPrivateKey(privateKey);
  let i = 0;
  while (i <= 1000) {
    await autoMint()
    i++;
  }
}

export default mintLoop;
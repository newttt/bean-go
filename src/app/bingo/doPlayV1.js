import { aelf, sleep, aes } from '@portkey/utils';
import { getContractBasic } from '@portkey/contracts';
import privateKeys from "./privateKeys.js"

const getCAContract = (account, caHash) => getContractBasic({
  contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
  account: aelf.getWallet(account),
  rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',

  callType: 'ca',
  caHash: caHash, // list[i].caHash,
  caContractAddress: '2cLA9kJW3gdHuGoYNY16Qir69J3Nkn6MSsuYxRkUHbz4SG2hZr'
})

let viewBingoContract;

const getViewBingoContract = async () => {
  if (!viewBingoContract) return await getContractBasic({
    contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
    account: aelf.getWallet('22b31bde9235b38a89d6335fc1fe2d366af961493d7bfe602a4559eb67c93e33'),
    rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',
  })
  return viewBingoContract;
}

const getRandom = () => Number((Math.random() * 1 + 1).toFixed(6));

const GetBoutInformation = async (viewBingoContract) => {
  const results = await Promise.allSettled(
    privateKeys.map((v) =>
      viewBingoContract.callViewMethod("GetPlayerInformation", v.caAddress)
    )
  );
  const resF = results.map((v, i) => {
    const playableCount = v.value.data?.playableCount;
    return { s: v.status, playableCount: playableCount };
  });
  console.log("GetBoutInformation: format", resF);
  let max = 0;
  const info = resF
    .map((v, i) => {
      if (v.playableCount) {
        max = Math.max(v.playableCount, max);
        return privateKeys[i];
      }
    })
    .filter((v) => !!v);
  console.log(info);

  return {
    max,
    info,
  };
};

/**
 *
 * @param {{p: string, caHash:string, curGrid: number}} guardian
 */
const play = async (guardian) => {
  console.log("curGrid", guardian.curGrid);
  if (!guardian?.curGrid) guardian.curGrid = 0;
  const resetStart = guardian.curGrid > 9 || guardian.curGrid === 0;
  if (resetStart) guardian.curGrid = 0;
  const contract = await getCAContract(guardian.p, guardian.caHash);
  // console.log("contracts init done", contract);
  // Play
  const playResult = await contract.callSendMethod("Play", "", { resetStart });
  console.log("playResult", resetStart, playResult);

  if (playResult.error) throw `Play:${playResult.error.message}`;
  const startTime = Date.now();
  const info = await contract.callViewMethod("GetBoutInformation", {
    playId: playResult?.transactionId,
  });
  console.log("GetBoutInformation:info", info);
  if (info.error) throw `GetBoutInformation:${info.error.message}`;

  const blockGap =
    Number(info.data.expectedBlockHeight) - playResult.data.BlockNumber;

  const waitTime = blockGap * 0.5 - (Date.now() - startTime) / 1000;

  if (waitTime > 0.1) {
    await sleep(waitTime * 1000);
  }

  // getBlockHeightFromServer
  await sleep(getRandom() * 25 * 200);

  // Bingo
  const BingoResult = await contract.callSendMethod(
    "Bingo",
    "",
    playResult.transactionId
  );
  console.log("BingoResult", BingoResult);
  if (BingoResult.error) throw `BingoResult:${BingoResult.error.message}`;

  const BingoInfo = await contract.callViewMethod("GetBoutInformation", {
    playId: playResult.transactionId,
  });
  console.log("BingoInfo", BingoInfo);
  if (BingoInfo.error) throw `GetBoutInformation:${BingoInfo.error.message}`;
  if (BingoInfo.data.gridType === 'Gold') console.log('GoldGold:', guardian.caAddress)

  guardian.curGrid += BingoInfo.data.gridNum;
  return BingoInfo.data.score;
};

const doPlay = async () => {
  const viewBingoContract = await getViewBingoContract();
  const list = await GetBoutInformation(viewBingoContract);
  if (!list.info.length) return console.log("Play ALL FINISH");
  console.log(`剩余次数为:${list.max}`);
  const count = list.max;
  if (count > 20 || count < 1) return console.log("Play ALL FINISH");
  let i = 0;
  while (i < count) {
    const num = 20 - count + i + 1;
    console.log(`开始第:${num}次`);
    for (const iterator of list.info) {
      try {
        const score = await play(iterator);
        console.log(score, num, iterator.caHash);
      } catch (error) {
        console.log(error, "===error");
      }
    }
    await sleep(getRandom() * 3000);
    i++;
  }

  console.log("Play end");
};

// doPlay();

export default doPlay;

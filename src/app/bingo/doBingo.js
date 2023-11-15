const privateKeys = require('./privateKeys.js')
const { aelf } = require('@portkey/utils');
const { getContractBasic } = require('@portkey/contracts');



const getContracts = async (list) => {
  const wallets = list.map((key) => aelf.getWallet(key.p));
  const addresses = wallets.map((wallets) => wallets.address);
  console.log("wallet list:", addresses);

  // contract init
  const contracts = await Promise.all(
    wallets.map((account, i) =>
      getContractBasic({
        contractAddress: "C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb",
        account,
        rpcUrl: 'https://tdvv-public-node.aelf.io',// 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',

        callType: "ca",
        caHash: list[i].caHash,
        caContractAddress: "2cLA9kJW3gdHuGoYNY16Qir69J3Nkn6MSsuYxRkUHbz4SG2hZr",
      })
    )
  );
  console.log("contracts init done", [...list], contracts);
  return contracts;
};

const getGameHistoryQuery = (address) => {
  return `query {
      getGameHistory(
        getGameHisDto: {
          caAddress: "ELF_${address}_tDVV"
          skipCount: 0
          maxResultCount: 100
        }
      ) {
        gameList {
          id
          gridNum
          score
          transcationFee
          playTransactionInfo {
            transactionId
            transactionFee
            triggerTime
          }
          bingoTransactionInfo {
            transactionId
            transactionFee
            triggerTime
          }
        }
      }
    }`;
};

const getGameHistory = async (address) => {
  const fetch = require("node-fetch");
  const data = JSON.stringify({
    query: getGameHistoryQuery(address),
  });
  const response = await fetch(
    "https://www.beangotown.com/AElfIndexer_BeangoTown/BeangoTownIndexerPluginSchema/graphql",
    {
      method: "post",
      body: data,
      headers: {
        "Content-Type": "application/json",
        "Content-Length": data.length,
        "User-Agent": "Node",
      },
    }
  );
  return response.json();
};

const getNotBingoList = async (address) => {
  try {
    const history = await getGameHistory(address);
    return history.data.getGameHistory.gameList.filter(
      ({ playTransactionInfo, bingoTransactionInfo }) => {
        return playTransactionInfo && !bingoTransactionInfo;
      }
    );
  } catch (error) {
    console.log('getNotBingoList:', error)
  }

};
const doBingo = async () => {
  const [binGoContracts] = await Promise.all([
    getContracts(privateKeys),
  ]);
  console.log('doBingo', "====notLIst");

  await Promise.allSettled(
    privateKeys.map(async (v, index) => {
      const notLIst = await getNotBingoList(v.caAddress);
      console.log(notLIst, "====notLIst");
      for (const { playTransactionInfo } of notLIst) {
        console.log(playTransactionInfo, "===playTransactionInfo");
        const req = await binGoContracts[index].callSendMethod(
          "Bingo",
          "",
          playTransactionInfo.transactionId
        );
        console.log(req, "====req");
      }
    })
  );
};

doBingo()
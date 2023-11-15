
import { aelf, sleep, aes } from '@portkey/utils';
import { getContractBasic } from '@portkey/contracts';
import privateKeys from "./privateKeys.js"

const getRandom = () => Number((Math.random() * 1 + 1).toFixed(6));


const getContract = (account, caHash) => getContractBasic({
    contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
    account,
    rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',

    callType: 'ca',
    caHash: caHash, // list[i].caHash,
    caContractAddress: '2cLA9kJW3gdHuGoYNY16Qir69J3Nkn6MSsuYxRkUHbz4SG2hZr'
})

const GetBoutInformation = async () => {
    const c = await getContractBasic({
        contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
        account: aelf.getWallet('22b31bde9235b38a89d6335fc1fe2d366af961493d7bfe602a4559eb67c93e33'),
        rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',
    })
    const results = await Promise.allSettled(privateKeys.map(v => c.callViewMethod('GetPlayerInformation', v.caAddress)));
    console.log('GetBoutInformation: results', results)
    const resF = results.map((v, i) => {
        const playableCount = v.value.data?.playableCount;
        return { s: v.status, playableCount: playableCount };
    })
    console.log('GetBoutInformation: format', resF)
    let min = 30;
    const info = resF.map((v, i) => {
        if (v.playableCount) {
            if (v.playableCount < min) min = v.playableCount
            return privateKeys[i];
        }
        return;
    }).filter(v => !!v)
    console.log(info,)


    return {
        min,
        info
    }
}


/**
 *
 * @param {{p: string, caHash:string, resetStart: boolean}} guardian
 */
const play = async (guardian) => {
    // console.log('curGrid', guardian.curGrid)
    // if (!guardian?.curGrid) guardian.curGrid = 0;
    // const resetStart = guardian.curGrid > 9 || guardian.curGrid === 0
    // if (resetStart) guardian.curGrid = 0;

    const resetStart = guardian.resetStart ?? true;
    const wallet = aelf.getWallet(guardian.p);
    const contract = await getContract(wallet, guardian.caHash);
    console.log('contracts init done', contract);
    // Play 
    const playResult = await contract.callSendMethod('Play', '', { resetStart: true, diceCount: 3, executeBingo: true });
    console.log('playResult', playResult)

    // if (playResult.error) throw `Play:${playResult.error.message}`;
    // const startTime = Date.now();
    // const info = await contract.callViewMethod('GetBoutInformation', { playId: playResult?.transactionId });
    // console.log('GetBoutInformation:info', info)
    // if (info.error) throw `GetBoutInformation:${info.error.message}`;

    // const blockGap = Number(info.data.expectedBlockHeight) - playResult.data.BlockNumber;

    // const waitTime = blockGap * 0.5 - (Date.now() - startTime) / 1000;

    // if (waitTime > 0.1) {
    //     await sleep(waitTime * 1000);
    // }

    // // getBlockHeightFromServer
    // await sleep(getRandom() * 25 * 200);

    // // Bingo
    // const BingoResult = await contract.callSendMethod('Bingo', '', playResult.transactionId);
    // console.log('BingoResult', BingoResult)
    // if (BingoResult.error) throw `BingoResult:${BingoResult.error.message}`;
    await sleep(2000)
    const BingoInfo = await contract.callViewMethod('GetBoutInformation', { playId: playResult.transactionId });
    console.log('BingoInfo', BingoInfo)
    if (BingoInfo.error) throw `GetBoutInformation:${BingoInfo.error.message}`;
    if (BingoInfo.data.gridType === 'Gold') console.log('GoldGold:', guardian.caAddress)
    // guardian.curGrid += BingoInfo.data.gridNum;
    if (BingoInfo.data.endGridNum >= 9) guardian.resetStart = true;
    return BingoInfo.data.score
}

const playAndBingo = async (list) => await Promise.allSettled(list.map(v => play(v)))

const doPlay = async () => {

    const list = await GetBoutInformation();
    if (!list.info.length) return console.log('Play ALL FINISH')

    const count = list.min;
    if (count > 20 || count < 1) return console.log('Play ALL FINISH');
    let i = 0;
    while (i < count) {
        await sleep(getRandom() * 10000)
        await playAndBingo(list.info)
        i++;
    }


    console.log('Play ALL FINISH')
}

export default doPlay
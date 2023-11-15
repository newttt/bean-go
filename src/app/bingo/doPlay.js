
import { aelf, sleep, aes } from '@portkey/utils';
import { getContractBasic } from '@portkey/contracts';


const getRandom = () => Number((Math.random() * 1 + 1).toFixed(6));

const stepList = [3, 3, 2, 1, 2, 2, 2, 2, 1, 1, 1, 1, 3, 3, 3, 3, 2, 3]

const getDiceCount0 = (curGridNum = 0) => {
    const gridNum = curGridNum % 18;
    let resetStart = false;
    let diceCount = 1;
    if (gridNum > 8) resetStart = true;
    if (gridNum === 2) diceCount = 2;

    return { diceCount, resetStart }
}

const getDiceCount = (curGridNum = 0) => {
    const gridNum = curGridNum % 18;
    let resetStart = true;
    if (gridNum === 2 || gridNum === 3 || gridNum === 8) resetStart = false
    return { diceCount: 1, resetStart }
}

const getDiceCount1 = (curGridNum = 0) => {
    const gridNum = curGridNum % 18;
    if (gridNum > 8) return -1;
    if (gridNum === 0) return 2;
    if (gridNum === 2) return 2;
    if (gridNum === 3) return 1;
    if (gridNum === 8) return 1;
    return 1;
}

const getDiceCount2 = (curGridNum = 0) => {
    const gridNum = curGridNum % 18;
    if (gridNum > 8) return -1;
    if (gridNum === 0) return 2;
    if (gridNum === 2) return 2;
    if (gridNum === 3) return 1;
    if (gridNum === 8) return 1;
    return 3;
}

const getDiceCount3 = (curGridNum = 0) => {
    const gridNum = curGridNum % 18;
    console.log(gridNum, 'gridNum===')
    if (gridNum > 8 || gridNum === 3) return -1

    return stepList[curGridNum]
}
const stepList4 = [1, 2, 2, 1, 2, 1, 2, 2, 1,]
const getDiceCount4 = (curGridNum = 0) => {
    let gridNum = curGridNum % 18;
    console.log(gridNum, 'gridNum===')
    if (gridNum > 8) return -1;
    return stepList4[curGridNum]
}


const ACTION_UNIT = {
    'ONE_DICE': 1,
    'TWO_DICES': 2,
    'THREE_DICES': 3,
    'RESTART_ONE_DICE': 1,
    'RESTART_TWO_DICES': 2,
    'RESTART_THREE_DICES': 3,
}




const sendBingoContract = {}
const getSendBingoContract = async (account, caHash) => {
    if (!sendBingoContract[account.address]) sendBingoContract[account.address] = await getContractBasic({
        contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
        account,
        rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',

        callType: 'ca',
        caHash: caHash, // list[i].caHash,
        caContractAddress: '2cLA9kJW3gdHuGoYNY16Qir69J3Nkn6MSsuYxRkUHbz4SG2hZr'
    })
    return sendBingoContract[account.address]
}


let viewBingoContract;

const getViewBingoContract = async () => {
    if (!viewBingoContract) return await getContractBasic({
        contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
        account: aelf.getWallet('22b31bde9235b38a89d6335fc1fe2d366af961493d7bfe602a4559eb67c93e33'),
        rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',
    })
    return viewBingoContract;
}

const GetPlayerInformation = async (privateKeys) => {
    const c = await getViewBingoContract()
    const results = await Promise.allSettled(privateKeys.map(v => c.callViewMethod('GetPlayerInformation', v.caAddress)));
    console.log('GetPlayerInformation: results', results)
    const resF = results.map((v, i) => {
        const playableCount = v.value.data?.playableCount;
        return { s: v.status, playableCount: playableCount, curGridNum: v.value.data?.curGridNum };
    })
    console.log('GetPlayerInformation: format', resF)
    let min = 30;
    const info = resF.map((v, i) => {
        privateKeys[i].curGridNum = v.curGridNum

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

const getDCAndRS = (curGridNum) => {
    // 0\
    // return getDiceCount(curGridNum)
    // 1\
    // const _diceCount = getDiceCount1(curGridNum)
    // 2\ 
    // const _diceCount = getDiceCount2(curGridNum)
    // 3\ 
    // const _diceCount = getDiceCount3(curGridNum)
    // const resetStart = _diceCount === -1;
    // const diceCount = resetStart ? 3 : _diceCount
    // 4\ 
    // const _diceCount = getDiceCount4(curGridNum)
    // const resetStart = _diceCount === -1;
    // const diceCount = resetStart ? 1 : _diceCount

    // return { diceCount, resetStart }

    // 5\
    // return getDiceCount5(curGridNum)

    // 0\
    return getDiceCount0(curGridNum)

}

/**
 *
 * @param {{p: string, caHash:string, curGridNum: number}} guardian
 */
const play = async (guardian) => {
    try {
        const wallet = aelf.getWallet(guardian.p);
        const contract = await getSendBingoContract(wallet, guardian.caHash);
        // Play 

        const { diceCount, resetStart } = getDCAndRS(guardian.curGridNum)
        console.log(diceCount, 'diceCount===')

        const playResult = await contract.callSendMethod('Play', '', { resetStart, diceCount, executeBingo: true });
        console.log('playResult', playResult)
        await sleep(1000)
        const BingoInfo = await contract.callViewMethod('GetBoutInformation', { playId: playResult.transactionId });
        console.log('BingoInfo', BingoInfo)
        if (BingoInfo.error) throw `GetBoutInformation:${BingoInfo.error.message}`;
        if (BingoInfo.data.gridType === 'Gold') console.log(`%c宝箱宝箱Gold:%c${guardian.caAddress}`, 'color: #ffd700;font-size: 20px', 'font-size: 20px')
        guardian.curGridNum = BingoInfo.data.endGridNum;
        return BingoInfo.data.score
    } catch (error) {
        console.log(error, 'play===error')
    }
}

const playAndBingo = async (list) => await Promise.allSettled(list.map(v => play(v)))

const doPlay = async (privateKeys) => {
    const list = await GetPlayerInformation(privateKeys);
    if (!list.info.length) return console.log('Play ALL FINISH')

    const count = list.min;
    if (count > 20 || count < 1) return console.log('Play ALL FINISH');
    let i = 0;
    while (i < count) {
        console.log(`还剩${count - i}`)
        await playAndBingo(list.info)
        await sleep(getRandom() * 1000)

        i++;
    }


    console.log('Play ALL FINISH')
}

export default doPlay
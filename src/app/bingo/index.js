import { aelf, sleep, aes } from '@portkey/utils';
import { getContractBasic } from '@portkey/contracts';
import privateKeys from "./privateKeys.js"

const getRandom = () => Number((Math.random() * 1 + 1).toFixed(6));


let resetStart = true; // resetStart 是干嘛的？



/**
 *
 * @param {{p: string, caHash:string}[]} list
 */
const init = async list => {
  try {
    const wallets = list.map(key => aelf.getWallet(key.p));
    const addresses = wallets.map(wallets => wallets.address);
    console.log('wallet list:', addresses);

    // contract init
    const contracts = await Promise.allSettled(
      wallets.map((account, i) =>
        getContractBasic({
          contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
          account,
          rpcUrl: 'https://www.beangotown.com/chain', //'https://tdvv-public-node.aelf.io',

          callType: 'ca',
          caHash: list[i].caHash,
          caContractAddress: '2cLA9kJW3gdHuGoYNY16Qir69J3Nkn6MSsuYxRkUHbz4SG2hZr'
        }),
      ),
    );
    console.log('contracts init done', [...list], contracts);

    const successContracts = contracts
      .filter((c, i) => {
        if (c.status !== 'fulfilled') list.splice(i, 1);
        return c.status === 'fulfilled';
      })
      .map(c => c.value);

    // const token = await getContractBasic({
    //   contractAddress: '7RzVGiuVWkvL4VfVHdZfQF2Tri3sgLe9U991bohHFfSRZXuGX',
    //   account: wallets[0],
    //   rpcUrl: 'https://tdvv-public-node.aelf.io', // 'https://www.beangotown.com/chain',//
    // });

    // const b = await token.callViewMethod('GetBalance', {
    //   symbol: 'BEANPASS-1',
    //   owner: 'uLCMkz67T64tUbxu1EV91uX8NPbpgq8u98VvU9fmipuocgMKw',
    // });

    // console.log('balance', b);

    // Play
    const results = await Promise.allSettled(
      successContracts.map(contract => contract.callSendMethod('Play', '', { resetStart })),
    );

    console.log('Play done', [...list], results);
    const playErrorIndex = [];
    const successResult = results
      .filter((r, i) => {
        if (r.status !== 'fulfilled') {
          playErrorIndex.push(i);
          successContracts.splice(i, 1);

          list.splice(i, 1);
        }
        return r.status === 'fulfilled';
      })
      .map(c => c.value);

    console.log([...successResult], 'Play successResult===', [...list]);
    const startTime = Date.now();
    console.log('Play Error Index list', playErrorIndex);

    // Get Info

    const boutInformationList = await Promise.allSettled(
      successContracts.map((c, i) => c.callViewMethod('GetBoutInformation', { playId: successResult[i]?.transactionId })
      ),
    );


    const sBoutInformationList = boutInformationList
      .filter((c, i) => {
        if (c.status !== 'fulfilled') {
          successContracts.splice(i, 1);

          successResult.splice(i, 1);

          list.splice(i, 1);
        }
        return c.status === 'fulfilled';
      })
      .map(c => c.value);

    console.log('GetBoutInformation done', [...list]);
    console.log([...sBoutInformationList], 'sBoutInformationList===')

    const Bingos = await Promise.allSettled(
      sBoutInformationList.map(async (b, i) => {
        const blockGap = Number(b.expectedBlockHeight) - successResult[i].data.BlockNumber;

        const waitTime = blockGap * 0.5 - (Date.now() - startTime) / 1000;

        if (waitTime > 0.1) {
          await sleep(waitTime * 1000);
        }

        // getBlockHeightFromServer
        await sleep(getRandom() * 25 * 200);

        // GetBingoReward
        return successContracts[i].callSendMethod('Bingo', '', successResult[i].transactionId);
      }),
    );
    console.log(Bingos, 'Bingos===')
    Bingos.filter((c, i) => {
      if (c.status !== 'fulfilled') list.splice(i, 1);
      return c.status === 'fulfilled';
    }).map(c => c.value);

    console.log('Play and Bingo Success', [...list]);
  } catch (error) {
    console.log(error);
  }
};




const GetBoutInformation = async () => {
  const c = await getContractBasic({
    contractAddress: 'C7ZUPUHDwG2q3jR5Mw38YoBHch2XiZdiK6pBYkdhXdGrYcXsb',
    account: aelf.getWallet('3858939750f9c02d2e1d7a1d76fb17852669c031eb02d473fae4b7be983045fc'),
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

const play = async () => {
  const list = await GetBoutInformation();
  if (!list.info.length) return console.log('Play ALL FINISH')
  // TODO 
  //  

  const count = list.min;
  if (count > 20 || count < 1) return console.log('Play ALL FINISH')

  const result = await Promise.allSettled(new Array(count).fill('').map(async (c, i) => {
    await sleep(getRandom() * 10000 * i)
    return init(list.info)
  }))
  console.log('Play result', result)
  const success = result
    .filter((c, i) => {
      return c.status === 'fulfilled' && c.value && !c.value.error;
    })
    .map(c => c.value);
  console.log('Play success count', success.length)

}

export default play;
// const data = aes.decrypt(
//   'U2FsdGVkX19Cz1ndPDmUWUvtE6vrLJcNeePaunQFcmMmiwu1H5u37BqEWMr4Ty/OT1wEiPXjftt8nLeX0UgncW9j+rCI7OcTZRoFfTFkr5lVIYjbkSEAVosyXirFBwrIMxGQEd8e6soAXJUMTMIw5OA7u+ffcrftX9bp50Ueso3F1K+BCOwowWhOrCer5wYvl8jWsdu9OSPpQ08Sjtat6LiLcf9hgxTOvQDi/Woji8f2yW91BWceYkNBuLhFS5lEfkrBHrKqi6SeJq+yKMLeES4xNhlYkDWQD/k/61yVQBhSbpm9oC8n3uBGixXQuaAGl7zRBe2MTBqYSrnLAVAmy6+cQdkvvB9hA1Y7zMTK1FM6RG64BtLw7hrjLnlgkwB929ffZluHRKFlLsQ60fbm6zUxrcarkjA1hTqpqCH7Wm5QMvTRgkh7iLV5sSTO+FOMbfjtXbnp1FO6HTHb21RCBnD831UfBYG2v1cvJjhLsfasEN2lfh6ewLuqFiPe9CFs',

//   '111111');
// console.log(data, 'data==')
// const { aesPrivateKey, } = JSON.parse(data);
// const privateKey = aes.decrypt(aesPrivateKey, '111111');
// console.log(privateKey, 'privateKey==')

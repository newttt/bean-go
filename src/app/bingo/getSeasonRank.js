

const { sleep } = require('@portkey/utils')
// const fs = require('fs');


const getSeasonRankByApi = async (address) => {
  const fetch = require("node-fetch");

  const response = await fetch(
    `/bean/api/app/rank/season-rank?CaAddress=ELF_${address}_tDVV&SkipCount=0&MaxResultCount=99`,
    {
      method: "GET",
    }
  );
  return response.json();
}

// const mkdirSync = async (path) => {
//   const exists = await fs.existsSync(path);
//   if (!exists) await fs.mkdirSync(path);
// };

// const writeFile = async (result) => {
//   const date = dayjs();
//   const dirPath = `./logs/${date.format("YYYY-MM")}`;
//   await mkdirSync(dirPath);
//   fs.writeFileSync(
//     `${dirPath}/season-${date.format("YYYY-MM-DD")}.json`,
//     JSON.stringify({ result })
//   );

// }


const getSeasonRankList = async (privateKeys) => {
  try {
    let lg50Count = 0;
    let lg25Count = 0;
    let lg20Count = 0;
    let lg10Count = 0;
    const result = (await Promise.all(privateKeys.map(async (v, i) => {
      return await getSeasonRankByApi(v.caAddress)
    }))).map(v => {
      const selfRank = v.data?.selfRank
      if (selfRank.rank <= 50 && selfRank.rank > 0) lg50Count++;
      if (selfRank.rank <= 25 && selfRank.rank > 0) lg25Count++;
      if (selfRank.rank <= 20 && selfRank.rank > 0) lg20Count++;
      if (selfRank.rank <= 10 && selfRank.rank > 0) lg10Count++;


      return { ...selfRank }
    }).sort((a, b) => b.score - a.score);
    console.log(result, 'getSeasonRankList==');
    console.log('前50名个数:', lg50Count, '; 25~20:', lg50Count - lg25Count);
    console.log('前25名个数:', lg25Count, '; 20~25:', lg25Count - lg20Count);
    console.log('前20名个数:', lg20Count, '; 10~20:', lg20Count - lg10Count);
    console.log('前10名个数:', lg10Count);
    // writeFile(result)
  } catch (error) {
    console.log(error,)
  }
}

export default getSeasonRankList;
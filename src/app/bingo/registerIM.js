const utils = require('./utils');
const fetch = require("node-fetch");
const { aelf, sleep } = require('@portkey/utils')

const AuthorizationMap = {};


const getAuthToken = async (params, address) => {
    const result = await fetch('/api/v1/users/auth', {
        body: JSON.stringify(params),
        method: 'POST',
        headers: {
            'R-Authorization': '',
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: AuthorizationMap[address],
        },
    })
    return await result.json()
}

const getAuthTokenLoop = async (
    params,
    address,
    times = 0,
) => {
    try {
        return await getAuthToken(params, address);
    } catch (error) {
        if (times === 1) throw error;
        console.log('getAuthToken: error', error);
    }
    // if (times <= 0) await sleep(1000);
    await sleep(1000);
    return getAuthTokenLoop(params, address, times - 1);
}




const verifySignature = async (params) => {
    const result = await fetch('/api/v1/users/token', {
        body: JSON.stringify(params),
        method: 'POST',
        headers: {
            'R-Authorization': '',
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: AuthorizationMap[params.address],
        },
    })
    return await result.json()
}

const verifySignatureLoop = async (
    generateVerifyData,
    times = 0,
) => {
    try {
        const params = generateVerifyData();
        if (params === null) throw new Error('VerifyData is null');
        return await verifySignature(params);
    } catch (error) {
        if (times === 1) throw error;
        console.log('verifySignatureLoop: error', error);
    }
    await sleep(1000);
    return verifySignatureLoop(generateVerifyData, times - 1);
}


const getUserInfoList = async (address, token, caAddress) => {
    const result = await fetch(`/api/v1/users/userInfo/list?keywords=${caAddress}`, {
        method: 'GET',
        headers: {
            'R-Authorization': `Bearer ${token}`,
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            Authorization: AuthorizationMap[address],
        },
    })
    return await result.json()
}

const refreshToken = async (account, caHash, caAddress) => {
    try {

        if (!AuthorizationMap[account.address]) {
            const connectToken = await utils.getConnectToken(account, caHash)
            AuthorizationMap[account.address] = connectToken
        }
        const {
            data: { token: addressAuthToken },
        } = await verifySignatureLoop(
            () => utils.getVerifyData(account, caHash),
            5,
        );

        // console.log(addressAuthToken, 'addressAuthToken==')

        const {
            data: { token },
        } = await getAuthTokenLoop(
            { addressAuthToken, },
            account.address,
            5,
        );
        console.log(token, 'getAuthTokenLoop====');


    } catch (error) {
        console.log(error, 'error==refreshToken')
    }
}






const registerIM = async (privateKeys) => {
    try {

        await Promise.all(privateKeys.map(acc => refreshToken(aelf.getWallet(acc.p), acc.caHash, acc.caAddress)))

    } catch (error) {
        console.log('registerIM error', error)
    }

}

export default registerIM
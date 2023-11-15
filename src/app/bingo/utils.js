const AElf = require('aelf-sdk');
const { did } = require('@portkey/did');
const { stringify } = require('query-string');

did.setConfig({
    requestDefaults: {
        timeout: 30000
    }
})

/**
 * 
 * @param {*} account aelf wallet
 * @param {*} caHash string
 * @returns message
 */
const getVerifyData = (account, caHash) => {
    if (!account.keyPair) {
        throw new Error('no keyPair');
    }
    const message = `${Date.now()}`;
    const hexMsg = AElf.utils.sha256(message);
    const signature = account.keyPair.sign(Buffer.from(hexMsg, 'hex'), {
        canonical: true,
    });
    if (signature.recoveryParam === null) {
        throw new Error('no recoveryParam');
    }
    const signatureStr = [
        signature.r.toString('hex', 64),
        signature.s.toString('hex', 64),
        `0${signature.recoveryParam.toString()}`,
    ].join('');

    return {
        message,
        signature: signatureStr,
        address: account.address,
        caHash,
    };
};

const queryAuthorization = async (config) => {
    const { access_token } = await did.connectServices.getConnectToken(config);
    return `Bearer ${access_token}`;
};

const connectToken = {}
const getConnectToken = async (
    managementAccount,
    caHash,
) => {
    if (!connectToken[managementAccount.address]) {

        const timestamp = Date.now();
        const message = Buffer.from(`${managementAccount.address}-${timestamp}`).toString('hex');
        const signature = AElf.wallet.sign(message, managementAccount.keyPair).toString('hex');
        const pubkey = (managementAccount.keyPair).getPublic('hex');
        const config = {
            grant_type: 'signature',
            client_id: 'CAServer_App',
            scope: 'CAServer',
            signature: signature,
            pubkey,
            timestamp,
            ca_hash: caHash,
            chain_id: 'tDVV',
        };
        connectToken[managementAccount.address] = await queryAuthorization(config);
    }

    return connectToken[managementAccount.address];

}

module.exports = {
    getVerifyData,
    getConnectToken
}
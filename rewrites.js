module.exports = [
    // test1
    // { source: '/api/:path*', destination: 'http://192.168.66.240:5577/api/:path*' },
    // { source: '/connect/:path*', destination: 'http://192.168.66.240:8080/connect/:path*' },

    // // test2
    // { source: '/api/:path*', destination: 'http://192.168.67.51:5577/api/:path*' },
    // { source: '/connect/:path*', destination: 'http://192.168.67.51:8080/connect/:path*' },
    // { source: '/graphql/:path*', destination: 'http://192.168.67.51:8083/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql/:path*' },

    // test3
    // { source: '/api/:path*', destination: 'http://192.168.66.203:5001/api/:path*' },
    // { source: '/connect/:path*', destination: 'http://192.168.66.203:8001/connect/:path*' },
    // { source: '/graphql/:path*', destination: 'http://192.168.66.203:8083/AElfIndexer_DApp/PortKeyIndexerCASchema/graphql/:path*' },

    // mainnet
    // { source: '/api/:path*', destination: 'https://did-portkey.portkey.finance/api/:path*' },
    // { source: '/connect/:path*', destination: 'https://auth-portkey.portkey.finance/connect/:path*' },
    { source: '/api/v1/:path*', destination: 'https://im.portkey.finance/api/v1/:path*' },
    {
        source: '/bean/api/:path*',
        destination: 'https://www.beangotown.com/api/:path*',
    },
    { source: '/api/:path*', destination: 'https://did-portkey.portkey.finance/api/:path*' },
    { source: '/connect/:path*', destination: 'https://auth-portkey.portkey.finance/connect/:path*' },
    // testnet
    // { source: '/api/:path*', destination: 'https://did-portkey-test.portkey.finance/api/:path*' },
    // { source: '/connect/:path*', destination: 'https://auth-portkey-test.portkey.finance/connect/:path*' },

];

const truffle = require('../truffle');

const ENV = 'development';

const getEthereumUrl = (env: string) => {
  const network = truffle.networks[env];
  return `http://${network.host}:${network.port}`;
};

const config = {
  ethereumUrl: getEthereumUrl(ENV),
};

export = config;

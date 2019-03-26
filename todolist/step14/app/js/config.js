import truffle from '../../truffle.js';

const getEthereumUrl = (env) => {
  const network = truffle.networks[env];
  return `http://${network.host}:${network.port}`;
};

const config = {
  ethereumUrl: getEthereumUrl(ENV),
};

export default config;

module.exports = async callback => {
  await web3.eth.sendTransaction({
    from: '0x5d53121d43bd1E72C0e0583B1953073Eb3538FD8',
    to: '0x83e6924B3E15ce10C131eEdf903918C7AD6C169C',
    value: web3.utils.toWei('500', 'milli')
  });
  callback();
};

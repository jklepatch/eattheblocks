const axios = require('axios');

async function main() {
  const results = await axios.get('https://api.compound.finance/api/v2/ctoken');
  results.data.cToken.forEach(cToken => {
    const supplyRate = cToken.supply_rate.value * 100;
    const compRate = +cToken.comp_supply_apy.value; 
    console.log(`Supply APY for ${cToken.underlying_symbol}: ${supplyRate}%`);
    console.log(`COMP Supply APY for ${cToken.underlying_symbol}: ${compRate}%`);
    console.log(`Total Supply APY for ${cToken.underlying_symbol}: ${compRate + supplyRate}`);
    console.log('---');
  });
}

main();

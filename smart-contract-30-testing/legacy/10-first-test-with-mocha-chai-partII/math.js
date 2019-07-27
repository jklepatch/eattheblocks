const add = (a, b) => {
  if(typeof a !== 'number' || typeof b !== 'number') return false;
  return a + b;
};

module.exports = { add };

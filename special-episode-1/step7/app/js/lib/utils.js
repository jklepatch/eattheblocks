const formatDate = (rawDate) => { 
  const _date = new Date(rawDate.toNumber()); 
  const date = `${_date.getDate() + 1}/${_date.getMonth() + 1}/${_date.getFullYear()}`; 
  const time = `${_date.getHours()}h ${_date.getMinutes()}m`; return `${date} - ${time}`; 
};

export { formatDate }

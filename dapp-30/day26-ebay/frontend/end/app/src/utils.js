const toDate = dateTimestamp => 
  (new Date(parseInt(dateTimestamp) * 1000)).toLocaleString();

export {
  toDate
};

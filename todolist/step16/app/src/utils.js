const formatDate = (rawDate) => {
  if (!rawDate) { return '' }
  const _date = new Date(parseInt(rawDate) * 1000);
  return _date.toLocaleString();
};

export { formatDate }; 

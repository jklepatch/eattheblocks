const formatDate = (rawDate: string) => {
  if (!rawDate) { return '' }
  const _date = new Date(parseInt(rawDate));
  return _date.toString();
};

export { formatDate }

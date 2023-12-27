const filterQuery = (query, ...accept) => {
  const newQuery = { ...query };
  Object.keys(newQuery).forEach((key) => {
    if (accept.includes(key)) return;
    delete newQuery[key];
  });

  return newQuery;
};

module.exports = filterQuery;

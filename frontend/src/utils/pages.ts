export const getCountPages = (totalCount: number, limit: number) => {
  return Math.ceil(totalCount / limit);
};

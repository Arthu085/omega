export function getPercentDone(data: Record<string, any>) {
  const { totalKeys, fulfilled } = Object.values(data).reduce<{
    totalKeys: number;
    fulfilled: number;
  }>(
    (res, value) => {
      res.totalKeys += 1;
      if (!value) return res;
      if (typeof value === 'string' && !value.length) return res;
      if (typeof value === 'object') {
        res.fulfilled += getPercentDone(value) / 100;
        return res;
      }

      res.fulfilled += 1;
      return res;
    },
    { totalKeys: 0, fulfilled: 0 },
  );
  return totalKeys ? 100 * (fulfilled / totalKeys) : 0;
}

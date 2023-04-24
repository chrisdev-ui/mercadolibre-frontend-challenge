type ItemPrice = {
  currency: string;
  amount: number;
  decimals: number;
};

export const formatCurrency = (price: ItemPrice) => {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: price.currency,
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: price.decimals,
    maximumFractionDigits: price.decimals,
    useGrouping: true,
  });
  return formatter.format(price.amount);
};

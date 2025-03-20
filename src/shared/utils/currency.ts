export function formatCurrency(value: number): string {
  if (typeof value !== 'number') return '';

  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

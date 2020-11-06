export function retirarFormatacao(valor: string): string {
  return valor.replace(/(\(|\)|\.|\/|-)/g, '');
}

export function formatCpf(valor: string): string {
  return retirarFormatacao(valor).replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/g,
    '$1.$2.$3-$4',
  );
}

export function formatNumber(value: string): boolean {
  const regexValue = /^[0-9]\d*$/gm;

  if (regexValue.test(value)) {
    return true;
  }

  return false;
}

export const formatValue = (value: number): string => {
  const valueFormated = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return valueFormated;
};

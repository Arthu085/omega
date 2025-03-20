import { formatCNPJ } from '@shared/utils';

interface Props {
  cnpj: string;
}

export function DataTableColumnCNPJ({ cnpj }: Props) {
  return (
    <>
      {formatCNPJ(cnpj)}
    </>
  );
}

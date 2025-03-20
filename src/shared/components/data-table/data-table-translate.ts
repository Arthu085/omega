import { MUIDataTableTextLabels } from 'mui-datatables';

export const DataTableTranslate: Partial<MUIDataTableTextLabels> = {
  body: {
    noMatch: 'Nenhum registro encontrado.',
    toolTip: 'Ordenar',
  },
  pagination: {
    next: 'Próx. Página',
    previous: 'Ant. Página',
    rowsPerPage: 'Linhas por Página:',
    displayRows: 'de',
  },
  toolbar: {
    search: 'Pesquisar',
    downloadCsv: 'Download Do CSV',
    print: 'Imprimir',
    viewColumns: 'Mostrar Colunas',
    filterTable: 'Filtrar',
  },
  filter: {
    all: 'All',
    title: 'FILTERS',
    reset: 'RESET',
  },
  viewColumns: {
    title: 'Mostrar Colunas',
    titleAria: 'Mostrar/Esconder Colunas',
  },
  selectedRows: {
    text: 'Linha(s) Selecionada(s)',
    delete: 'Remover',
    deleteAria: 'Remover Linhas Selecionadas',
  },
};

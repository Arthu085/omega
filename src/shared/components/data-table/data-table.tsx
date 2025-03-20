import MUIDataTable, { MUIDataTableOptions, MUIDataTableProps } from 'mui-datatables';
import { LinearProgress, Stack, Theme, useMediaQuery } from '@mui/material';

import { formatErrorForNotification } from '@/shared/utils';

import { DataTableFooterMobile } from './data-table-footer-mobile';
import { DataTableTranslate } from './data-table-translate';

interface DataTableProps extends Omit<MUIDataTableProps, 'title'> {
  loading?: boolean;
  size?: 'medium' | 'small';
  error?: any;
}

export function DataTable({ size = 'small', loading, error, ...props }: DataTableProps) {
  const isMobile: boolean = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const optionsCustom: MUIDataTableOptions = {
    elevation: 0,
    print: false,
    search: false,
    filter: false,
    download: false,
    serverSide: true,
    viewColumns: false,
    responsive: 'vertical',
    selectableRows: 'none',
    textLabels: {
      ...DataTableTranslate,
      body: {
        toolTip: DataTableTranslate.body?.toolTip,
        noMatch: loading ? 'Carregando...' : error ? formatErrorForNotification(error) : DataTableTranslate.body?.noMatch,
      },
    },
    rowsPerPageOptions: [10, 25, 50, 100],
    setTableProps: () => ({
      size,
    }),
    ...props.options,
  };

  return (
    <Stack width='100%' position='relative'>
      <Stack height='4px'>{loading && <LinearProgress sx={{ width: '100%' }} />}</Stack>

      <MUIDataTable
        {...props}
        title={undefined}
        options={optionsCustom}
        components={{
          TableFooter: isMobile ? DataTableFooterMobile : undefined,
          ...props.components,
        }}
      />
    </Stack>
  );
}

import { ReactNode } from 'react';
import { Pagination, Table, TableCell, TableFooter, TableRow } from '@mui/material';

// interface Props {
//   page: number;
//   rowCount: number;
//   rowsPerPage: number;
//   options: MUIDataTableOptions;
//   changePage: (page: number) => void;
//   changeRowsPerPage: () => void;
// }

export function DataTableFooterMobile(props: any): ReactNode {
  const count = Math.round(props.rowCount / props.rowsPerPage);

  if (count)
    return (
      <Table>
        <TableFooter>
          <TableRow>
            <TableCell
              variant='footer'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderBottom: 0,
              }}
            >
              <Pagination
                siblingCount={0}
                count={count}
                onChange={(_, page) => props.changePage(page)}
                page={props.page}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
}

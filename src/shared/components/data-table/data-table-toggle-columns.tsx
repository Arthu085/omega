import { MouseEvent, useEffect, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useLocation } from 'react-router-dom';

import { Box, Button, Checkbox, FormControlLabel, Grid, IconButton, Popover } from '@mui/material';
import { FilterList } from '@mui/icons-material';

import { IOption } from '@/shared/domain';

interface Props {
  isMobile?: boolean;
  onToggle: (column: string) => void;
  toggleColumns: Record<string, IOption<boolean>>;
  setToggleColumns?: (columns: Record<string, IOption<boolean>>) => void;
}

export function DataTableToggleColumns({
  isMobile,
  onToggle,
  toggleColumns,
  setToggleColumns,
}: Props) {
  const { pathname } = useLocation();

  const pagePathname = pathname.endsWith('/')
    ? pathname.substring(0, pathname.length - 1)
    : pathname;

  const [localStorageItem, setLocalStorageItem] = useLocalStorage<Record<string, IOption<boolean>>>(
    `@omega/table_columns${pagePathname}`,
    {},
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  function handleClose() {
    setAnchorEl(null);
  }

  function handleClick(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleToggle(column: string) {
    onToggle(column);
    setLocalStorageItem({
      ...toggleColumns,
      [column]: {
        label: toggleColumns[column].label,
        value: !toggleColumns[column].value,
      },
    });
  }

  function validStoredColumns(
    current: Record<string, IOption<boolean>>,
    stored: Record<string, IOption<boolean>>,
  ): Record<string, IOption<boolean>> {
    return Object.assign(
      {},
      ...Object.keys(stored).map((key) => {
        // eslint-disable-next-line no-prototype-builtins
        if (current.hasOwnProperty(key))
          return {
            [key]: {
              ...stored[key],
              label: current[key].label,
            },
          };
      }),
    );
  }

  useEffect(() => {
    if (setToggleColumns && Object.keys(localStorageItem).length)
      setToggleColumns({
        ...toggleColumns,
        ...validStoredColumns(toggleColumns, localStorageItem),
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box display='flex' justifyContent='end' width='inherit'>
      {isMobile ? (
        <Button fullWidth variant='outlined' startIcon={<FilterList />} onClick={handleClick}>
          Toggle Columns
        </Button>
      ) : (
        <IconButton size='small' onClick={handleClick}>
          <FilterList />
        </IconButton>
      )}

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            sx: {
              width: isMobile ? '100%' : '80%',
              paddingY: 3 / 2,
              paddingX: 3,
            },
          },
        }}
      >
        <Grid container columnSpacing={1} rowSpacing={0}>
          {Object.keys(toggleColumns).map((column) => (
            <Grid item xs={isMobile ? 12 : 4} key={column}>
              <FormControlLabel
                control={<Checkbox checked={toggleColumns[column].value} />}
                onChange={() => handleToggle(column)}
                label={toggleColumns[column].label}
                sx={{ width: '100%' }}
              />
            </Grid>
          ))}
        </Grid>
      </Popover>
    </Box>
  );
}

import { HelpOutline } from '@mui/icons-material';
import { Divider, Stack, Tooltip, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface Props {
  children: string | string[];
  divider?: boolean;
  helper?: string | ReactNode;
}

export default function Title({ children, divider = true, helper }: Props) {
  return (
    <Stack>
      <Stack direction='row' alignItems='center' gap={1}>
        <Typography variant='h6' fontWeight='bold' color='text.secondary'>
          {children}
        </Typography>
        {helper && (
          <Tooltip title={helper}>
            <HelpOutline />
          </Tooltip>
        )}
      </Stack>
      {divider && <Divider />}
    </Stack>
  );
}

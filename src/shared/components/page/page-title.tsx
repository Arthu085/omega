import { ArrowBack, Home } from '@mui/icons-material';
import { Stack, Typography, TypographyProps } from '@mui/material';

import { LinkIconButton } from '../buttons';

interface PageTitleProps extends TypographyProps {
  toHome?: boolean;
  none?: boolean
}

export function PageTitle({ children, toHome, none,  ...props }: PageTitleProps) {
  return (
    <Stack flexDirection='row' alignItems='center' gap={1}>
      <LinkIconButton
        to={toHome ? '/' : '../'}
        sx={{ color: 'text.primary' }}
        title={toHome ? 'Página Inicial' : 'Voltar'}
      >
        {toHome ? <Home /> :  none ? <></>: <ArrowBack />}
      </LinkIconButton>

      <Typography component='h2' variant='h5' {...props} fontWeight='bold'>
        {children}
      </Typography>
    </Stack>
  );
}

import { Stack, Typography } from '@mui/material';

interface UnauthenticatedContentHeaderProps {
  title: string;
  description?: string;
}

export function UnauthenticatedContentHeader({
  title,
  description,
}: UnauthenticatedContentHeaderProps) {
  return (
    <Stack gap={1}>
      <Typography variant='h2' fontSize='2rem' fontWeight='bold' color='text.primary'>
        {title}
      </Typography>

      {description && (
        <Typography component='p' variant='body1' color='text.secondary'>
          {description}
        </Typography>
      )}
    </Stack>
  );
}

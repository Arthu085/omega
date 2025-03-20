import { Paper, PaperProps } from '@mui/material';

interface PageCardProps extends PaperProps {}

export function PageCard({ children, sx }: PageCardProps) {
  return (
    <Paper
      sx={{
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'start',
        display: 'flex',
        borderRadius: 3,
        padding: 3,
        gap: 3,
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}

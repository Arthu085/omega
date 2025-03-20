import { Button, ButtonProps, CircularProgress } from '@mui/material';

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
  loadingIndicator?: string;
  loadingPosition?: 'start' | 'end';
}

const Loading = () => <CircularProgress size='1rem' color='inherit' />;

export function LoadingButton({
  children,
  loading,
  disabled,
  endIcon,
  startIcon,
  loadingPosition = 'start',
  loadingIndicator = 'Carregando...',
  ...props
}: LoadingButtonProps) {
  const endLoading = loading && loadingPosition === 'end';
  const startLoading = loading && loadingPosition === 'start';

  return (
    <Button
      {...props}
      disabled={disabled || loading}
      endIcon={endLoading ? <Loading /> : endIcon}
      startIcon={startLoading ? <Loading /> : startIcon}
    >
      {loading ? loadingIndicator : children}
    </Button>
  );
}

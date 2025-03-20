import { Button, Stack } from '@mui/material';
import { LoadingButton } from '../buttons/loading-button'

interface Props {
  onBack: () => void;
  onNext: () => void;
  first: boolean;
  last: boolean;
  loading?: boolean;
  disabled?: boolean;
}

export function StepperButtons({ onBack, onNext, first, last, loading, disabled }: Props) {
  return (
    <Stack flexDirection={{ sm: 'row', xs: 'column-reverse' }} gap={{ sm: 2, xs: 1 }}>
      <Button
        fullWidth
        size='large'
        color='primary'
        variant='outlined'
        onClick={onBack}
        disabled={loading || disabled}
      >
        {first ? 'Cancelar' : 'Voltar'}
      </Button>

      <LoadingButton
        fullWidth
        size='large'
        color='primary'
        variant='contained'
        onClick={onNext}
        loading={loading}
        disabled={disabled}
        loadingIndicator={last ? 'Enviando...' : 'Carregando...'}
      >
        {last ? 'Finalizar' : 'Continuar'}
      </LoadingButton>
    </Stack>
  );
}

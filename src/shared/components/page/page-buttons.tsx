import { Stack, StackProps } from '@mui/material';

interface PageButtonsProps extends StackProps {}

export function PageButtons({ children, ...props }: PageButtonsProps) {
  return (
    <Stack
      direction='row'
      justifyContent='flex-end'
      alignItems='center'
      flexGrow={1}
      gap={2}
      {...props}
    >
      {children}
    </Stack>
  );
}

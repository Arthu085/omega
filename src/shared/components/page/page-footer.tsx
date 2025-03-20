import { Stack, StackProps } from '@mui/material';

interface PageFooterProps extends StackProps {}

export function PageFooter({ children, ...props }: PageFooterProps) {
  return (
    <Stack
      gap={3}
      width='100%'
      flexWrap='wrap'
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      {...props}
    >
      {children}
    </Stack>
  );
}

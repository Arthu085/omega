import { Stack, StackProps } from '@mui/material';

interface PageHeaderProps extends StackProps {}

export function PageHeader({ children, ...props }: PageHeaderProps) {
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

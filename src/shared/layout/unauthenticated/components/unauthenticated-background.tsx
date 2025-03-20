import { Box } from '@mui/material';

export function UnauthenticatedBackground() {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: '-1',

        overflow: 'hidden',
        width: '100%',
        height: '80%',

        backgroundColor: '#ADADAD',
        opacity: '25%',
      }}
    ></Box>
  );
}

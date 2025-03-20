import { Container, Typography, Link } from '@mui/material';
// import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export function UnauthenticatedFooter() {
  // const { VITE_WHATSAPP } = import.meta.env;

  return (
    <Container
      component='footer'
      sx={{
        paddingY: 3,
        minWidth: '100%',
        display: 'flex',
        alignItems: 'end',
        justifyContent: 'center',
      }}
    >
      <Typography variant='body2' textAlign='center' color='text.secondary'>
        © 2025 by&nbsp;
        <Link
          href='#'
          sx={{
            cursor: 'pointer',
          }}
        >
          Weiler
        </Link>
      </Typography>

      {/* <Fab
        color='success'
        component='a'
        href={VITE_WHATSAPP}
        target='_blank'
        sx={{
          position: 'fixed',
          right: 24,
          bottom: 24,
        }}
      >
        <WhatsAppIcon fontSize='large' />
      </Fab> */}
    </Container>
  );
}

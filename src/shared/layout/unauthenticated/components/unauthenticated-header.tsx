import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '@mui/material';
// import { Facebook, LinkedIn, YouTube, Instagram } from '@mui/icons-material';

import { EUnauthenticatedPath } from '@/core/router';

import { LinkButton, Logo } from '@/shared/components';

// interface ISocialMedia {
//   url: string;
//   icon: ReactNode;
// }

// const { VITE_FACEBOOK, VITE_LINKEDIN, VITE_YOUTUBE, VITE_INSTAGRAM } = import.meta.env;

// const SOCIAL_MEDIAS: Array<ISocialMedia> = [
//   {
//     url: VITE_FACEBOOK,
//     icon: <Facebook />,
//   },
//   {
//     url: VITE_LINKEDIN,
//     icon: <LinkedIn />,
//   },
//   {
//     url: VITE_YOUTUBE,
//     icon: <YouTube />,
//   },
//   {
//     url: VITE_INSTAGRAM,
//     icon: <Instagram />,
//   },
// ];

export function UnauthenticatedHeader() {
  const { pathname } = useLocation();

  const { redirectTo, redirectLabel } = useMemo(() => {
    const isSignUp = pathname === EUnauthenticatedPath.SIGN_UP;

    return {
      redirectTo: isSignUp ? EUnauthenticatedPath.LOGIN : EUnauthenticatedPath.SIGN_UP,
      redirectLabel: isSignUp ? 'Entrar' : 'Cadastre-se',
    };
  }, [pathname]);

  return (
    <Container
      component='header'
      maxWidth='xl'
      sx={{
        gap: 3,
        paddingY: 3,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      <Logo />

      {/* <Box
        sx={{
          gap: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {SOCIAL_MEDIAS.map(
          (link, index) =>
            link && (
              <Button
                component='a'
                key={`social-media-${index}`}
                href={link.url}
                target='_blank'
                variant='contained'
                color='inherit'
                sx={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 1,
                  minWidth: '0px',
                  color: 'text.primary',
                  backgroundColor: 'background.paper',
                }}
              >
                {link.icon}
              </Button>
            ),
        )}
      </Box> */}

      <LinkButton
        variant='contained'
        color='inherit'
        size='large'
        sx={{
          minWidth: '198px',
          color: 'primary.main',
          fontWeight: '550',
          textTransform: 'uppercase',
          backgroundColor: 'background.paper',
        }}
        to={redirectTo}
      >
        {redirectLabel}
      </LinkButton>
    </Container>
  );
}

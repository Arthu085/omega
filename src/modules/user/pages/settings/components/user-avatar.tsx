import { createFileURL } from '@/shared/utils/file';
import { ArrowUpward, Clear } from '@mui/icons-material';
import { Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { useDropzone } from 'react-dropzone';

interface Props {
  loading: boolean;
  disabled?: boolean;
  file: File | null;
  onUpload: (file: File | null) => void;
}

export default function UserAvatar({ loading, disabled = false, file, onUpload }: Props) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled: disabled,
    noClick: !!file || loading || disabled,
    noKeyboard: !!file || loading || disabled,
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles: File[]) => {
      if (acceptedFiles.length) onUpload(acceptedFiles[0]);
    },
    maxFiles: 1,
  });

  function message(isDragActive: boolean, isDragReject: boolean, haveFiles: boolean) {
    if (haveFiles) return;

    if (loading) {
      return (
        <CircularProgress
          sx={{
            position: 'absolute',
            top: 'calc(50% - 20px)',
            left: 'calc(50% - 20px)',
          }}
        />
      );
    }

    const color = isDragReject ? 'error' : isDragActive ? 'success' : 'default';

    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        textAlign='center'
        padding={2}
        color={color}
        position='absolute'
        width='100%'
        height='100%'
        fontSize='18px'
        sx={{
          color: '#404040',
        }}
      >
        {isDragReject ? (
          'Arquivo não suportado'
        ) : (
          <Typography>
            Arraste e solte ou{' '}
            <Button
              variant='contained'
              color='secondary'
              size='large'
              sx={{
                minWidth: '180px',
                marginTop: 1.5,
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              Procurar <ArrowUpward />
            </Button>
          </Typography>
        )}
      </Box>
    );
  }

  return (
    <Stack justifyContent={'center'} gap={2} width='300px'>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        sx={{
          border: '1px dashed #ABABAB',
          borderRadius: 2,
          overflow: 'hidden',
          width: '100%',
          paddingBottom: '100%',
          background: `url(${file ? createFileURL(file) : ''})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          position: 'relative',
          cursor: !!file && disabled ? 'default' : 'pointer',
        }}
      >
        <input {...getInputProps()} />

        {message(isDragActive, isDragReject, !!file)}

        {!!file && !disabled && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            <Button
              sx={{
                background: 'rgba(10, 10, 10, 0.5)',
                color: '#FAFAFA',
                borderRadius: '100px',
                '&:hover': {
                  background: 'rgba(10, 10, 10, 0.8)',
                },
              }}
              variant='contained'
              startIcon={<Clear />}
              onClick={() => {
                onUpload(null);
              }}
            >
              Limpar
            </Button>
          </Box>
        )}
      </Box>
    </Stack>
  );
}

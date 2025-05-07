import { User, UserCreateDTO } from '@/modules/user/domain';
import { ERolesUser } from '@/modules/user/domain/enums/user-roles';
import { UserRepository } from '@/modules/user/repositories';
import { ControlledPassword, ControlledText, LinkButton, LoadingButton, PageButtons } from '@/shared/components';
import { ControlledRole } from '@/shared/components/fields/controlled-role';
import { Box, Grid, Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface UserCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  id?: number | undefined;
  data?: User
}

export function UserCreateForm (
  {
    isOpen,
    onClose,
    id = undefined,
    data = undefined,
}: UserCreateFormProps) {
  const { control, handleSubmit, reset } = useForm({
  });
  const userRepository = new UserRepository();

  const onSubmit = async (formData: UserCreateDTO) => {
    if (formData.role == ERolesUser.USER){
      formData.role = "ROLE_USER"
    } else if(formData.role == ERolesUser.ADMIN) {
      formData.role = "ROLE_ADMIN"
    }
    else {
      toast.error(`Ooops! Um erro ocorreu!.`)
    }
    if (data && id) {
        const user = {
            nome: formData.nome,
            sobrenome: formData.sobrenome,
            email: formData.email,
            senha: formData.senha,
            role: formData.role,
        };

        userRepository
            .update(id, user)
            .then(async () => {
                reset();
                toast.success('Processo principal atualizado com sucesso!');
                onClose();
            })
            .catch((e) => {
                console.log(e);
                toast.error(`Ooops! Um erro ocorreu!! ${e.response?.data?.message}.`);
            });
    } else {
        const { ...create } = formData;
        console.log(create);
        userRepository
            .create(create)
            .then(async () => {
                reset();
                toast.success('usuario criado com sucesso!');
                onClose();
            })
            .catch((e) => {
                console.log(e);
                toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}.`);
            });
    }
};

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={style} component='form' onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item sm={6} xs={12} md={12}>
            <ControlledText label='Nome*' name='nome' size='small' control={control} />
          </Grid>

          <Grid item sm={6} xs={12} md={12}>
            <ControlledText label='sobrenome*' name='sobrenome' size='small' control={control} />
          </Grid>


          <Grid item sm={6} xs={12} md={12}>
            <ControlledText label='E-mail*' name='email' size='small' control={control} />
          </Grid>

          <Grid item sm={6} xs={6} md={12}>
            <ControlledPassword label='Senha*' name='senha' control={control} />
          </Grid>

          <Grid item sm={6} xs={6} md={12}>
            <ControlledRole label='' name='role' control={control} defaultValue={ERolesUser.USER}/>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ marginTop: 16 }}>
          <PageButtons>
            <LinkButton to='/funcionarios' variant='outlined' size='large' sx={{ width: '180px' }} onClick={onClose}>
              Cancelar
            </LinkButton>
            <LoadingButton
              loadingIndicator='Salvando...'
              onClick={handleSubmit(onSubmit)}
              variant='contained'
              size='large'
              sx={{ width: '180px' }}
            >
              Salvar
            </LoadingButton>
          </PageButtons>
        </Grid>
    </Box>
  </Modal>
  );
}

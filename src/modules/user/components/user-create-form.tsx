import { Box, Grid, Modal } from '@mui/material';
import { useForm } from 'react-hook-form';
import { ControlledPassword, ControlledText } from '@/shared/components';
import { User, UserCreateDTO } from '../domain';
import { UserRepository } from '../repositories';
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
    if (data && id) {
        const user = {
            nome: formData.nome,
            lastname: formData.sobrenome,
            status: formData.status,
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
                toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}.`);
            });
    } else {
        const { ...create } = formData;
        userRepository
            .create(create)
            .then(async () => {
                reset();
                toast.success('Forno criado com sucesso!');
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
        <Grid item sm={6} xs={12} md={12}>
          <ControlledText label='Nome*' name='name' size='small' control={control} />
        </Grid>

        <Grid item sm={6} xs={12} md={12}>
          <ControlledText label='sobrenome*' name='lastname' size='small' control={control} />
        </Grid>


        <Grid item sm={6} xs={12} md={12}>
          <ControlledText label='E-mail*' name='email' size='small' control={control} />
        </Grid>

        <Grid item sm={6} xs={6} md={6}>
          <ControlledPassword label='Senha*' name='password' control={control} />
        </Grid>

        <Grid item sm={6} xs={6} md={6}>
          <ControlledPassword label='Confirme a Senha*' name='confirm' control={control} />
        </Grid>
    </Box>
  </Modal>
  );
}

import { Box, Button, Divider, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';

import { useAuth } from '@/modules/auth/hooks';
import { AuthRepository } from '@/modules/auth/repositories';
import { Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { CompanyAddressForm } from '@/shared/components/forms/company-address-form';
import { formatErrorForNotification, handleZodInvalidSchema } from '@/shared/utils/error';
import { UserUpdateSelfDto } from '../../domain/dtos/user-update-self.dto';
import {
  UserUpdateSelfData,
  UserUpdateSelfSchema,
} from '../../domain/schemas/user-update-self.schema';
import { UserRepository } from '../../repositories';
import UserDataForm from './components/user-data-form';

export default function UserSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [originalAvatar] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);

  const repository = new UserRepository();
  const authRepository = new AuthRepository();

  const methods = useForm<UserUpdateSelfData>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      phone: '',
      dateOfBirth: new Date(0),
      registration: '',
      address: {
        postcode: '',
        country: 'Brasil',
        state: '',
        city: '',
        street: '',
        neighborhood: '',
        number: '',
        complement: '',
      },
    },
    resolver: zodResolver(UserUpdateSelfSchema),
  });

  function goBack() {
    navigate('');
  }

  async function getUser(id: string) {
    if (!id || !Number(id)) return goBack();

    try {
      setLoading(true);
      const foundUser = await authRepository.check();

      // const avatar = foundUser.avatar && (await createFileFromUUID(foundUser.avatar));

      // setOriginalAvatar(avatar || undefined);

      methods.reset({
        name: foundUser.name ?? '',
        username: foundUser.username ?? '',
        email: foundUser.email ?? '',
        // phone: foundUser.phone ?? '',
        // dateOfBirth: foundUser.dateOfBirth ?? null,
        // document: foundUser.document ?? '',
        // avatar: avatar || undefined,
        // registration: foundUser.registration ?? '',
        // address: {
        //   id: foundUser.address?.id,
        //   postcode: foundUser.address?.postcode ?? '',
        //   country: 'Brasil',
        //   state: foundUser.address?.state ?? '',
        //   city: foundUser.address?.city ?? '',
        //   street: foundUser.address?.street ?? '',
        //   neighborhood: foundUser.address?.neighborhood ?? '',
        //   number: foundUser.address?.number ?? '',
        //   complement: foundUser.address?.complement ?? '',
        // },
      });
    } catch (error: any) {
      toast.error(formatErrorForNotification(error));
      goBack();
    } finally {
      setLoading(false);
    }
  }

  function submit(data: UserUpdateSelfData) {
    const dto: UserUpdateSelfDto = {
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      phone: data.phone ?? '',
      dateOfBirth: data.dateOfBirth! ?? '',
      document: data.document,
      address: data.address,
      registration: data?.registration,
    };

    const avatar = (() => {
      if (!data.avatar) return originalAvatar;
      if (!originalAvatar) return data.avatar;
      if (data.avatar.lastModified !== originalAvatar?.lastModified) return data.avatar;
    })();

    updateUser(dto, avatar);
  }

  async function updateUser(data: UserUpdateSelfDto, avatar?: File) {
    if (!user || loading) return;

    try {
      setLoading(true);

      await repository.updateItself(data);

      if (avatar) {
        const formData = new FormData();

        if (avatar.name !== 'unknown') {
          formData.append('avatar', avatar);
        }
        await repository.saveAvatar(formData);
      }

      toast.success('Alterações salvas com sucesso!');
    } catch (error: any) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
      navigate('/');
    }
  }

  useEffect(() => {
    if (user) getUser(user.id.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Configurações</PageTitle>

        <PageButtons>
          <Button
            variant='contained'
            color='primary'
            size='large'
            onClick={methods.handleSubmit(submit, handleZodInvalidSchema)}
          >
            Salvar
          </Button>
        </PageButtons>
      </PageHeader>

      <PageCard sx={{ width: '100%' }}>
        <Stack direction='column' width='100%'>
          {loading ? <LinearProgress sx={{ width: '100%' }} /> : <Box height='4px' width='100%' />}
          <FormProvider {...methods}>
            <Grid container spacing={2}>
              <UserDataForm loading={loading} />
              <Grid item md={12} sm={12} xs={12} marginTop={0}>
                <Typography component='h2' variant='h5' fontWeight='bold'>
                  Endereço
                </Typography>
                <Divider orientation='horizontal' variant='middle' flexItem />
              </Grid>
              <CompanyAddressForm />
            </Grid>
          </FormProvider>
        </Stack>
      </PageCard>
    </Page>
  );
}

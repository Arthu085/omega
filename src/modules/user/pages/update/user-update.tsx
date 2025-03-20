import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { EAuthenticatedPath } from '@/core/router';

import {
  LinkButton,
  LoadingButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
  useConfirmDialog,
} from '@/shared/components';
import { ID } from '@/shared/domain';
import { callbackOnInvalidZod, formatErrorForNotification } from '@/shared/utils';
import { UserUpdateDTO, UserUpdateData, userUpdateSchema } from '../../domain';
import { UserRepository } from '../../repositories';
import { UserUpdateForm } from './components/user-update-form';

export function UserUpdate() {
  const { id } = useParams();

  const navigate = useNavigate();

  const canDelete = true

  const userRepository = new UserRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const { openConfirmDialog } = useConfirmDialog();

  const methods = useForm<UserUpdateData>({
    defaultValues: {
      name: '',
      email: '',
      role: undefined,
    },
    resolver: zodResolver(userUpdateSchema),
  });

  async function update(id: ID, data: UserUpdateDTO) {
    if (loading) return;

    try {
      setLoading(true);
      await userRepository.update(id, data);

      toast.success('Usuário atualizado com sucesso!');

      navigate(EAuthenticatedPath.USERS);
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function submit(data: UserUpdateData) {
    if (!id) {
      toast.error('Identificador do usuário não encontrado!');
      return;
    }

    update(id, {
      name: data.name,
      email: data.email,
      roleId: data.role?.id,
      hash_password: data.hash_password ?? undefined
    });
  }

  async function getUser(id: ID) {
    if (loading) return;

    try {
      setLoading(true);

      const user = await userRepository.get(id);
      methods.reset({
        ...user,
      });
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      navigate(EAuthenticatedPath.USERS);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: any) {
    const continueDelete = await openConfirmDialog({
      title: 'Confirmar Exclusão',
      description: 'Você tem certeza que deseja apagar este Usuário? Essa é uma ação irreversível. ',
    });

    if (!continueDelete) return;

    if (loading) return;

    try {
      setLoading(true);

      await userRepository.delete(id);

      toast.success('Usuário excluido com sucesso!');

      navigate(EAuthenticatedPath.USERS);
    } catch (error: any) {
      toast.error(formatErrorForNotification(error.response.data));
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    if (id) getUser(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Editar Usuário</PageTitle>

        <PageButtons>
          {canDelete && (
            <LoadingButton
              loading={loading}
              loadingIndicator='Deletando...'
              onClick={() => handleDelete(id!)}
              size='large'
              variant='contained'
              sx={{ minWidth: '180px', backgroundColor: 'background.paper', color: 'text.primary', '&:hover': { backgroundColor: 'text.disabled' } }}
            >
              Excluir
            </LoadingButton>
          )}
          <LinkButton to='/usuarios' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
            Cancelar
          </LinkButton>
          <LoadingButton
            loading={loading}
            loadingIndicator='Salvando...'
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
            variant='contained'
            size='large'
            sx={{ width: '180px' }}
          >
            Salvar
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        <FormProvider {...methods}>
          {/* <UserUpdateFilter /> */}
          <UserUpdateForm />
        </FormProvider>
      </PageCard>
    </Page>
  );
}

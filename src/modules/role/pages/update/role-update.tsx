import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// import { EAuthenticatedPath } from '@/core/router';

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

import { RoleUpdateDTO } from '../../domain/dto';
import { RoleUpdateData, roleUpdateSchema } from '../../domain/schemas/role-update.schema';
import { RoleRepository } from '../../repositories/role.repository';
import { RoleUpdateFilter } from './components/role-update-filter';
import { RoleForm } from './components/role-update-form';

export function RoleUpdate() {
  const { id } = useParams();

  const navigate = useNavigate();
  const canDelete = true
  const roleRepository = new RoleRepository();

  const [loading, setLoading] = useState<boolean>(false);

  const { openConfirmDialog } = useConfirmDialog();

  const methods = useForm<RoleUpdateData>({
    defaultValues: {
      name: '',
      reference: undefined,
      permissions: [],
      baseProfile: false,
    },
    resolver: zodResolver(roleUpdateSchema),
  });

  const baseProfile = methods.watch('baseProfile');
  const disabled: boolean = baseProfile! ? true : false;

  async function update(id: ID, data: RoleUpdateDTO) {
    if (loading) return;

    try {
      setLoading(true);

      await roleRepository.update(id, data);

      navigate('');
      toast.success('Perfil atualizado com sucesso!');
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  async function submit(data: RoleUpdateData) {
    if (!id) {
      toast.error('Identificador do perfil não encontrado!');
      return;
    }

    const dataDTO = {
      name: data.name,
      reference: data.reference,
      permissionsIds: data.permissions.map((permission) => permission.id),
    };

    update(id, dataDTO);
  }

  async function getRole(id: ID) {
    if (loading) return;

    try {
      setLoading(true);

      const role = await roleRepository.get(id);
      methods.reset({
        ...role,
      });
    } catch (error) {
      toast.error(formatErrorForNotification(error));
      navigate('');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: any) {
    const continueDelete = await openConfirmDialog({
      title: 'Confirmar Exclusão',
      description: 'Você tem certeza que deseja apagar este Perfil? Essa é uma ação irreversível. ',
    });

    if (!continueDelete) return;

    if (loading) return;

    try {
      setLoading(true);

      await roleRepository.delete(id);

      toast.success('Perfil excluido com sucesso!');

      navigate('');
    } catch (error: any) {
      toast.error(formatErrorForNotification(error.response.data));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) getRole(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Page>
      <PageHeader>
        <PageTitle>Editar Perfil</PageTitle>

        <PageButtons display='flex' flexWrap='wrap'>
          {canDelete && (
            <LoadingButton
              loading={loading}
              loadingIndicator='Deletando...'
              onClick={() => handleDelete(id!)}
              size='large'
              variant='contained'
              sx={{
                minWidth: '180px',
                backgroundColor: 'background.paper',
                color: 'text.primary',
                '&:hover': { backgroundColor: 'text.disabled' },
              }}
              disabled={disabled}
            >
              Excluir
            </LoadingButton>
          )}
          <LinkButton to='/perfis' variant='outlined' size='large' sx={{ minWidth: '180px' }}>
            Cancelar
          </LinkButton>
          <LoadingButton
            loading={loading}
            loadingIndicator='Salvando...'
            onClick={methods.handleSubmit(submit, callbackOnInvalidZod)}
            variant='contained'
            size='large'
            sx={{ minWidth: '180px' }}
            disabled={disabled}
          >
            Salvar
          </LoadingButton>
        </PageButtons>
      </PageHeader>

      <PageCard>
        <FormProvider {...methods}>
          <RoleUpdateFilter />
          <RoleForm />
        </FormProvider>
      </PageCard>
    </Page>
  );
}

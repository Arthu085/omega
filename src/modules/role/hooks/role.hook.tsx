import { toast } from 'react-toastify';

import { formatErrorForNotification } from '@/shared/utils/error';
import { useConfirmDialog } from '@/shared/components';
import { ID } from '@/shared/domain/types/id.type';

import { RoleRepository } from '../repositories/role.repository';

export function useRole() {
  const roleRepository = new RoleRepository();
  const { openConfirmDialog } = useConfirmDialog();

  async function deleteRole(id: ID, callback?: () => void) {
    const continueRemove = await openConfirmDialog({
      title: 'Confirmar Exclusão',
      description:
        'Você tem certeza que deseja excluir este perfil? Essa é uma ação irreversível.',
    });

    if (!continueRemove) return;

    await toast.promise(roleRepository.delete(id), {
      pending: 'Excluindo perfil...',
      success: 'Perfil excluído com sucesso!',
      error: {
        render: ({data}:any) => {
          return  formatErrorForNotification(data.response.data);
        },
      },
    });

    if (callback) callback();
  }

  return {
    deleteRole,
  };
}

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatErrorForNotification } from '@/shared/utils/error';
import { useConfirmDialog } from '@/shared/components';
import { ID } from '@/shared/domain/types/id.type';

import { UserRepository } from '../repositories/user.repository';
import { EStatus } from '@/shared/domain';

export function useUser() {
  const userRepository = new UserRepository();
  const { openConfirmDialog } = useConfirmDialog();

  async function deleteUser(id: ID, callback?: () => void) {
    const continueRemove = await openConfirmDialog({
      title: 'Confirmar Exclusão',
      description:
        'Você tem certeza que deseja excluir este usuário? Essa é uma ação irreversível.',
    });

    if (!continueRemove) return;

    await toast.promise(userRepository.delete(id), {
      pending: 'Excluindo usuário...',
      success: 'Usuário excluído com sucesso!',
      error: {
        render: ({ data }) => {
          return formatErrorForNotification(data);
        },
      },
    });

    if (callback) callback();
  }

  async function updateStatusUser(id: ID, status: EStatus, callback?: () => void) {
    const releaseUser: boolean = status === EStatus.ACTIVE;

    const description: string = releaseUser
      ? 'Você tem certeza que deseja liberar o acesso deste usuário?'
      : 'Você tem certeza que deseja bloquear o acesso deste usuário?';

    const success: string = releaseUser
      ? 'Acesso do usuário liberado com sucesso!'
      : 'Acesso do usuário bloqueado com sucesso!';

    const continueRemove = await openConfirmDialog({
      title: 'Alteração de Status',
      description,
    });

    if (!continueRemove) return;

    await toast.promise(userRepository.updateStatus(id, status), {
      pending: 'Atualizando status do usuário...',
      success,
      error: {
        render: ({ data }) => {
          return formatErrorForNotification(data);
        },
      },
    });

    if (callback) callback();
  }

  return {
    deleteUser,
    updateStatusUser,
  };
}

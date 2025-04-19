
import { useConfirmDialog } from '@/shared/components';
import { ID } from '@/shared/domain/types/id.type';
import { FurnaceRepository } from '../repositories/furnace.repository';

export function useFurnace() {
  const phaseRepository = new FurnaceRepository();
  const { openConfirmDialog } = useConfirmDialog();

  async function deletePhase(id: ID, callback?: () => void) {
    const continueRemove = await openConfirmDialog({
      title: 'Confirmar Exclusão',
      description:
        'Você tem certeza que deseja excluir este processo principal? Essa é uma ação irreversível.',
    });

    if (!continueRemove) return;

    // await toast.promise(phaseRepository.delete(id), {
    //   pending: 'Excluindo processo principal...',
    //   success: 'Processo principal excluída com sucesso!',
    //   error: {
    //     render: ({ data }) => {
    //       return formatErrorForNotification(data);
    //     },
    //   },
    // });

    if (callback) callback();
  }

  return {
    deletePhase
  };
}

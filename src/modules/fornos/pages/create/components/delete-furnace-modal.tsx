import { Box, Button, Grid, Modal, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import { FurnaceRepository } from '@/modules/fornos/repositories/furnace.repository';
import { FurnaceEntity } from '@/modules/fornos/domain/entities/furnace.entity';
import { AxiosError } from 'axios'; 

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

interface FurnaceDeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    id?: number | undefined;
    data?: FurnaceEntity;
    onDelete: () => void; // Função para realizar o delete após a confirmação
}

export function FurnaceDeleteModal({
    isOpen,
    onClose,
    id,
    data,
    onDelete,
}: FurnaceDeleteModalProps) {
    const furnaceRepository = new FurnaceRepository();

    const handleDelete = async () => {
        if (id) {
            try {
                await furnaceRepository.delete(id); 
                toast.success('Forno deletado com sucesso!');
                onDelete(); 
                onClose();
            } catch (e) {
                if (e instanceof AxiosError) {
                    toast.error(`Ooops! Um erro ocorreu! ${e.response?.data?.message}`);
                } else {
                    console.error(e);
                    toast.error('Ocorreu um erro inesperado.');
                }
            }
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={style}>
                <Typography variant="h6" gutterBottom>
                    Confirmação de Exclusão
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Tem certeza que deseja excluir o forno <strong>{data?.nome}</strong> (Número: {data?.nroForno})?
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button variant="contained" color="error" fullWidth onClick={handleDelete}>
                            Excluir
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="secondary" fullWidth onClick={onClose}>
                            Cancelar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
}

import { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    DataTable,
    DataTableColumnMenu,
    DataTableToggleColumns,
} from '@/shared/components';
import { IMenu, IOption, IPaginationRequest, IPaginationResponse } from '@/shared/domain';

import { FornosListDTO } from '../domain/dto/fornos-list.dto';
import { FurnaceEntity } from '../domain/entities/furnace.entity';
import { FurnaceCreateModal } from '../pages/create/components/create-furnace-modal';

interface FurnaceListTableProps {
    data: { data: FurnaceEntity[]; total: number } | undefined;
    isLoading: boolean;
    error: string | null;
    mutate: () => Promise<IPaginationResponse<FurnaceEntity> | undefined>;
    params: FornosListDTO;
    onChangePagination: (pagination: IPaginationRequest) => void;
}

export function FurnaceListTable({
    data,
    isLoading,
    error,
    mutate,
    params,
    onChangePagination,
}: FurnaceListTableProps) {
    console.log('data: ', data);
    const [editData, setEditData] = useState<any>(null);
    const [idEditData, setIdEditData] = useState<any>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
        nome: { label: 'Nome', value: true },
        nro_forno: { label: 'Número de identificação', value: true },
        status: { label: 'Status', value: true },
        situacao: { label: 'Situacao', value: true }
    });

    function handleToggleColumn(column: string) {
        setToggleColumns((prev) => ({
            ...prev,
            [column]: {
                label: prev[column].label,
                value: !prev[column].value,
            },
        }));
    }

    const editPhase = (id: number) => {
        if (data) {
            const phaseData = data.data.find((phase: any) => phase.id === id);
            if (phaseData) {
                setEditData(phaseData);
                setIdEditData(id)
                setIsOpen(true)
            }
        }
    }

    const columns: Array<MUIDataTableColumnDef> = [
        {
            name: 'nomr',
            label: toggleColumns['nome'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['nome'].value,
            },
        },
        {
            name: 'nro_forno',
            label: toggleColumns['nro_forno'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['nro_forno'].value,
            },
        },
        {
            name: 'status',
            label: toggleColumns['status'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['status'].value,
            },
        },
        {
            name: 'situacao',
            label: toggleColumns['situacao'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['situacao'].value,
            },
        },
        {
            name: 'id',
            label: ' ',
            options: {
                sort: false,
                customHeadLabelRender: () => {
                    return (
                        <DataTableToggleColumns
                            toggleColumns={toggleColumns}
                            onToggle={handleToggleColumn}
                            setToggleColumns={setToggleColumns}
                        />
                    );
                },
                customBodyRender: (id: number) => {
                    const items: Array<IMenu> = [
                        {
                            label: 'Editar Dados',
                            action: () => editPhase(id),
                        },
                    ];


                    return <DataTableColumnMenu items={items} />;
                },
            },
        },
    ];

    const options: MUIDataTableOptions = {
        page: (params.pagination.skip ?? 1) - 1,
        rowsPerPage: params.pagination.take,
        count: data?.total,

        setRowProps: () => ({ style: { cursor: 'pointer' } }),

        onRowClick: (_, { dataIndex }) => {
            const { id } = data?.data[dataIndex] as any;

            if (id) navigate(`./${id}`);
        },

        onChangePage: (currentPage: number) =>
            onChangePagination({
                skip: currentPage + 1,
            }),

        onChangeRowsPerPage: (numberOfRows: number) =>
            onChangePagination({
                take: numberOfRows,
            }),

        onColumnSortChange: (changedColumn: string, direction: 'asc' | 'desc' | 'none') => {
            if (direction === 'none') {
                onChangePagination({
                    orderBy: undefined,
                    ordering: undefined,
                });
                return;
            }

            onChangePagination({
                orderBy: changedColumn,
                ordering: direction,
            });
        },
    };

    const handleCloseModal = () => {
        setIsOpen(false)
        setIdEditData(null)
        setEditData(null)
        mutate()
    }

    return (
        <Fragment>
            <DataTable
                loading={isLoading}
                data={data ? data.data : []}
                columns={columns}
                options={options}
                error={error}
            />
            <FurnaceCreateModal id={idEditData} data={editData} isOpen={isOpen} onClose={() => handleCloseModal()} />
        </Fragment>
    );
}

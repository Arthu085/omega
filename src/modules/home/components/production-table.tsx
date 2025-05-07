import { MUIDataTableColumnDef, MUIDataTableOptions } from 'mui-datatables';
import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    DataTable,
    DataTableColumnMenu,
    DataTableToggleColumns,
} from '@/shared/components';
import { IMenu, IOption, IPaginationRequest, IPaginationResponse } from '@/shared/domain';

import { EAuthenticatedPath } from '@/core/router';
import { ProductionListDTO } from '../domain/dto/production-list.dto';
import { ProductionEntity } from '../domain/entities/production.entity';
import { EStatusProduction } from '../domain/enums/status-production.enum';
import { useProduction } from '../hook/production.hook';

interface ProductionListTableProps {
    data: { data: ProductionEntity[]; total: number } | undefined;
    isLoading: boolean;
    error: string | null;
    mutate: () => Promise<IPaginationResponse<ProductionEntity> | undefined>;
    params: ProductionListDTO;
    onChangePagination: (pagination: IPaginationRequest) => void;
}

export function ProductionListTable({
    data,
    isLoading,
    error,
    params,
    onChangePagination,
}: ProductionListTableProps) {
    const navigate = useNavigate();
    const { finalizeProduction } = useProduction();

    const [toggleColumns, setToggleColumns] = useState<Record<string, IOption<boolean>>>({
        nroProducao: { label: 'Número', value: true },
        lote: { label: 'Lote', value: true },
        loteFrita: { label: 'Lote Frita', value: true },
        status: { label: 'Status', value: true },
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

    const editProduction = (id: number) => {
        navigate(`${EAuthenticatedPath.PRODUCAO}/${id}`)

    }

    const renderStatusCircle = (status: string) => {
        const circleStyle = {
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            display: 'inline-block',
            margin: '0 5px',
        };

        if (status === EStatusProduction.EXECUTANDO) {
            return <span style={{ ...circleStyle, backgroundColor: 'green' }} />;
        } else if (status === EStatusProduction.PARADO) {
            return <span style={{ ...circleStyle, backgroundColor: 'yellow' }} />;
        } else if (status === EStatusProduction.FINALIZADA) {
            return <span style={{ ...circleStyle, backgroundColor: 'red' }} />;
        }

        return null;
    };


    const columns: Array<MUIDataTableColumnDef> = [
        {
            name: 'nroProducao',
            label: toggleColumns['nroProducao'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['nroProducao'].value,
            },
        },
        {
            name: 'lote',
            label: toggleColumns['lote'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['lote'].value,
            },
        },
        {
            name: 'loteFrita',
            label: toggleColumns['loteFrita'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['loteFrita'].value,
            },
        },
        {
            name: 'status',
            label: toggleColumns['status'].label,
            options: {
                sortThirdClickReset: true,
                display: toggleColumns['status'].value,
                customBodyRender: (status: string) => {
                    return renderStatusCircle(status);
                },
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
                            action: () => editProduction(id),
                        },
                        {
                            label: 'Finalizar Produção',
                            action: () => finalizeProduction(id),
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
    return (
        <Fragment>
            <DataTable
                loading={isLoading}
                data={data ? data.data : []}
                columns={columns}
                options={options}
                error={error}
            />
        </Fragment>
    );
}

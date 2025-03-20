import { LinkButton, Page, PageButtons, PageCard, PageHeader, PageTitle } from '@/shared/components';
import { RoleListTable } from './components/role-list-table';
import { RoleListFilter } from './components/role-list-filter';

export function RoleList() {
  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Tipos de Perfil</PageTitle>

        <PageButtons>
          <LinkButton to='./novo' variant='contained' size='large' sx={{ minWidth: '180px' }}>
           Adicionar Tipo de Perfil
          </LinkButton>
        </PageButtons>

      </PageHeader>

      <PageCard sx={{ flexGrow: 1 }}>
        <RoleListFilter/>
        <RoleListTable/>
      </PageCard>
    </Page>
  );
}

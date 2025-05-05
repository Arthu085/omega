import {
  LinkButton,
  Page,
  PageButtons,
  PageCard,
  PageHeader,
  PageTitle,
} from '@/shared/components';
import { UserListFilter } from './components/user-list-filter';
import { UserListTable } from './components/user-list-table';

export function UserList() {
  return (
    <Page>
      <PageHeader>
        <PageTitle toHome>Usuários</PageTitle>

        <PageButtons>
          <LinkButton to='./novoUser' variant='contained' size='large' sx={{ minWidth: '180px' }}>
            Novo fdsaf
          </LinkButton>
        </PageButtons>
      </PageHeader>r

      <PageCard sx={{ flexGrow: 1 }}>
        <UserListFilter />

        <UserListTable />
      </PageCard>
    </Page>
  );
}

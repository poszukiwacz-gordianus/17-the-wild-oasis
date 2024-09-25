import Empty from "../../ui/Empty";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import UserRow from "./UserRow";

import { useUsers } from "./useUsers";

function UsersTable() {
  const { isLoading, users } = useUsers();

  if (isLoading) return <Spinner />;
  if (!users.length) return <Empty resourceName="users" />;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Avatar</div>
          <div>Name</div>
          <div>Email</div>
          <div>Phone</div>
          <div>Role</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={users}
          render={(user) => <UserRow key={user.id} user={user} />}
        />
      </Table>
    </Menus>
  );
}

export default UsersTable;

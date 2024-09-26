import { useEffect } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import MessageRow from "./MessageRow";

import { useLogs } from "./useLogs";
import { useMessageContext } from "../../context/MessageContext";

function MessageArea() {
  const { setNewMessageCount, realtimeLogs, setRealtimeLogs } =
    useMessageContext();

  const { isLoading, logs, count } = useLogs();

  useEffect(() => {
    setRealtimeLogs(logs);
    setNewMessageCount(0); // Reset new message count when logs are fetched
  }, [logs, setNewMessageCount, setRealtimeLogs]);

  if (isLoading) return <Spinner />;
  if (!realtimeLogs?.length) return <Empty resourceName="messages" />;

  return (
    <Menus>
      <Table columns="0.8fr 1fr 4fr">
        <Table.Header>
          <div>Time</div>
          <div>Action</div>
          <div>Description</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={realtimeLogs}
          render={(log) => <MessageRow log={log} key={log.id} />}
        />
      </Table>
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default MessageArea;

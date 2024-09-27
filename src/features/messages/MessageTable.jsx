import { useEffect } from "react";

import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import Pagination from "../../ui/Pagination";
import MessageRow from "./MessageRow";

import { useLogs } from "./useLogs";
import { useMessageContext } from "../../context/MessageContext";
import { useMarkLogsAsRead } from "./useMarkLogsAsRead";

function MessageArea() {
  const { realtimeLogs, setRealtimeLogs } = useMessageContext();
  const { markLogsAsRead } = useMarkLogsAsRead();
  const { isLoading, logs, count } = useLogs();

  useEffect(() => {
    if (logs?.length > 0) {
      markLogsAsRead(logs); // Mark only the current logs as read
      setRealtimeLogs(logs); // Set logs
    } else {
      setRealtimeLogs([]); // Clear logs when none are available
    }
  }, [logs, setRealtimeLogs, markLogsAsRead]);

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

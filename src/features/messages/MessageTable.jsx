import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

import MessageRow from "./MessageRow";

import { useEffect, useState } from "react";
import supabase from "../../services/supabase"; // Ensure this path is correct
import { useLogs } from "./useLogs";
import toast from "react-hot-toast";

function MessageArea() {
  const { isLoading, logs } = useLogs();
  const [realtimeLogs, setRealtimeLogs] = useState([]);

  useEffect(() => {
    setRealtimeLogs(logs);
    // Subscribe to real-time updates
    const channel = supabase
      .channel("realtime logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "logs" },
        (payload) => {
          setRealtimeLogs((prevLogs) => [payload.new, ...prevLogs]);
          toast.success("New message");
        }
      )
      .subscribe();

    // Cleanup channel on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [logs]);

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
    </Menus>
  );
}

export default MessageArea;
